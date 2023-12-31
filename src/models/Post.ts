import DB_QUERIES_POST from "../database/queries/post-queries";
import { IPost, IPostCreateInput, IPostListInput, IPostListing } from "../types";
import runQuery from "../utils/db-queries-util";
import { IClofyPostError } from "./IClofyError";

class Post{

    static async add(input: IPostCreateInput): Promise<IPost>{
        
        // sanitize and validate input

        try{
            const _post: IPost = await this.retrieve(input.post_id)
            throw new IClofyPostError({
                message: 'Post already exists',
                type: 'post_error',
                code: 'post_already_exists'
            })

        }catch(error: any){
            if ( !(error instanceof IClofyPostError )) throw error
            if(error.code != 'post_not_found') throw error
        }

        const queryResult = await runQuery.modifying<IPost>(
            DB_QUERIES_POST.add,
            [
                input.post_source,
                input.post_type,
                input.post_id,
                input.post_actor_id,
                input.post_video_url,
                input.post_image_url,
                input.post_title,
                input.post_description,
                input.post_call_to_action_link,
                input.post_created_on,
                input.is_visible,
                input.tags
            ]
        )

        if (queryResult.error) {
            throw new IClofyPostError({
                type: 'post_error',
                code: 'unknown',
                statusCode: 500
            })
        }

        const post = queryResult.rowsEffected[0]
        return post
    }

    static async retrieve(postId: string): Promise<IPost>{

        // Sanitize and validate input

        const queryResult = await runQuery.select<IPost>(
            DB_QUERIES_POST.select.one.byPostId,
            [postId]
        )

        if (queryResult.error) {
            throw new IClofyPostError({
                message: 'Post not found',
                type: 'post_error',
                code: 'unknown'
            })
        }

        if (queryResult.rows.length == 0) {
            throw new IClofyPostError({
                message: 'Post not found',
                type: 'post_error',
                code: 'post_not_found'
            })
        }

        return queryResult.rows[0]
    }

    static async list(input: IPostListInput): Promise<IPost[]>{

        // Sanitize and validate input

        const LIMIT = 8;
        const OFFSET = input.page * LIMIT;
        const queryParams: any[] = [input.page]
        let query: string

        if(input.tag.trim().length > 0) {

            query = DB_QUERIES_POST.select.filter
            queryParams.push(input.tag)

        }else{
            query = DB_QUERIES_POST.select.all
        }
        
        queryParams.push(LIMIT)
        queryParams.push(OFFSET)

        const queryResult = await runQuery.select<IPost>(
            query,
            queryParams
        )

        if (queryResult.error) {
            throw new IClofyPostError({
                message: 'Post not found',
                type: 'post_error',
                code: 'unknown'
            })
        }

        return queryResult.rows
    }

    static async update(input: IPostListing): Promise<IPost>{

        // Sanitize and validate input

        const queryResult = await runQuery.modifying<IPost>(
            DB_QUERIES_POST.update,
            [
                input.post_source,
                input.post_type,
                input.post_id,
                input.post_actor_id,
                input.post_video_url,
                input.post_image_url,
                input.post_title,
                input.post_description,
                input.post_call_to_action_link,
                input.post_created_on,
                input.is_visible,
                input.tags,
                input.id
            ]
        )

        if (queryResult.error) {
            throw new IClofyPostError({
                message: 'An error occured',
                type: 'post_error',
                code: 'unknown'
            })
        }

        if (queryResult.rowsEffected.length == 0) {
            throw new IClofyPostError({
                message: 'Post not found',
                type: 'post_error',
                code: 'post_not_found'
            })
        }

        return queryResult.rowsEffected[0]
    }

    static async remove(postId: string): Promise<void>{
        const queryResult = await runQuery.modifying<IPost>(
            DB_QUERIES_POST.delete,
            [postId]
        )

        if (queryResult.error) {
            throw new IClofyPostError({
                message: 'An error occured',
                type: 'post_error',
                code: 'unknown'
            })
        }

        if (queryResult.rowsEffected.length == 0) {
            throw new IClofyPostError({
                message: 'Post not found',
                type: 'post_error',
                code: 'post_not_found'
            })
        }

    }
}

export default Post;