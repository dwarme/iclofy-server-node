import apiController from "../../controllers/api";
import { IUserUpdateNameInput, IUserUpdatePasswordInput } from "../../types";
import { graphQLError, graphQLErrorUnknow } from "../../utils/error-util";

const userResolvers = {
    Query: {
        async user(_parent: any, _args: any, context: any, _info: any){
            try{

                const { user } = await apiController.user.user(context.req, context.res)
                return { user }

            }catch(error: any){
                if ('object' in error && error.object == 'iclofy_error') {
                    throw graphQLError(error.message, {}, error)
                }

                throw graphQLErrorUnknow
            }
        }
    },

    Mutation: {
        async userUpdateName(_parent: any, args: { input: IUserUpdateNameInput }, context: any, _info: any){
            try{

                const { user } = await apiController.user.updateName(context.req, context.res, args.input);
                return { user }

            }catch(error: any){
                if ('object' in error && error.object == 'iclofy_error') {
                    throw graphQLError(error.message, {}, error)
                }

                throw graphQLErrorUnknow
            }
        },

        async userUpdateEmail(_parent: any, args: { email: string }, context: any, _info: any){
            try{
                
                const user = await apiController.user.updateEmail(context.req, context.res, args.email);
                return { user }

            }catch(error: any){
                if ('object' in error && error.object == 'iclofy_error') {
                    throw graphQLError(error.message, {}, error)
                }

                throw graphQLErrorUnknow
            }
        },

        async userUpdatePassword(_parent: any, args: { input: IUserUpdatePasswordInput }, context: any, _info: any){
            try{
                
                const user = await apiController.user.updatePassword(context.req, context.res, args.input);
                return { user }

            }catch(error: any){
                if ('object' in error && error.object == 'iclofy_error') {
                    throw graphQLError(error.message, {}, error)
                }

                throw graphQLErrorUnknow
            }
        }
    }
}

export default userResolvers;