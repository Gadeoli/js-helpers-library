import { 
    copyToClipboardProps,
    getQueryStringParamByNameProps,
    isEqualProps,
    justNumbersAndLettersProps,
    reorderArrayItemProps,
    replaceManyStrProps,
    searchManyInArrayProps,
    secureJSONStringifyProps
} from './common.types';

export const copyToClipboard : copyToClipboardProps = (text, timeout=500) => {
    if (window.isSecureContext && navigator.clipboard) { //ssl
        navigator.clipboard.writeText(text);
    } else { //no ssl
        const elem = document.createElement("input");
        elem.style.position = 'fixed';
        elem.style.top = '0';
        elem.style.left = '0';
        elem.style.opacity = '0';
        elem.value = text;
        elem.style.zIndex = '100000000000000';

        //useTimeout is used to prevent tooltip reender (external component) && forced it to close before user read it. 
        //don't use more then .5s to avoid user get blur before copy finish
        setTimeout(() => {  
            document.body.appendChild(elem);
            elem.focus();          
            elem.select();

            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Unable to copy to clipboard', err);
            } finally {
                elem.remove();
            }
        }, timeout);
    }
}

export const getQueryStringParamByName: getQueryStringParamByNameProps = (param, url) => {
    param = param.replace(/[\[\]]/g, '\\$&');
    url = url ? url : window.location.href;

    const regex = new RegExp('[?&]' + param + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const justNumbersAndLetters : justNumbersAndLettersProps = (str) => str.replace(/[^a-z0-9]/gi,'');

/**
 * Reorder a unique item from a array, realocating all the other itens. This function uses the Array.splice so the original array will be changed
 * Source: https://stackoverflow.com/questions/2440700/reordering-arrays
 * @param from 
 * @param to 
 * @param data 
 */
export const reorderArrayItem : reorderArrayItemProps = (from, to, data) => {
    data.splice(to, 0, data.splice(from, 1)[0]);
}

/**
 * Replace multiple values from a string using a key => value object
 * @param [] data [{search: 'xpto', replacer: 'xpto2'}, {search: 'Earth', replace: 'Moon'}]
 * @param string sentence 
 * @returns 
 */
export const replaceManyStr : replaceManyStrProps = (data, sentence) => data.reduce((newSentence:string, v:{search: string, replacer: string}) => {
    return newSentence.replace(v.search, v.replacer);
}, sentence);

/**
 * Check if any item of single level, no object itens Array 'B' is inside from single level, no object itens Array 'A'
 * @param data 
 * @param searches 
 * @returns boolean
 */
export const searchManyInArray : searchManyInArrayProps = (data, searches) => {
    return data.filter(d => searches.includes(d)).length > 0;
}

export const secureJSONStringify : secureJSONStringifyProps = (object) => JSON.stringify(object, (k, v) => v === undefined ? null : v);

export const isEqual : isEqualProps = (obj1, obj2) => {
    if (obj1 === obj2) {
        return true;
    }

    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
        return obj1 === obj2;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) {
        return false;
        }
    }

    return true;
}