import { IPost, IPostCreateInput, IPostListing } from "../types";

class Post{

    static async create(input: IPostCreateInput): Promise<IPost>{
        
    }

    static async retrieve(postId: string): Promise<IPost>{

    }

    static async list(page: number, tag: string): Promise<IPost>{

    }

    static async update(input: IPostListing): Promise<IPost>{

    }

    static async remove(id: number): Promise<IPost>{

    }
}

export default Post;