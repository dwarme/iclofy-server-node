import { Request } from "express"
import { AppAuthenticationError } from "../models/AppError"
import User from "../models/User"
import { IAuthLoginInput, IUser } from "../types"
import { getLoginSession } from "../utils/auth-util"
import { graphQLError } from "../utils/error-util"
import { validatePassword } from "../utils/auth-password-util"

const signIn = async (req: Request, input: IAuthLoginInput)=>{
    const session = await getLoginSession(req)

    if(session){
        throw graphQLError('', {}, new AppAuthenticationError({
            type: 'authentication_error',
            code: 'already_connected',
            message: "Already connected"
        }))
    }

    const user: IUser = await User.retrieve(input.email)
    
    if(!validatePassword(input.password, user.password)){
        throw graphQLError('', {}, new AppAuthenticationError({
            type: 'authentication_error',
            code: 'password_incorrect',
            message: "Password or email invalid"
        }))
    }

    return {user}
}

const apiController = {
    signIn
}

export default apiController;