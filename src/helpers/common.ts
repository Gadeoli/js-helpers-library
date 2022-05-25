import { 
    getQueryStringParamByNameProps,
    secureJSONStringifyProps
} from './common.types';

export const getQueryStringParamByName = (props: getQueryStringParamByNameProps) => {
    const param = props.param.replace(/[\[\]]/g, '\\$&');
    const url = props.url ? props.url : window.location.href;

    var regex = new RegExp('[?&]' + param + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const secureJSONStringify = (props: secureJSONStringifyProps) => {
    const {object} = props;
    return JSON.stringify(object, (k, v) => v === undefined ? null : v);
}
