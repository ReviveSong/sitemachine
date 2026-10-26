import { textWithData } from "../../tools/text_utils.mjs";

/**
 * @param {any} item
 * @param {{ any: any; }} data
 */
export function text_block(item, data) {
    let text = document.createElement("p");
    text.textContent = textWithData(item, data);

    return text;
}