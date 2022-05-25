import { 
    getQueryStringParamByNameProps,
    secureJSONStringifyProps
} from './common.types';

export const getQueryStringParamByName: getQueryStringParamByNameProps = (param, url) => {
    param = param.replace(/[\[\]]/g, '\\$&');
    url = url ? url : window.location.href;

    const regex = new RegExp('[?&]' + param + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const secureJSONStringify : secureJSONStringifyProps = (object) => JSON.stringify(object, (k, v) => v === undefined ? null : v);