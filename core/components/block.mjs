import { build_repeated } from "../repeated_fields/build_field.mjs";
import { textWithData } from "../tools/text_utils.mjs";

export function block_component(item, data) {
    let new_item = document.createElement("div");
    let approved_list = ["title", "text"]

    item.title ?
    new_item.appendChild(build_repeated("title", item.title, data))
    :"";

    item.text?
    new_item.appendChild(build_repeated("text", item.text, data))
    :"";

    return new_item;
}