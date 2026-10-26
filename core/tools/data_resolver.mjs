import { safe_url_source } from "./security_utils.mjs";

const ATTACHMENT = /\$:ATTACHMENT:\(([a-zA-Z0-9 \/_\-.\\,]+)\)/g

/**
 * @param {string} str
 * @param {string | undefined} [pre]
 * @param {string | undefined} [suf]
 */
export function check_attachments(str, pre, suf) {
    pre = pre || "";
    suf = suf || "";
    return str
        .replace(ATTACHMENT, (match, group1) =>
            `${pre}<img src=\"${safe_url_source(group1)}\">${suf}`
        );
}