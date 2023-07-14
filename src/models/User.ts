import DB_QUERIES_USER from "../database/queries/user-queries";
import { IUser, IUserCreateInput, IUserPermission, IUserUpdateNameInput } from "../types";
import { hashPassword } from "../utils/auth-password-util";
import runQuery from "../utils/db-queries-util";
import { IClofyUserError } from "./IClofyError";

class User {
    static async create(input: IUserCreateInput): Promise<IUser> {
        // Valid input
        // Check if email is already taked
        // hash password
        const passwordHashed = await hashPassword(input.password)
        // insert data on database
        const queryResult = await runQuery.modifying<IUser>(
            DB_QUERIES_USER.add,
            [
                input.firstname,
                input.lastname,
                input.email,
                passwordHashed,
                [] // Permissions
            ]
        )

        if (queryResult.error) {
            throw new IClofyUserError({
                type: 'user_error',
                code: 'unknown',
                statusCode: 500
            })
        }

        const user = queryResult.rowsEffected[0]
        return user

    }

    static async retrieve(email: string): Promise<IUser> {
        // Valid input

        // Retrieve user from database
        const queryResult = await runQuery.select<IUser>(
            DB_QUERIES_USER.select.one.byEmail,
            [email]
        )

        if (queryResult.error) {
            throw new IClofyUserError({
                type: 'user_error',
                code: 'unknown'
            })
        }

        if (queryResult.rows.length == 0) {
            throw new IClofyUserError({
                type: 'user_error',
                code: 'user_not_found'
            })
        }

        return queryResult.rows[0]
    }

    static async updateName(userId: number, input: IUserUpdateNameInput): Promise<IUser> {
        // Valid input

        const queryResult = await runQuery.modifying<IUser>(
            DB_QUERIES_USER.update.name,
            [
                input.firstname,
                input.lastname, userId

            ]
        )

        if (queryResult.error) {
            throw new IClofyUserError({
                type: 'user_error',
                code: 'unknown'
            })
        }

        if (queryResult.rowsEffected.length == 0) {
            throw new IClofyUserError({
                type: 'user_error',
                code: 'user_not_found'
            })
        }

        return queryResult.rowsEffected[0]
    }

    static async updateEmail(userId: string, newEmail: string): Promise<IUser> {
        // Valid input

        const queryResult = await runQuery.modifying<IUser>(
            DB_QUERIES_USER.update.email,
            [
                newEmail,
                userId
            ]
        )

        if (queryResult.error) {
            throw new IClofyUserError({
                type: 'user_error',
                code: 'unknown'
            })
        }

        if (queryResult.rowsEffected.length == 0) {
            throw new IClofyUserError({
                type: 'user_error',
                code: 'user_not_found'
            })
        }

        return queryResult.rowsEffected[0]
    }

    static async updatePassword(userId: number, newPassword: string): Promise<IUser> {
        // Valid input

        // Hash password
        const passwordHashed = await hashPassword(newPassword)

        const queryResult = await runQuery.modifying<IUser>(
            DB_QUERIES_USER.update.password,
            [
                passwordHashed,
                userId
            ]
        )

        if (queryResult.error) {
            throw new IClofyUserError({
                type: 'user_error',
                code: 'unknown'
            })
        }

        if (queryResult.rowsEffected.length == 0) {
            throw new IClofyUserError({
                type: 'user_error',
                code: 'user_not_found'
            })
        }

        return queryResult.rowsEffected[0]
    }

    static async updatePermissions(userId: number, permissions: IUserPermission[]): Promise<IUser> {
        // Valid input

        const queryResult = await runQuery.modifying<IUser>(
            DB_QUERIES_USER.update.permissions,
            [
                permissions,
                userId
            ]
        )

        if (queryResult.error) {
            throw new IClofyUserError({
                type: 'user_error',
                code: 'unknown'
            })
        }

        if (queryResult.rowsEffected.length == 0) {
            throw new IClofyUserError({
                type: 'user_error',
                code: 'user_not_found'
            })
        }

        return queryResult.rowsEffected[0]
    }
}

export default User;