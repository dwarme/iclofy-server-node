import { IAuthLoginInput, IUser, IUserCreateInput } from "../../types";
import { graphQLError, graphQLErrorUnknow } from "../../utils/error-util";
import apiController from "../../controllers/apiController";
import { removeTokenCookie } from "../../utils/auth-cookies-util";

const authResolvers = {
    Mutation: {
        async signUp(_parent: any, args: { input: IUserCreateInput }, _context: any, _info: any) {

        },

        async signIn(_parent: any, args: { input: IAuthLoginInput }, context: any, _info: any) {
            try {

                const {user} = await apiController.signIn(context.req, context.res, args.input)
                return {user}

            } catch (error: any) {
                if ('object' in error && error.object == 'iclofy_error') {
                    throw graphQLError(error.message, {}, error)
                }

                throw graphQLErrorUnknow
            }
        },

        async signOut(_parent: any, _args: any, context: any, _info: any){
            removeTokenCookie(context.res)
            return {status: true}
        }
    }
}

export default authResolvers;