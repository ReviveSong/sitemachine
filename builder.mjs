import { content_relay } from "./core/content.mjs";

/**
 * This is the primary builder function. This function builds the page and appends it into the target element.
 * 
 * @param {HTMLDivElement} target target is the HTML element where everything will be appended. Do note, this replaces all nodes.
 * @param {map} map map is the object that contains all components and data that needs to be built.
 * @returns 
 */
function build(target, map) {
    //if (!target instanceof HTMLElement) return;
    if (map.content.length < 1) return;
    
    let holding_container = document.createElement("div");

    for (const element of map.content) {
        holding_container.appendChild(
            content_relay(element, map.data)
        );
    }

    target.setAttribute("data-sb", "");
    target.replaceChildren(...holding_container.children);
    holding_container.remove();
}

export {build};