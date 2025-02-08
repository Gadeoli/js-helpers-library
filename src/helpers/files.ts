import { 
    downloadBase64FileProps,
    downloadBlobFileProps,
    base64StringtoFileProps,
    extractFileMimeFromBase64Props,
    extractFileExtentionFromBase64Props,
    extractFileNameFromDispositionProps,
    getExtensionByMimeTypeProps,
    image64toCanvasRefProps,
    fixRealSizeProps,
    getIntlIdFromErrorCodeProps,
    validateFileProps,
    resizeImgFromBase64Props,
    exportToCsvProps,
    saveFileProps,
    getNewSizesFromImgSrcProps,
    binaryToOctetProps,
    readFileURLProps
} from './files.types';

/**
 * About: JS functions (ES6) to help with files
 * Source: https://www.codingforentrepreneurs.com/blog/a-few-javascript-methods-for-images-files/ 
 * Author: Justin Mitchel
 * Contributors: Gabriel Morais
 */

//Download a Base64-encoded file
export const downloadBase64File : downloadBase64FileProps = (base64Data, filename) => {
    if(!base64Data) return false;
    const el = document.createElement('a');

    el.setAttribute('href', base64Data);
    el.setAttribute('download', filename);
    el.setAttribute('target', '_blank');
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    
    try {
        document.body.removeChild(el);
    } catch (error) {console.log('error to remove child')}    
}

/**
 * CroosBrowser download blob
 */
export const downloadBlobFile : downloadBlobFileProps = (blob, mime, filename) => {
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    const newBlob = new Blob([blob], {type: mime})

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    const nav = (window.navigator as any);
    if (nav && nav.msSaveOrOpenBlob) {
        nav.msSaveOrOpenBlob(newBlob);
        return;
    } 

    // For other browsers: 
    // Create a link pointing to the ObjectURL containing the blob.
    let data = window.URL.createObjectURL(newBlob);
    let el = document.createElement('a');
    el.href = data;
    el.download=filename;
    el.target="_blank";
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    try {
        document.body.removeChild(el);
    } catch (error) {console.log('error to remove child')}
    
    setTimeout(function(){
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
    }, 100);
}

//Convert a Base64-encoded string to a File object
export const base64StringtoFile : base64StringtoFileProps = (base64String, filename) => {
    let arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

//Get mime from a Base64
export const extractFileMimeFromBase64 : extractFileMimeFromBase64Props = (base64Data) => {
    return base64Data.substring(base64Data.indexOf("data:")+5, base64Data.indexOf(";base64"));
}

//Get extension from a Base64
export const extractFileExtentionFromBase64 : extractFileExtentionFromBase64Props = (base64Data) => {
    return getExtensionByMimeType(extractFileMimeFromBase64(base64Data)); 
}

//Get filename from a content disposition response
export const extractFileNameFromDisposition : extractFileNameFromDispositionProps = (str) => {
    return str.substring(str.indexOf("filename=")+9).replace(/\"/g, ''); 
}

export const getExtensionByMimeType : getExtensionByMimeTypeProps = (mime) => {
    let ext = '';

    switch (mime) {
        case 'application/pdf': ext = 'pdf'; break;
        case 'image/png': ext = 'png'; break;
        case 'image/jpeg': ext = 'jpeg'; break;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ext = 'xlsx'; break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ext = 'docx'; break;
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation': ext = 'pptx'; break;
        case 'application/msword': ext = 'doc'; break;
        case 'application/vnd.ms-powerpoint': ext = 'ppt'; break;
        case 'application/vnd.ms-excel': ext = 'xls'; break;
        case 'text/csv': ext = 'csv'; break;
        case 'text/plain': ext = 'txt'; break;
        case 'application/xml': ext = 'xml'; break;
        case 'video/x-msvideo': ext = 'avi'; break;
        case 'audio/mpeg': ext = 'mp3'; break;
        case 'video/webm': ext = 'webm'; break;
        case 'audio/wav': ext = 'wav'; break;
        case 'audio/webm': ext = 'weba'; break;
       
        default: ext = ''; break;
    }

    return ext;
}

//Base64 Image to Canvas with a Crop
export const image64toCanvasRef: image64toCanvasRefProps = (canvasRef, image64, pixelCrop) => {
    const canvas = canvasRef;
    const ctx = canvas.getContext('2d');
    const image = new Image()
    image.src = image64;
    image.onload = function() {
        const values = fixRealSize(image, pixelCrop);

        canvas.height = values.height;
        canvas.width = values.width;

        ctx.drawImage(
          image,
          values.x,
          values.y,
          values.width,
          values.height,
          0,
          0,
          values.width,
          values.height
        )
    }
}

export const fixRealSize: fixRealSizeProps = (image, pixelCrop) => {
    let fixed = pixelCrop;

    if(pixelCrop.unit !== undefined && pixelCrop.unit === '%'){
        fixed = {
            height: image.height * pixelCrop.height / 100,
            width: image.width * pixelCrop.width / 100,
            y: image.height * pixelCrop.y / 100,
            x: image.width * pixelCrop.x / 100,
        }
    }
            
    return fixed;
}

export const getIntlIdFromErrorCode: getIntlIdFromErrorCodeProps = (code) => {
    switch (code) {
        case 1001:
            return 'label.file.size';
        case 1002:
            return 'label.file.type';
        case 1003:
            return 'label.file.notFound';
        default:
            return 'label.file.invalid';
    } 
}

/**
 * 
 * @param file 
 * @param props  
 * @returns 
 */
export const validateFile: validateFileProps = (file, props) => {
    /*
     * Codes
     * 1000 - Success
     * 1001 - Invalid size
     * 1002 - Invalid type
     * 1003 - File not found
     * 1004 - Undefined
     */

    /*
        //How props should looks like
        //is necessary put that in const props (but i dont know how now, sorry!!)

        export const defaultImageLimits = (limits = {}) => {
            const {limit = 5, mimes = ''} = limits 
            const maxSize = 5 * 1024 * 1024 //limit is a mb helper size
            const mimesAllowed = mimes || 'image/x-png,image/png,image/jpeg'

            return {
                type: 'images',
                src: null,
                ext: null,
                size: null,
                maxSize: maxSize,
                maxSizeMB: limit,
                multiple: false,
                amount: 1,
                accept: mimesAllowed,
                validations: {
                    size: `Arquivo muito grande. ${limit}MB são o máximo permitido`,
                    type: `Esse tipo de arquivo não é permitido. Os tipos permitidos estão listados nos seguintes mimes: ${mimesAllowed}`,
                },
            }
        }
    */

    const validation : ({code: number | null; message: string}) = {
        code: null,
        message: ''
    };

    try{
        if(file === undefined){    
            validation.code = 1003;
            throw new Error('Not sended');
        }else{
            const currentFile = file;
            const currentType = currentFile.type;
            const currentSize = currentFile.size;

            //validate size
            if(currentSize > props.maxSize){
                validation.code = 1001;
                throw new Error(props.validations?.size || 'Too big');
            }

            //validate type
            let acceptArray = [];
            if(props.accept.indexOf(',') !== -1){
                acceptArray = props.accept.split(',').map((item: any) => {return item.trim()});
            }else{
                acceptArray = [props.accept]; //only one accept type
            }
    
            if(!acceptArray.includes(currentType)){
                validation.code = 1002;
                throw new Error(props.validations?.type || 'Invalid type: '+currentType);
            }
    
            validation.code = 1000;    
        }
    }catch(e: any){
        validation.message = e.message;
    }finally{
        return validation;
    }
}

/*
 * Use this to resize images from a src given
 */
export const resizeImgFromBase64: resizeImgFromBase64Props = (base64, quality = 80) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            const mime = 'image/'+extractFileExtentionFromBase64(base64);
            // console.log(mime);
            const {naturalHeight, naturalWidth} = image;
            let newSizes = getNewSizesFromImgSrc(naturalWidth, naturalHeight);
            let cvs = document.createElement('canvas');
    
            cvs.width =  newSizes.width;
            cvs.height = newSizes.height;
            const TwoD = cvs.getContext("2d");

            if(!TwoD) return false;
            
            TwoD.drawImage(image, 0, 0, newSizes.width, newSizes.height);
            let newSrc = cvs.toDataURL(mime, quality);
            cvs.remove();
            
            return resolve(newSrc);
        }
        image.onerror = reject;
        image.src = base64;
    })

    
}

//source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side    
export const exportToCsv: exportToCsvProps = (filename, rows, delimiter = ',') => {
    const fixRegex = `/("|\${delimiter}|\r\n|\n)/g`;
    
    const csvProcess = (rows: any, delimiter: string) => {
        let content = ''

        rows.forEach((row: any, rowIndex: any) => {
            let rowProcess = ''

            row.forEach((column: any, colIndex: any) => {
                let value = column === null ? '' : column.toString();

                if (column instanceof Date) {
                    value = column.toLocaleString();
                };

                //excel does not work with line breaks came from csv in imports
                //so remove all line breaks
                value = value.replace(/(\n|\r\n)/g, ' ')

                //other fixes
                value =  value.replace(/"/g, '""');
                if (value.search(fixRegex) >= 0)
                    value = '"' + value + '"';

                //include the delimiter
                value += delimiter;

                rowProcess += value;
            });
            
            //line finished, add break line
            content += rowProcess + `\n`
        })

        return content
    }

    const csvFile = csvProcess(rows, delimiter)

    const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    const nav = (window.navigator as any);

    if (nav && nav.msSaveBlob) { // IE 10+
        nav.msSaveBlob(blob, filename);
    } else {
        saveFile(filename, blob)
    }
}

export const saveFile: saveFileProps = (filename, content, type = 'blob') => {
    const link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
        let url = ''

        if(type === 'blob'){
            url = URL.createObjectURL(content);
        }
        
        link.setAttribute("href", url);
        // Browsers that support HTML5 download attribute
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export const getNewSizesFromImgSrc: getNewSizesFromImgSrcProps = (width, height) => {
    let newSize = {
        width: 0,
        height: 0,
        max: 0
    };

    if(width >= 1980 || height >= 1980){
        newSize.max = 1980;
    }else if(width >= 1000 || height >= 1000){
        newSize.max = 1000;
    }else if(width >= 500 || height >= 500){
        newSize.max = 500;
    }else if(width >= 250 || height >= 250){
        newSize.max = 250;
    }else{
        newSize.max = 125;
    }

    if(width > height){
        newSize.width = newSize.max;
        newSize.height = height / (width / newSize.width); 
    }else if(width < height){
        newSize.height = newSize.max;
        newSize.width = width / (height / newSize.height);
    }else{
        newSize.height = newSize.max;
        newSize.width = newSize.max;
    }

    return newSize;
}

export const binaryToOctet: binaryToOctetProps = (bin) => {
    const buf = new ArrayBuffer(bin.length); //convert s to arrayBuffer
    const view = new Uint8Array(buf);  //create uint8array as viewer
    for (let i=0; i<bin.length; i++) view[i] = bin.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
} 

export const readFileURL : readFileURLProps = (file) =>{
    return new Promise((resolve, reject) => {
        const fr = new FileReader();  
        
        fr.onload = () => {
            resolve(fr.result);
        };

        fr.onerror = reject;
        
        fr.readAsDataURL(file);
    });
}