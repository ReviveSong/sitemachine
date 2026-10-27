import { require_features } from "../component_features.mjs";
import { check_attachments } from "../tools/data_resolver.mjs";
import { safe, safe_url_source } from "../tools/security_utils.mjs";
import { textWithData } from "../tools/text_utils.mjs";

/**
 * @param {{ picture_url: string; author: string; title: string; text: string; attachments: never[]; }} item
 * @param {{ any: any; }} data
 * @param {string[]} features
 */
export function post_component(item, data, features) {
    require_features(["bigimg"], features)

    let new_item = document.createElement("div");

    let picture_url = item.picture_url ?? null;
    let author_name = item.author ?? null;
    let post_title = item.title ?? null;
    let post_content = item.text ?? "";
    let post_attachments = item.attachments ?? null;

    /** @type {string} */
    let attachments_reduced = post_attachments !== null ? post_attachments.reduce(
        (/** @type {String} */ accumulator, /** @type {String} */ current_value) =>
            accumulator + `<img onclick="((el)=>{sb_show_bigimg(el)})(this)" loading="lazy" src="${safe_url_source(current_value)}">`, ""
    ) : null;

    /*
        With how the HTML is built, this also allows for image blocks!
    */

    let onlyInnerHTML = `
    ${post_title === null ? "" : `
    <h1>${safe(textWithData(post_title, data))}</h1>
    `}
    ${picture_url === null && author_name === null ? "" : `
    <div data-sb-post-author>
        ${picture_url === null ? "" : `
        <span data-sb-author-icon>
            <img src=${safe(textWithData(picture_url, data))}>
        </span>
        `}
        ${author_name === null ? "" : `
        <p>
            ${safe(textWithData(author_name, data))}
        </p>
        `}
    </div>
    `}
    <p>${check_attachments(
        safe(
            textWithData(post_content, data)
        ),
        "<br>",
        "<br>",
        "onclick=\"((el)=>{sb_show_bigimg(el)})(this)\" loading=\"lazy\""
    )}</p>
    ${post_attachments === null ? "" : `
    <div data-sb-attachment-collection>
        ${attachments_reduced}
    </div>
    `}
    `

    new_item.innerHTML = onlyInnerHTML;
    new_item.toggleAttribute("data-sb-bigimg-compat");

    return new_item;
}