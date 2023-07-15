import DB_QUERIES_USER from "../database/queries/user-queries";
import { IUser, IUserCreateInput, IUserPermission, IUserUpdateNameInput } from "../types";
import { hashPassword } from "../utils/auth-password-util";
import runQuery from "../utils/db-queries-util";
import sanitizeValidate from "../utils/validate-sanitize-util";
import { IClofyUserError } from "./IClofyError";

class User {
    static async create(input: IUserCreateInput): Promise<IUser> {

        const validated = sanitizeValidate.userCreate(input)
        if( !validated.valide ){
            throw new IClofyUserError({
                type: 'user_error',
                code: 'INVALID',
                invalideFields: validated.invalidFields
            })
        }

        input = validated.input

        try{
            const _user: IUser = await this.retrieve(input.email)
            throw new IClofyUserError({
                type: 'user_error',
                code: 'user_already_exists'
            })

        }catch(error: any){
            if ( !(error instanceof IClofyUserError )) throw error
            if(error.code != 'user_not_found') throw error
        }

        const passwordHashed = await hashPassword(input.password)

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
        
        if( !sanitizeValidate.userUpdateEmail(email) ){
            throw new IClofyUserError({
                type: 'user_error',
                code: 'INVALID',
                invalideFields: ['email']
            })
        }

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
        const validated = sanitizeValidate.userUpdateName(input)
        if( !validated.valide ){
            throw new IClofyUserError({
                type: 'user_error',
                code: 'INVALID',
                invalideFields: validated.invalidFields
            })
        }

        input = validated.input

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

    static async updateEmail(userId: number, newEmail: string): Promise<IUser> {

        if( !sanitizeValidate.userUpdateEmail(newEmail) ){
            throw new IClofyUserError({
                type: 'user_error',
                code: 'INVALID',
                invalideFields: ['email']
            })
        }

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

        if( !sanitizeValidate.userUpdatePassword(newPassword) ){
            throw new IClofyUserError({
                type: 'user_error',
                code: 'INVALID',
                invalideFields: ['password']
            })
        }

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

        if( !sanitizeValidate.userUpdatePermissions(permissions) ){
            throw new IClofyUserError({
                type: 'user_error',
                code: 'INVALID',
                invalideFields: ['permissions']
            })
        }

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