export interface IAuthLoginSession{
    id: number;
    email: string
}

export interface IAuthTokenData extends IAuthLoginSession{
    createdAt: number;
    maxAge: number
}