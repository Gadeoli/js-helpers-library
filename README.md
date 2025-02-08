# JS-mix-functions

Some simple JS functions in one place

## Functions

- common  
  - copyToClipboard (better supportted browser copy to clipboard - text)  
  - getQueryStringParamByName (simple extract param from a given url - default url is used if none passed)  
  - justNumbersAndLetters  
  - reorderArrayItem  (reorder an array item moving all the others)  
  - replaceManyStr  
  - searchManyInArray (check if a item of array B belongs to array A, no object itens supported)  
  - secureJSONStringify (secure stringify - avoid undefined errors)  

- files
  - downloadBase64File  
  - downloadBlobFile  
  - base64StringtoFile  
  - extractFileMimeFromBase64  
  - extractFileExtentionFromBase64  
  - extractFileNameFromDisposition    
  - getExtensionByMimeType  
  - image64toCanvasRef   
  - fixRealSize  
  - getIntlIdFromErrorCode    
  - validateFile  
  - resizeImgFromBase64  
  - exportToCsv  
  - saveFile  
  - getNewSizesFromImgSrc  
  - binaryToOctet  
  - readFileURL  

- fileBuffer  
  - readFileURL   

- styles  
  - handleCssClassnames  

- time  
  - addInMinutes  (add minutes in a date)  
  - diffInMinutes (from 2 dates)  
  - diffInSeconds (from 2 dates)  


## Use

```
import {functionName} from '@gadeoli/js-helpers-library';
```

## How to maintain

1. Clone  
2. NVM use 22.13.1 (node 22.13.1 / npm 10.9.2)  
3. npm i  
4. make changes  
5. git add / git commit / git push  
6. npm run publish (custom command)  

## Sources
- None source informed, but most of the functions come from (or are based from) online foruns (stackoverflow and others)