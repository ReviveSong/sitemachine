/**
 * @param {HTMLElement} container
 */
export function bigimg_fn(container) {
    /**
     * @this {HTMLImageElement}
     * @param {{ src: string; }} el
     */
    function sb_show_bigimg(el) {
        /**
         * @type {HTMLImageElement | null}
         */
        let bigimg = document.querySelector("[data-sb-bigimg-node]");
        
        if (!bigimg) throw new Error("Failed to find bigimg node.");

        bigimg.getElementsByTagName("img")[0].src = el.src;
        bigimg.setAttribute("data-sb-bigimg-disabled", "false");
    };

    let bigimg = document.createElement("div");
    const required_code = document.createElement("script");

    required_code.toggleAttribute("data-sb-cleanup");
    required_code.textContent = `
        ${sb_show_bigimg
            .toString()
            .replaceAll("\n", "")
            .trim()}
            function sb_close_bigimg(el){el.setAttribute("data-sb-bigimg-disabled", "true");}
            window.sb_show_image=sb_show_bigimg;
            window.sb_close_bigimg=sb_close_bigimg;
    `;
    bigimg.innerHTML = `
        <div data-sb-cleanup data-sb-bigimg-node data-sb-bigimg-disabled="true">
            <img loading="lazy">
        </div>
    `;

    bigimg = bigimg.children[0];
    bigimg.setAttribute("onclick", "((el)=>{sb_close_bigimg(el)})(this)")

    container.parentElement?.appendChild(required_code);
    container.insertAdjacentElement("beforebegin", bigimg);
}