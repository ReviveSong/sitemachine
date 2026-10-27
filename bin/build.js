#!/usr/bin/env node
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const { MissingKeyError, InvalidKeyError } = require("../errors.mjs");
const { JSDOM } = require("jsdom");
const { build } = require("../builder.mjs");
const path = require("node:path");
const { COLOR_LIST } = require("./tools/colors");

const ARGS_LIST = process.argv;
ARGS_LIST.splice(0, 2);

const HTML_BASE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style> * {margin: 0px; padding: 0px;}</style>
    <link rel="stylesheet" href="/sbstyles.css">
</head>
<body>
</body>
</html>
`

/**
 * @param {string} file_path
 * @param {string} output
 * @param {string} logbook
 */
async function create(file_path, output, logbook) {
    let file_name = path.basename(file_path);
    const target_path = path.join(output, logbook);

    let sb_obj = false;

    /**
     * @type {Buffer<ArrayBufferLike> | string}
     */
    let data = "";

    if (file_name.endsWith(".sb.json")) {
        sb_obj = true;
        file_name = path.basename(file_path, ".sb.json")+".html";
    }

    if (sb_obj)
    try {
        let json_content = await fsp.readFile(file_path, {encoding: "utf-8"});

        // This here is the part where things get built
        // for the DOM, I've chosen to go with JSDOM. I think it's great for this, but alternative or custom methods
        // should preferably be implemented in the future. Open to suggestions! (TODO:)

        json_content = JSON.parse(json_content);

        const DOM = new JSDOM(HTML_BASE);
        const window = DOM.window;
        const document = window.document;

        // @ts-ignore
        globalThis.window = window;
        globalThis.document = document;

        let container = document.createElement("div");
        container.id = "app";

        document.body.appendChild(container);
        
        build(container, json_content)

        data = DOM.serialize();
        
    } catch (e) {
        console.log(`${COLOR_LIST.RED}Failed to build data for ${file_path}!${COLOR_LIST.RESET}`);
    }

    else {
        data = await fsp.readFile(file_path);
    }
    
    await fsp.writeFile(path.join(target_path, file_name), data);

    console.log(`Finished creating ${path.join(target_path, file_name)}`);
}

/**
 * 
 * @param {string} dir_path 
 * @param {string} output 
 * @param {boolean} deep_traverse if -t is "true", explore
 * @param {string} logbook logbook is the logbook of captain traversal
 */
async function traverseAndCreate(dir_path, output, deep_traverse, logbook) {
    let files = await fsp.readdir(dir_path);
    for (const file of files) {
        const file_path = path.join(dir_path, file);

        const stats = await fsp.stat(file_path);

        if (stats.isDirectory()) {
            if (!deep_traverse) return;

            const new_dir_path = path.join(output, logbook, path.basename(file_path));

            await fsp.mkdir(new_dir_path);

            console.log(`${COLOR_LIST.GREEN}Created ${new_dir_path}${COLOR_LIST.RESET}`);

            await traverseAndCreate(
                file_path,
                output,
                deep_traverse,
                path.join(logbook, path.basename(file_path))
            ).catch(console.error);
        } else {
            await create(file_path, output, logbook);
        }
    }
}

/**
 * 
 * @param {StringMap} args 
 * @returns {Promise<boolean>}
 */
async function main(args) {
    const build_path = args["-p"];
    const traverse = Boolean(args["-t"]);

    const search = process.cwd(); // process.seaweed() :)

    const input_path = path.join(search, args["-p"]);
    const output_path = path.join(search, args["-o"]);

    let input_stats;
    let output_stats;

    try {
        input_stats = await fsp.stat(input_path);

        // TODO: If ouput doesn't exist, create.
        output_stats = await fsp.stat(output_path);
    } catch (e) {
        console.error(e)
        return false;
    }

    const is_directory = input_stats.isDirectory();
    const valid_output = output_stats.isDirectory();

    if (!valid_output) throw new Error(`Output must be a directory. ${output_path}`);

    // Everything inside output has to be deleted for proper creation

    const deletion_list = await fsp.readdir(output_path);
    
    await Promise.all(
        deletion_list.map(
            file =>  fsp.rm(path.join(output_path, file), {recursive: true})
        )
    )

    // It's important to not traverse if given a file :)

    if (is_directory === true) {
        await traverseAndCreate(
            input_path,
            output_path,
            Boolean(args["-t"]),
            ""
        ).catch(console.error);
    } else {
        // <TODO:>
    }

    // Finally, copy sbstyles to root of output

    await fsp.copyFile(
        path.join(search, "sbstyles.css"),
        path.join(output_path, "sbstyles.css")
    )

    // And final logs

    console.log(`\n\n${COLOR_LIST.GREEN}Finished building!${COLOR_LIST.RESET}`);
    console.log(`${COLOR_LIST.MAGENTA}NOTE:${COLOR_LIST.RESET} Sitemachine only builds json files that end with .sb.json`);
    console.log("So if your file ends with something else, the builder copies them to output as-is.");

    return true;
}

/**
 * Function "Start" handles args and such.
 * Valid keys and their explanations:
 * * -p: This is the key for the path of the JSON files that the builder must build.
 * * -o: This is thr key for the output of the HTML files built.
 * * -t: Whether to traverse or not in case given a directory. If not, then only the direct children of the directory will be built.
 * * -args: Extra arguments, currently unused.
 */
function start() {
    const keys = ["-p", "-o", "-t", "-args"];

    // TODO: args file

    /** @type {StringMap} */
    let args = {"-t": "true"};

    let idx = 0;

    while (idx < ARGS_LIST.length - 1) {
        let item  = ARGS_LIST[idx];

        if (!keys.includes(item)) throw new InvalidKeyError(item, keys);
        
        let key = item;
        idx++;

        args[key] = ARGS_LIST[idx];
        idx++;
    }

    if (!args.hasOwnProperty("-p")) throw new MissingKeyError("-p", "path");
    if (!args.hasOwnProperty("-o")) throw new MissingKeyError("-o", "output");

    main(args).catch(console.error)
}

start();