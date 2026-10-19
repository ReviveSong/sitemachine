import { textWithData } from "./text.mjs";

/**
 * 
 * @param {*} data 
 * @param {*} map_data 
 * @returns {HTMLElement}
 */
function make_header(data, map_data) {
    let header = document.createElement("header");

    header.setAttribute("sb-header-style", data.style || "default");
    
    const title = document.createElement("h1");
    title.textContent = textWithData(data.title || "", map_data);

    header.appendChild(title);

    // TODO: Finish the header

    return header;
}

/**
 * 
 * @param {*} data 
 * @param {*} map_data 
 * @returns {HTMLElement}
 */
function make_footer(data, map_data) {
    let footer = document.createElement("footer");

    footer.setAttribute("sb-footer-style", data.style || "default");
    
    const wm = document.createElement("p");
    wm.textContent = textWithData(data.wm || "", map_data);

    footer.appendChild(wm);

    // TODO: Finish the header

    return footer;
}

export {make_header, make_footer};