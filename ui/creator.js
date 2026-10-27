import { build } from "../builder.mjs";

// This script is to be used with creator.html.
// The purpose of this script is to make the creator page functional, this is not required for the builder to run.

const env = await fetch('./.env')
    .then(r => r.text())
    .then(t =>
        Object.fromEntries(
            t.trim()
                .split(/\r?\n/)
                .map(l =>
                    l.split('=')
                        .map(s =>
                            s.trim()
                        )
                )
        )
    );

let current = env.DEBUG == "false" ?
    {} :
    await fetch(`./debug_templates/${env.DEBUG_FILE}`).then(res => res.json());

const APP = document.getElementById("app");


/*
                Change Functionality
        These functions are meant for changes
        in the web page.

        These include data and structural
        changes.
*/

function on_new_block(type) {
    // TODO: Alternative method for on_change. Performance matters y'all 😄

    // And yes, I couldn't find the smiley that has no colour so I had to copy and paste that one from somewhere else.
    // Please help me find it
}

function on_change() {
    APP?.replaceChildren();

    for (const element of current.content) {
        delete element.__ELEMENT;
    }

    // The following two lines rebuild features cleanly! They've been commented because rebuilding them isn't necessary
    //document.querySelectorAll("[data-sb-cleanup]").forEach(e=>e.remove());
    //APP?.setAttribute("sm-ffe", "");

    try {
        let build_content = build(APP, current);
        current = build_content;

        for (const element of current.content) {
            console.log("TODO: attach tools");
        }
    } catch ( e ) {
        console.error(e);
    }
    
    create_data_list();
}

/*
                Data Functions
        
        These functions handle all
            things current.data.

*/

function create_data_list() {
    const elements = document.querySelectorAll(".data-list");

    for (const element of elements) {
        element.replaceChildren();
        for (const data in current.data) {
            let value = current.data[data];

            if (!(typeof(value) == "string")) value = "[Data Object]";

            const wrapper = document.createElement("li");
            const name = document.createElement("p");
            const value_wrapper = document.createElement("pre");
            const value_content = document.createElement("code");
            const delete_button = document.createElement("button");

            value_content.textContent = value;
            name.textContent = data;
            delete_button.textContent = "delete";

            value_wrapper.appendChild(value_content);

            wrapper.replaceChildren(
                name,
                value_wrapper,
                delete_button,
                document.createElement("hr")
            );

            element.appendChild(wrapper);
            delete_button.addEventListener('click', ()=> delete_data(data));
        }
    }
}

function delete_data(id) {
    if (current.data.hasOwnProperty(id)) {
        delete current.data[id];

        on_change();
    }
}

function new_data(id, val) {
    if (!current.data.hasOwnProperty(id)) {
        current.data[id] = val;

        on_change();
    }
}

function has_data(id) {
    return current.data.hasOwnProperty(id);
}

function button_create_data() {
    const parent = this.parentElement;
    
    const pd_id = parent.querySelector(".pd-id");
    const pd_val = parent.querySelector(".pd-val");

    if (!pd_id || !pd_val) throw new Error("Couldn't find identifier object or value object when creating data.");
    
    if (pd_id.value.length < 1) throw new Error("Data identifier too short. Must be over 1 letter long.");

    if (has_data(pd_id.value)) throw new Error("Data with identifier already exists.");
    
    new_data(pd_id.value, pd_val.value);
}


/*
                Initializer Function
        This initializes the whole creator page.
        
        Basically handles page load and stuff.
*/

!function () {
    on_change()

    new_data("sitename", "Sitemachine");

    // Elements

    const btn_data = document.getElementById("create-data");

    if (!btn_data) throw new Error("Element not found");

    btn_data.addEventListener("click", button_create_data);

    return true;
}()