/**
 * 
 * @param {string} id 
 * @param {string[]} list 
 */
function gen(id, list) {
    const style_regex = /[\w-]+\s*:\s*[^;]+;/gm;

    let style_obj = document.createElement("div");

    let style_html = `<style> [sb-id="${id}"] {`;

    for (const item of list) {
        const safer = item
            .replace("<", "&lt;")
            .replace(">", "&gt;")
        
        let match_list = safer.match(style_regex) || [];

        console.log(match_list)

        for (const matched of match_list) {
            style_html += matched;
        }
    }

    style_html += "}</style>";

    style_obj.innerHTML = style_html;

    return style_obj;
}

export {gen};