const DB_QUERIES_POST = {
    select: {
        one: {
            byPostId: `SELECT * FROM posts WHERE id = $1`
        },
        filter: `SELECT * FROM posts WHERE $1 IN tags ORDER BY id DESC LIMIT $2 OFFSET $3`,
        all:`SELECT * FROM posts ORDER BY id DESC LIMIT $1 OFFSET $2`,
    },

    add: `
        INSERT INTO posts(
            post_source,
            post_type,
            post_id,
            post_actor_id,
            post_video_url,
            post_image_url,
            post_title,
            post_description,
            post_call_to_action_link,
            post_created_on,
            added_on,
            updated_on,
            is_visible,
            tags
        )

        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW(), $11, $12)
        RETURNING *
    `,

    update: `
        UPDATE posts SET 
            post_source = $1,
            post_type = $2,
            post_id = $3,
            post_actor_id = $4,
            post_video_url = $5,
            post_image_url = $6,
            post_title = $7,
            post_description = $8,
            post_call_to_action_link = $9,
            post_created_on = $10,
            updated_on = NOW(),
            is_visible = $11,
            tags = $12
        WHERE id = $13
        RETURNING *
    `,

    delete: `DELETE FROM posts WHERE post_id = $1`
}

export default DB_QUERIES_POST;