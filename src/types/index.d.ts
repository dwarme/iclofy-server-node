type IUserPermission = 'full' | 'admin';

export interface IUser{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    permissions: IUserPermission[];
}

export interface IUserListing{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    permissions: IUserPermission[];
}

export interface IPost {
    id: number;
    post_source: string;
    post_type: 'video' | 'image';
    post_id: string;
    post_actor_id: string;
    post_video_url: string;
    post_image_url: string;
    post_title: string;
    post_description: string;
    post_call_to_action_link: string;
    post_created_on: number;
    added_on: number;
    updated_on: number;
    is_visible: boolean;
    tags: string;
}

export interface IPostListing extends IPost{  }

export interface IUserCreateInput{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface IUserUpdateNameInput{
    firstname: string;
    lastname: string;
}

export interface IUserUpdatePasswordInput{
    password_old: string;
    password_new: string;
}

export interface IPostCreateInput {
    post_source: string;
    post_type: 'video' | 'image';
    post_id: string;
    post_actor_id: string;
    post_video_url: string;
    post_image_url: string;
    post_title: string;
    post_description: string;
    post_call_to_action_link: string;
    post_created_on: string;
    is_visible: boolean;
    tags: string;
}

export interface IPostUpdateInput extends IPostListing { }

export interface IAuthLoginInput{
    email: string;
    password: string;
}