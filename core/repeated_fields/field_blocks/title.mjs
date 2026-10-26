import { textWithData } from "../../tools/text_utils.mjs";

/**
 * @param {any} item
 * @param {{ any: any; }} data
 */
export function title_block(item, data) {
    let title = document.createElement("h1");
    title.textContent = textWithData(item, data);

    return title;
}