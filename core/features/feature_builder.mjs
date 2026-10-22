const VALID_FEATURES = [
    "bigimg"
]

/**
 * Feature builder's build function creates the feature node
 * and once built, the build function places the feature node and it's attributes where needed.
 * 
 * The reason why these features aren't all enabled by default is because some people do not need the extra features
 * so adding them would be entirely pointless.
 * 
 * @param {HTMLElement} container This should be the builder's build target.
 * @param {String} feature This is the string feature. Not case sensitive.
 * @returns {void} Returns void because the builder places the node itself.
 */
function build(container, feature) {
    feature = feature.toLowerCase();
    // Though sometimes people enable features that do not exist and the best way to make them aware of their mistake
    // is by making it very clear. For that, throwing an error would halt the builder.
    if (!VALID_FEATURES.includes(feature)) throw new Error(`Provided invalid feature ${feature}`);
    
    // ffe: Feature Flag Enabled
    container.setAttribute("sm-ffe", feature);
}

export {build}