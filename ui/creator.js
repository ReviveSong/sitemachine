import { build } from "../builder.mjs";

// This script is to be used with creator.html.
// The purpose of this script is to make the creator page functional, this is not required for the builder to run.

!function() {
    let current = {
        content: [
            {
                type: "block",
                title: "Hey!",
                text: "$1, $2! Welcome to $sitename",
            },
            { type: "line" },
            { type: "divider", invert: true },
            { type: "divider" },
            {
                type: "block_button",
                title: "$1",
                text: "$sitename traveler",
                button: {
                    target: "",
                    text: "Travel somewhere"
                }
            },
        ],
        data: {
            "1": "Hello",
            "2": "World",
            "sitename": "SiteMachine"
        },
        metadata: [
            {"type": "title", "content": "Home - $sitename"}
        ]
    };
    
    const APP = document.getElementById("app");

    build(APP, current);

    return true;
}()