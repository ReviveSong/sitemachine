import { text_block } from "./field_blocks/text.mjs";
import { title_block } from "./field_blocks/title.mjs";

/**
 * @param {*} field
 * @returns {HTMLElement}
 * @param {undefined} [i] item
 * @param {undefined} [d] data
 * @param {undefined} [f] features
 */
function build_repeated(field, i,d,f) {
    const fields = {
        "title": title_block,
        "text": text_block,
    };

    if (fields.hasOwnProperty(field)) {
        // @ts-ignore
        return fields[field](i,d,f)
    }

    throw new Error(`Invalid repeated field ${field}`);
};

export {build_repeated};