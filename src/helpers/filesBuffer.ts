import { default as B } from 'buffer'
import { 
    getBase64FromResponseProps
} from './filesBuffer.types';

export const getBase64FromResponse: getBase64FromResponseProps = (data) => {
    const { Buffer } = B;

    return Buffer.from(data, 'binary').toString('base64');
    
    /*
    return btoa(
        new Uint8Array(data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      );
    */
}