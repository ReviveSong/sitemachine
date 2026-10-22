import { content_relay } from "./core/content.mjs";
import { uuidv4 } from "./core/tools/uuid.mjs";
import { gen as styles_gen } from "./core/tools/styles_gen.mjs";
import { make_footer, make_header } from "./core/tools/header_footer.mjs";
import { returns_try_catch } from "./core/tools/error_handler.mjs";

import { build as features_build } from "./core/features/feature_builder.mjs";


/**
 * This is the primary builder function. This function builds the page and appends it into the target element.
 * 
 * @param {HTMLDivElement} target target is the HTML element where everything will be appended. Do note, this replaces all nodes.
 * @param {map} map map is the object that contains all components and data that needs to be built.
 * @returns 
 */
function build(target, map) {
    /**
     * @type {string[]}
     */
    let uuids = [];

    let features = map.features || [];

    let flexed_page = false;
    let parent = target.parentElement || document.body;

    if (map.header && map.header.enabled) {
        if (map.header.enabled == true) {
            // This part intentionally removes <ALL> headers in case there's multiple for some reason. Same with footer!
            let previous_header = parent.querySelectorAll("header[sb-header-object]");
            previous_header.forEach(e=>e.remove());

            target.insertAdjacentElement("beforebegin",
                make_header(map.header, map.data)
            )
            flexed_page = true;
        };
    }

    // Quick feature build right here
    features.forEach((/** @type {string} */ f)=>features_build(target, f));

    if (map.content.length > 0) {
        let holding_container = document.createElement("div");

        for (const element of map.content) {
            let sbid; while (true) {
                sbid = uuidv4();
                if (!uuids.includes(sbid)) {
                    uuids.push(sbid);
                    break;
                }
            }

            // safe
            let received_element = returns_try_catch(
                content_relay, null,
                element, map.data, features
            );

            // oh no! It seems the element is invalid. This part removes the uuid from the list and continues to the next one.
            if (received_element === null) {
                uuids.filter(v => v!==sbid);
                continue;
            }

            received_element.setAttribute("sb-id", sbid);

            if (element.styles) {
                let received_styles = styles_gen(sbid, element.styles);
                document.head.appendChild(received_styles.children[0]);
                received_styles.remove();
            }

            holding_container.appendChild(
                received_element
            );

            element.__ELEMENT = received_element;
        }

        target.setAttribute("data-sb", "");
        target.replaceChildren(...holding_container.children);
        holding_container.remove();
    };

    if (map.footer && map.footer.enabled) {
        if (map.footer.enabled == true) {
            // This part intentionally removes <ALL> footers in case there's multiple for some reason. Same with header!
            let previous_footer = parent.querySelectorAll("footer[sb-footer-object]");
            previous_footer.forEach(e=>e.remove());

            target.insertAdjacentElement("afterend",
                make_footer(map.footer, map.data)
            )
            flexed_page = true;
        };
    }

    if (flexed_page) {
        parent.setAttribute("sb-flexed-page", "true");
    }

    return map;
}

export {build};