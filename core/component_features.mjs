import { MissingFeaturesError } from "../errors.mjs";
import { normalize } from "./tools/normalization.mjs";

/**
 * @param {String[]} features
 * @param {String[]} required_features
 */
function require_features(required_features, features) {
    const set_enabled = new Set(features.map(normalize));

    let missing = required_features.filter(str => !set_enabled.has(str));
    
    if (missing.length > 0) {
        throw new MissingFeaturesError(missing);
    }

    return true;
}

export {require_features}