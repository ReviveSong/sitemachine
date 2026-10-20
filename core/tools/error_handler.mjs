
/**
 * @param {(...args: any[]) => any} fn
 * @param {any} fallback
 * @param {any[]} args
 */
function returns_try_catch( fn, fallback, ...args ) {
    try {
        return fn(...args);
    } catch (error) {
        console.error(error);
        return fallback;
    }
}

export {returns_try_catch};