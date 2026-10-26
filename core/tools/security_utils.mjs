/**
 * @param {string} str
 */
function prot(str) {
    return /^[a-zA-Z][a-zA-Z\d+.-]*:/.exec(str)?.[0] ?? "";
}

/**
 * Use for non textContent string attaching.
 * Makes strings sane to avoid unintended code execution in a wild string.
 * @param {string} str
 */
export function safe(str) {
    return str
        .replaceAll("&", "&#38;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

/**
 * Safe(ish) / no XSS protocol only
 * @param {string} str
 */
export function safe_url_source(str) {
    const protocol_list = ["https:", "http:"];

    try {
        const protocol = prot(str);

        if (protocol != "" && !protocol_list.includes(protocol)) {
            throw new Error("Unsupported URL Scheme");
        }
        
        return safe(str);
    } catch {
        throw new Error("Invalid URL");
    }
}