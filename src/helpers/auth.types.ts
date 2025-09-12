export interface DecodeJwtPayloadProps {
    (token: string) : any
};

export interface RemainingSecsProps {
    (payload: any) : number
};