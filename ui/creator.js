import { build } from "../builder.mjs";

// This script is to be used with creator.html.
// The purpose of this script is to make the creator page functional, this is not required for the builder to run.

let current = {
    "header": {
        "enabled": true,
        "style": "default",
        "title": "$sitename!"
    },
    "footer": {
        "enabled": true,
        "wm": "$sitename"
    },
    "content": [
        {
            "type": "block",
            "title": "Hey!",
            "text": "$1, $2! Welcome to $sitename",
            "styles": ["background-color: green; font-size: xx-small;"]
        },
        {
            "type": "line"
        },
        {
            "type": "divider",
            "invert": true
        },
        {
            "type": "divider"
        },
        {
            "type": "skippable block"
        },
        {
            "type": "block_button",
            "title": "$1",
            "text": "$sitename traveler",
            "button": {
                "target": "",
                "text": "Travel somewhere"
            }
        }
    ],
    "data": {
    },
    "metadata": [
        {
            "type": "title",
            "content": "Home - $sitename"
        }
    ]
};

const APP = document.getElementById("app");

function new_data(id, val) {
    if (!current.data.hasOwnProperty(id)) {
        current.data[id] = val;

        on_change();
    }
}

function on_change() {
    // @ts-ignore
    APP?.replaceChildren();
    build(APP, current);
}

function button_create_data() {}

!function () {
    on_change()

    new_data("sitename", "Sitemachine")

    return true;
}()