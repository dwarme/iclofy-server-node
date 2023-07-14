const DB_QUERIES_USER = {
    select: {
        one: {
            byEmail: `SELECT * FROM users WHERE email = $1`,
            byId: `SELECT * FROM users WHERE id = $1`
        },
        all: `SELECT * FROM users ORDER BY id DESC`
    },

    add: `
        INSERT INTO users(
            firstname,
            lastname,
            email,
            password,
            permissions
        )

        VALUES($1, $2, $3, $4, $5)
        RETURNING *
    `,

    update: {
        name: `
            UPDATE users SET 
                firstname = $1,
                lastname = $2
            WHERE id = $3
            RETURNING *
        `,

        permissions: `
            UPDATE users SET 
                permissions = $1
            WHERE id = $2
            RETURNING *
        `,

        email: `
            UPDATE users SET 
                email = $1
            WHERE id = $2
            RETURNING *
        `,

        password: `
            UPDATE users SET 
                password = $1
            WHERE id = $2
            RETURNING *
        `
    },

    delete: `DELETE FROM users WHERE id = $1`
}

export default DB_QUERIES_USER;