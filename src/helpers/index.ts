export { 
    diffInMinutes, 
    diffInSeconds, 
    addInMinutes,
    localTimezoneToDateStr
} from "./time";
export {
    copyToClipboard,
    getQueryStringParamByName,
    isEqual,
    justNumbersAndLetters,
    reorderArrayItem,
    replaceManyStr,
    searchManyInArray, 
    secureJSONStringify
} from "./common";
export {
    handleCssClassnames
} from "./styles";
export {
    downloadBase64File,
    downloadBlobFile,
    base64StringtoFile,
    extractFileMimeFromBase64,
    extractFileExtentionFromBase64,
    extractFileNameFromDisposition,
    getExtensionByMimeType,
    image64toCanvasRef,
    fixRealSize,
    getIntlIdFromErrorCode,
    validateFile,
    resizeImgFromBase64,
    exportToCsv,
    saveFile,
    getNewSizesFromImgSrc,
    binaryToOctet,
    readFileURL
} from "./files";
export {
    getBase64FromResponse
} from "./filesBuffer";