import { content_relay } from "./core/content.mjs";
import { uuidv4 } from "./core/tools/uuid.mjs";
import { gen as styles_gen } from "./core/tools/styles_gen.mjs";
import { make_footer, make_header } from "./core/tools/header_footer.mjs";


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
    let uuids = []

    let flexed_page = false;
    let parent = target.parentElement || document.body;

    if (map.header && map.header.enabled) {
        if (map.header.enabled == true) {
            target.insertAdjacentElement("beforebegin",
                make_header(map.header, map.data)
            )
            flexed_page = true;
        };
    }

    //if (!target instanceof HTMLElement) return;
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

            let received_element = content_relay(element, map.data);
            received_element.setAttribute("sb-id", sbid);

            if (element.styles) {
                let received_styles = styles_gen(sbid, element.styles);
                document.head.appendChild(received_styles.children[0]);
                received_styles.remove();
            }

            holding_container.appendChild(
                received_element
            );
        }

        target.setAttribute("data-sb", "");
        target.replaceChildren(...holding_container.children);
        holding_container.remove();
    };

    if (map.footer && map.footer.enabled) {
        if (map.footer.enabled == true) {
            target.insertAdjacentElement("afterend",
                make_footer(map.footer, map.data)
            )
            flexed_page = true;
        };
    }

    if (flexed_page) {
        parent.setAttribute("sb-flexed-page", "true");
    }
}

export {build};