type IUserPermission = 'full' | 'admin';

export interface IUser{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    permissions: IUserPermission[];
}

export interface IUserListing{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    permissions: IUserPermission[];
}

export interface IUserCreateInput{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface IUserUpdateInput{
    firstname: string;
    lastname: string;
}

export interface IAuthLoginInput{
    email: string;
    password: string;
}