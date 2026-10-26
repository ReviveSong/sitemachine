let G_DATA_REGEX = /\$[\d\w]+/g;
let I_DATA_REGEX = /\$[\d\w]+/;

/**
 * This function replaces all data appearances in a string.
 * It works by finding all appearances of $data-like patterns in the provided string
 * and then replaces them with the value provided via data.
 * 
 * @param {String} str provided string
 * @param {{any}} dataMap data list
 */
function textWithData(str, dataMap) {
    let dataList = str.match(G_DATA_REGEX);

    if (dataList === null || dataList.length < 1) return str;

    dataList = new Set(dataList);

    let newStr = str;

    for (const item of dataList) {
        let actualKey = item.slice(1);

        let replacement = dataMap[actualKey]? dataMap[actualKey]: `[unknown_value:${item}]`;
        if (typeof(replacement) !== "string") replacement = `[invalid_type:${item}]`

        newStr = newStr.replaceAll(item, replacement);
    }

    return newStr
}

export {textWithData};