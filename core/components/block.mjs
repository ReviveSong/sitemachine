import { textWithData } from "../tools/text.mjs";

export function block_component(item, data) {
    let new_item = document.createElement("div");
    
    if (item.title !== undefined) {
        let title = document.createElement("h1");
        title.textContent = textWithData(item.title, data);
        new_item.appendChild(title);
    }

    if (item.text !== undefined) {
        let text = document.createElement("p");
        text.textContent = textWithData(item.text, data);
        new_item.appendChild(text);
    }

    return new_item;
}