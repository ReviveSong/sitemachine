import { MissingFeaturesError } from "../errors.mjs";
import { normalize } from "./tools/normalization.mjs";

/**
 * This list helps the content relay script understand what features need to be enabled for certain components to work.
 * All components that require certain features must be added here alongside the features they require.
 * 
 * @type {Object<String, String[]>}
 */
const COMPONENT_FEATURES_LIST = {
    "post": ["bigimg"],
}

/**
 * @param {String[]} features
 * @param {String} component
 */
function check(features, component) {
    if (!COMPONENT_FEATURES_LIST.hasOwnProperty(component)) return true;

    /** @type {String[]} */
    const required_features = COMPONENT_FEATURES_LIST[component];

    const set_enabled = new Set(features.map(normalize));

    let missing = required_features.filter(str => set_enabled.has(str));

    if (missing.length > 0) {
        throw new MissingFeaturesError(missing);
    }

    return true;
}

export {COMPONENT_FEATURES_LIST, check}