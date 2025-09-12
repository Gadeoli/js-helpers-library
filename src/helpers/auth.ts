import { DecodeJwtPayloadProps, RemainingSecsProps } from "./auth.types";

export const decodeJwtPayload : DecodeJwtPayloadProps = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}

export const remainingSecs : RemainingSecsProps = (payload) => {
    if(!payload || !payload.exp) return 0;

    const now = Math.floor(Date.now() / 1000);
    
    return payload.exp - now;
}