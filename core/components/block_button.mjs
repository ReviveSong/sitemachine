import { build_repeated } from "../repeated_fields/build_field.mjs";
import { textWithData } from "../tools/text.mjs";

export function block_button_component(item, data) {
    let new_item = document.createElement("div");
    
    item.title ?
    new_item.appendChild(build_repeated("title", item.title, data))
    :"";

    item.text?
    new_item.appendChild(build_repeated("text", item.text, data))
    :"";

    let button_info = item.button;

    if (button_info === null || button_info === undefined) {
        button_info = {text: "Button", target: "#notset"};
    }

    if (button_info.text === null || button_info.text === undefined) {
        button_info.text = "Button";
    }

    if (button_info.target === null || button_info.target === undefined) {
        button_info.target = "#notset";
    }

    let new_button = document.createElement("button");

    new_button.textContent = textWithData(button_info.text, data);

    new_button.addEventListener("click", e=>{
        e.preventDefault();

        window.location.assign(button_info.target);
    })

    new_item.appendChild(new_button);

    return new_item;
}