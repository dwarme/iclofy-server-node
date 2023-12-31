import { IAuthLoginInput, IUserCreateInput } from "../../types";
import { graphQLError, graphQLErrorUnknow } from "../../utils/error-util";
import apiController from "../../controllers/api/apiControllerAuth";
import { removeTokenCookie } from "../../utils/auth-cookies-util";

const authResolvers = {
    Mutation: {
        async authSignUp(_parent: any, args: { input: IUserCreateInput }, context: any, _info: any) {
            try {

                const { user } = await apiController.signUp(context.req, context.res, args.input)
                return { user }

            } catch (error: any) {
                if ('object' in error && error.object == 'iclofy_error') {
                    throw graphQLError(error.message, {}, error)
                }

                throw graphQLErrorUnknow
            }
        },

        async authSignIn(_parent: any, args: { input: IAuthLoginInput }, context: any, _info: any) {
            try {

                const { user } = await apiController.signIn(context.req, context.res, args.input)
                return { user }

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