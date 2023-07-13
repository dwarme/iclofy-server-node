export interface IAuthLoginSession{
    email: string
}

export interface IAuthTokenData extends IAuthLoginSession{
    createdAt: number;
    maxAge: number
}