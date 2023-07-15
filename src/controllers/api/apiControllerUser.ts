import { Request, Response } from "express";
import { IUserUpdateNameInput, IUserUpdatePasswordInput } from "../../types";
import { getLoginSession } from "../../utils/auth-util";
import User from "../../models/User";
import { validatePassword } from "../../utils/auth-password-util";
import { IClofyAuthenticationError } from "../../models/IClofyError";

async function user(req: Request, _res: Response){

    const session = await getLoginSession(req);
    const user = await User.retrieve(session.email);

    return { user }
}

async function updateName(req: Request, _res: Response, input: IUserUpdateNameInput){
    const session = await getLoginSession(req);

    const user = await User.updateName(session.id, input);
    return { user }
}

async function updateEmail(req: Request, _res: Response, email: string){
    const session = await getLoginSession(req);

    const user = await User.updateEmail(session.id, email);
    return { user }
}

async function updatePassword(req: Request, _res: Response, input: IUserUpdatePasswordInput){
    const session = await getLoginSession(req);

    const retrievedUser = await User.retrieve(session.email);
    if(!validatePassword(input.password_old, retrievedUser.password )){
        throw new IClofyAuthenticationError({
            type: 'authentication_error',
            code: 'password_incorrect',
            message: 'Password does not match',
            detail: 'password_old'
        })
    }
    const user = await User.updatePassword(session.id, input.password_new);
    return { user }
}

const apiControllerUser = {
    user,
    updateName,
    updateEmail,
    updatePassword
}

export default apiControllerUser;