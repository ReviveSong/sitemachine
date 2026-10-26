import { block_component } from "./components/block.mjs";
import { block_button_component } from "./components/block_button.mjs";
import { divider_component } from "./components/divider.mjs";
import { line_component } from "./components/line.mjs";
import { post_component } from "./components/post.mjs";
import { check } from "./component_features.mjs";
import { text_box_component } from "./components/text_box.mjs";

/**
 * This function relays the function call to the correct function.
 * Add all components here so they actually get called!
 * 
 * The below is the data relayed, all calls to this come from the builder.
 * @param {*} item 
 * @param {*} data 
 * @param {*} features 
 * 
 * The below should be the finished result of the item
 * @returns {HTMLElement}
 */
export function content_relay(item, data, features) {
    const map = {
        "block": block_component,
        "line": line_component,
        "divider": divider_component,
        "block_button": block_button_component,
        "post": post_component,
        "text_box": text_box_component,
        "title_text_box": block_component, // [Duplicate!]
    }

    let run = map[item.type];

    if (run === undefined) throw new Error(`Unknown type ${item.type}`);
    check(features, item.type);
    
    
    let received = run(item, data);
    received.setAttribute("data-component-type", item.type);

    return received;
}