let G_DATA_REGEX = /\$[\d\w]+/g;
let I_DATA_REGEX = /\$[\d\w]+/;

/**
 * This function replaces all data appearances in a string.
 * It works by finding all appearances of $data-like patterns in the provided string
 * and then replaces them with the value provided via data.
 * @param {String} str provided string
 * @param {{any: any;}} dataMap data list
 * @param {string | any[] | undefined} [sentBy]
 */
function textWithData(str, dataMap, sentBy) {
    let dataList = str.match(G_DATA_REGEX);

    sentBy = sentBy || [];

    if (dataList === null || dataList.length < 1) return sentBy.length < 1?
        str.replaceAll("$\\", "$") :
        str

    dataList = new Set(dataList);

    let newStr = str;

    for (const item of dataList) {
        let actualKey = item.slice(1);

        // Below: if dataMap[actualKey] exists then {
        //      if sentBy includes actualKey then { results in infinite loop detected }
        //      else call textWithData alongside sentBy + actualKey
        //  }
        //  else unknown value actualKey

        let replacement = dataMap[actualKey]?
            sentBy.includes(actualKey) ? `[INFINITE_LOOP_DETECTED_FOR:${actualKey}]` :
            textWithData(dataMap[actualKey], dataMap, [...sentBy, actualKey]):
            `[unknown_value:${actualKey}]`;

        if (typeof(replacement) !== "string") replacement = `[invalid_type:${actualKey}]`;
        
        newStr = newStr.replaceAll(item, replacement);
    }

    if (sentBy.length < 1) {
        newStr = newStr.replaceAll("$\\", "$");
    }

    return newStr
}

export {textWithData};