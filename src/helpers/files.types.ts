export interface downloadBase64FileProps {
    (base64Data: any, filename: string): any;
}

export interface downloadBlobFileProps {
    (blob: any, mime: string, filename: string): any;
}

export interface base64StringtoFileProps {
    (base64String: any, filename: string): any;
}

export interface extractFileMimeFromBase64Props {
    (base64String: any): any;
}

export interface extractFileExtentionFromBase64Props {
    (base64String: any): any;
}

export interface extractFileNameFromDispositionProps {
    (str: string): string;
}

export interface getExtensionByMimeTypeProps {
    (str: string): string;
}

export interface image64toCanvasRefProps {
    (canvasRef: any, image64: any, pixelCrop: any): any;
}

export interface fixRealSizeProps {
    (image: any, pixelCrop: any): any;
}

export interface getIntlIdFromErrorCodeProps {
    (code: number): string;
}

export interface validateFileProps {
    (file: any, props: validateFileExtraProps): any;
}

export interface validateFileExtraProps {
    validations: validateFileExtraValidationProps;
    accept: string;
    maxSize: number;
    
}

export interface validateFileExtraValidationProps {
    size: string;
    type: string;
}

export interface resizeImgFromBase64Props {
    (base64: any, quality?: number): any;
}

export interface exportToCsvProps {
    (filename: string, rows: any, delimiter: string): any;
}

export interface saveFileProps {
    (filename: string, content: any, type?: string): any;
}

export interface getNewSizesFromImgSrcProps {
    (width: number, height: number): any;
}

export interface binaryToOctetProps {
    (bin: any): any;
}

export interface readFileURLProps {
    (file: any): any;
}

