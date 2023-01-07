
declare module 'LoginModule' {
    export interface FetchVerificationCodeQuery {
        userAccount: string;
        userPassword: string;
        identifyCode: string;
    }
    export interface FetchLoginQuery extends FetchVerificationCodeQuery {
        uniqueCode: string;
        verifyCode: string;
    }
}
