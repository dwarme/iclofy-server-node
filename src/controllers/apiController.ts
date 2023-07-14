import { Request, Response } from "express"
import { IClofyAuthenticationError, IClofyUserError } from "../models/IClofyError"
import User from "../models/User"
import { IAuthLoginInput, IUser, IUserCreateInput } from "../types"
import { getLoginSession, setLoginSession } from "../utils/auth-util"
import { graphQLError } from "../utils/error-util"
import { validatePassword } from "../utils/auth-password-util"
import { IAuthLoginSession } from "../types/auth"

async function signUp(req: Request, res: Response, input: IUserCreateInput){
    const sessionCurrent = await getLoginSession(req)
    if(sessionCurrent){
        throw graphQLError('', {}, new IClofyAuthenticationError({
            type: 'authentication_error',
            code: 'already_connected',
            message: "Already connected"
        }))
    } 

    try{

       const _: IUser = await User.retrieve(input.email); 

    }catch(error: any){
        if( !(error instanceof IClofyUserError && error.code === 'user_not_found') ){
            throw error
        }
    }
    
    const user = await User.create(input)
    return {user}
}

async function signIn(req: Request, res: Response, input: IAuthLoginInput){
    const sessionCurrent = await getLoginSession(req)
    if(sessionCurrent){
        throw graphQLError('', {}, new IClofyAuthenticationError({
            type: 'authentication_error',
            code: 'already_connected',
            message: "Already connected"
        }))
    }

    const user: IUser = await User.retrieve(input.email)
    
    if(!(await validatePassword(input.password, user.password))){
        throw graphQLError('', {}, new IClofyAuthenticationError({
            type: 'authentication_error',
            code: 'password_incorrect',
            message: "Password or email invalid"
        }))
    }

    const session: IAuthLoginSession = {
        id: user.id,
        email: user.email
    }

    await setLoginSession(res, session)
    return {user}
}

const apiController = {
    signUp,
    signIn
}

export default apiController;