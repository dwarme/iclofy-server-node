import { gql } from "apollo-server-express";

const postTypeDefs = gql`
    enum PostType{
        video
        image
    }

    type PostPayload{
        post: Post!
    }

    type PostListPayload{
        posts: [Post!]!
    }

    type PostRemovePayload{
        removedPostId: String!
    }

    input PostAddInput{
        post_source: String!
        post_type: PostType!
        post_id: String!
        post_actor_id: String!
        post_video_url: String!
        post_image_url: String!
        post_title: String!
        post_description: String!
        post_call_to_action_link: String!
        post_created_on: String!
        is_visible: Boolean!
        tags: [String!]!
    }

    input PostUpdateInput{
        post_source: String!
        post_type: PostType!
        post_id: String!
        post_actor_id: String!
        post_video_url: String!
        post_image_url: String!
        post_title: String!
        post_description: String!
        post_call_to_action_link: String!
        is_visible: Boolean!
        tags: [String!]!
    }

    input PostListInput{
        page: Int!
        tag: String!
    }

    type Query{
        post(postId: string!): PostPayload!
        postList(input: PostListInput!): PostListPayload!
    }

    type Mutation{
        postAdd(input: PostAddInput!): PostPayload!
        postUpdate(input: PostUpdateInput!): PostPayload!
        postRemove(postId: string!): PostRemovePayload!
    }
`

export default postTypeDefs;