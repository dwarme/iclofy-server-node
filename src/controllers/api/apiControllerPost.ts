import { Request, Response } from "express";
import { IPost, IPostCreateInput, IPostListInput, IPostUpdateInput } from "../../types";
import { getLoginSession } from "../../utils/auth-util";
import Post from "../../models/Post";
import User from "../../models/User";
import { IClofyPermissionError } from "../../models/IClofyError";

async function postRetrieve(req: Request, _res: Response, postId: string): Promise<{post: IPost}>{
    const _ = await getLoginSession(req);
    const post = await Post.retrieve(postId)
    return { post }
}

async function postList(req: Request, _res: Response, input: IPostListInput): Promise<{posts: IPost[]}>{
    const _ = await getLoginSession(req);
    const posts = await Post.list(input)
    return { posts }
}

async function postAdd(req: Request, _res: Response, input: IPostCreateInput): Promise<{post: IPost}>{
    const _ = await getLoginSession(req);
    const post = await Post.add(input)
    return { post }
}

async function postUpdate(req: Request, _res: Response, input: IPostUpdateInput): Promise<{post: IPost}>{
    const _ = await getLoginSession(req);
    const post = await Post.update(input)
    return { post }
}

async function postRemove(req: Request, _res: Response, postId: string): Promise<void>{
    const session = await getLoginSession(req);
    const user = await User.retrieve(session.email)
    if( !(user.permissions.includes('admin') || user.permissions.includes('full')) ){
        throw new IClofyPermissionError({
            message: 'Action not allowed',
            type: 'permission_error',
            code: 'permission_required'
        })
    }

    await Post.remove(postId)
}

const apiControllerPost = {
    retrieve: postRetrieve,
    list: postList,
    add: postAdd,
    update: postUpdate,
    remove: postRemove,
}

export default apiControllerPost;