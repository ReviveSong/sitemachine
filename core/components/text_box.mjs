import { textWithData } from "../tools/text_utils.mjs";

export function text_box_component(item, data) {
    let new_item = document.createElement("div");
    
    if (item.text !== undefined) {
        let text = document.createElement("p");
        text.textContent = textWithData(item.text, data);
        new_item.appendChild(text);
    }

    return new_item;
}