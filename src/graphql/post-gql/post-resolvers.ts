import apiController from "../../controllers/api";
import { IPostCreateInput, IPostListInput, IPostUpdateInput } from "../../types";
import { graphQLError, graphQLErrorUnknow } from "../../utils/error-util";

const postResolvers = {
    Query: {
        async post(_parent: any, args: { postId: string }, context: any, _info: any){
            try{

                const post = await apiController.post.retrieve(context.req, context.res, args.postId)
                return { post }

            }catch (error: any) {
                if ('object' in error && error.object == 'iclofy_error') {
                    throw graphQLError(error.message, {}, error)
                }

                throw graphQLErrorUnknow
            }
        },

        async postList(_parent: any, args: { input: IPostListInput }, context: any, _info: any){
            try{
                
                const posts = await apiController.post.list(context.req, context.res, args.input)
                return { posts }

            }catch (error: any) {
                if ('object' in error && error.object == 'iclofy_error') {
                    throw graphQLError(error.message, {}, error)
                }

                throw graphQLErrorUnknow
            }
        }
    },

    Mutation: {
        async postAdd(_parent: any, args: { input: IPostCreateInput }, context: any, _info: any){
            try{
                
                const post = await apiController.post.add(context.req, context.res, args.input)
                return { post }

            }catch (error: any) {
                if ('object' in error && error.object == 'iclofy_error') {
                    throw graphQLError(error.message, {}, error)
                }

                throw graphQLErrorUnknow
            }
        },

        async postUpdate(_parent: any, args: { input: IPostUpdateInput }, context: any, _info: any){
            try{
                
                const post = await apiController.post.update(context.req, context.res, args.input)
                return { post }

            }catch (error: any) {
                if ('object' in error && error.object == 'iclofy_error') {
                    throw graphQLError(error.message, {}, error)
                }

                throw graphQLErrorUnknow
            }
        },

        async postRemove(_parent: any, args: { postId: string }, context: any, _info: any){
            try{
                
                await apiController.post.remove(context.req, context.res, args.postId)
                const removedPostId = args.postId
                return { removedPostId }

            }catch (error: any) {
                if ('object' in error && error.object == 'iclofy_error') {
                    throw graphQLError(error.message, {}, error)
                }

                throw graphQLErrorUnknow
            }
        }
    }
}

export default postResolvers;