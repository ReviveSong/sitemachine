#!/usr/bin/env node
const fs = require("node:fs/promises");
const { MissingKeyError, InvalidKeyError } = require("../errors.mjs");
const { JSDOM } = require("jsdom");
const { build } = require("../builder.mjs");

const ARGS_LIST = process.argv;
ARGS_LIST.splice(0, 2);

const HTML_BASE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
</body>
</html>
`

/**
 * 
 * @param {StringMap} args 
 * @returns {Promise<boolean>}
 */
async function main(args) {
    const build_path = args["-p"];
    const traverse = Boolean(args["-t"]);

    const search = process.cwd(); // process.seaweed() :)
    const res = await fs.stat("../");

    // This here is the part where things get built
    // for the DOM, I've chosen to go with JSDOM. I think it's great for this, but alternative or custom methods
    // should preferably be implemented in the future. Open to suggestions! (TODO:)

    const DOM = new JSDOM(HTML_BASE);
    const window = DOM.window;
    const document = window.document;

    globalThis.document = document;

    // @ts-ignore
    globalThis.window = window;

    // I will finish the following TODOs after the repository switch.
    // TODO: Loop through files and create separate html files for each json file.
    let container = document.createElement("div");
    container.id = "app";

    build(container, [])

    document.body.appendChild(container);

    // TODO: Add result contents to destination file

    let build_result = DOM.serialize();

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
    let args = {"t": "false"};

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