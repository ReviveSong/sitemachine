import { check_attachments } from "../tools/data_resolver.mjs";
import { safe, safe_url_source } from "../tools/security_utils.mjs";
import { textWithData } from "../tools/text_utils.mjs";

export function post_component(item, data) {
    let new_item = document.createElement("div");

    let picture_url = item.picture_url || "";
    let author_name = item.author || "";
    let post_title = item.title || "";
    let post_content = item.text || "";
    let post_attachments = item.attachments || []

    /** @type {string} */
    let attachments_reduced = post_attachments.reduce(
        (/** @type {String} */ accumulator, /** @type {String} */ current_value) =>
            accumulator + `<img src="${safe_url_source(current_value)}">`, ""
    );

    let onlyInnerHTML = `
    <h1>${safe(textWithData(post_title, data))}</h1>
    <div data-sb-post-author>
        <span data-sb-author-icon>
            <img src=${safe(textWithData(picture_url, data))}>
        </span>
        <p>
            ${safe(textWithData(author_name, data))}
        </p>
    </div>
    <p>${check_attachments(
        safe(
            textWithData(post_content, data)
        ),
        "<br>",
        "<br>"
    )}</p>
    <div data-sb-attachment-collection>
        ${attachments_reduced}
    </div>
    `

    new_item.innerHTML = onlyInnerHTML;

    return new_item;
}