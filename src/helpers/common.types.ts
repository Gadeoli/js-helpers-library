export interface copyToClipboardProps {
    (text: string) : void;
}

export interface getQueryStringParamByNameProps {
    (param: string, url?: string): any;
}

export interface justNumbersAndLettersProps {
    (str: string) : string;
}

export interface reorderArrayItemProps {
    (from: number, to: number, data: Array<any>) : void;
}


export interface secureJSONStringifyProps {
    (object: object) : string;
}

export interface searchManyInArrayProps {
    (data: Array<any>, searches: Array<any>) : boolean;
}