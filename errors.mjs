class MissingKeyError extends Error {
    /**
     * @param {string | undefined} message missing key
     * @param {string} name name of missing key
     */
    constructor ( message, name ) {
        super(`Missing ${name}! Make sure you provide the path with \"${message} <${name}>\" (excluding the arrows!)`);
        this.name = "MissingKeyError";
    }
}

class MissingFeaturesError extends Error {
    /**
     * @param {string[]} [message]
     */
    constructor ( message ) {
        super(`Component build failed, missing features (${message.join(", ")})`);
        this.name = "MissingFeaturesError";
    }
}

class InvalidKeyError extends Error {
    /**
     * @param {string | undefined} message
     * @param {string[]} list 
     */
    constructor ( message, list ) {
        let did_you_mean = "";

        if (!message?.startsWith("-")) did_you_mean = ` Did you forget to add a dash before the key? "-${message}" | "${message}"`;
        
        else for (const possibility of list) {
            if (message.toLowerCase() == possibility.toLowerCase())
                did_you_mean = ` Did you mean ${possibility}?`;
        }

        super(`Key \"${message}\" invalid!${did_you_mean}`)
        this.name = "InvalidKeyError";
    }
}

export {
    MissingKeyError,
    MissingFeaturesError,
    InvalidKeyError,
}