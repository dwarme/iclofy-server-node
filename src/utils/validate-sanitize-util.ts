import validator from 'validator'
import { IUserCreateInput, IUserPermission, IUserUpdateNameInput } from "../types";
import { VALIDE_USER_PERMISSIONS } from './constants-util';

const SANITIZE_BLACKLIST = `\/<>"'`

export function sanitize(str: string){
    return validator.blacklist(str, SANITIZE_BLACKLIST)
}

export function validateUserName(name: string){
    return validator.isLength(
        name, 
        {
            min: 2,
            max: 150
        }
    )
}

export function validateEmail(email: string){
    return validator.isEmail(email)
}

export function validatePassword(password: string){
    password = password.trim()
    return validator.isLength(
        password,
        {
            min: 6,
            max: 16
        }
    )
}

export function validatePermissions(permissions: IUserPermission[]){
    for(const permission in permissions){
        if(!VALIDE_USER_PERMISSIONS.includes(permission as IUserPermission)){
            return false
        }
    }

    return true
}

function userCreate(input: IUserCreateInput){
    const invalidFields: string[] = []

    input.firstname = sanitize( input.firstname )
    input.lastname = sanitize( input.lastname )

    if( !validateUserName(input.firstname) )    invalidFields.push('firstname')
    if( !validateUserName(input.lastname) )     invalidFields.push('lastname')
    if( !validateEmail(input.email) )           invalidFields.push('email')
    if( !validatePassword(input.password) )     invalidFields.push('password')

    return {input, invalidFields, valide: invalidFields.length > 0};
}

function userUpdateName(input: IUserUpdateNameInput){
    const invalidFields: string[] = []

    input.firstname = sanitize( input.firstname )
    input.lastname = sanitize( input.lastname )

    if( !validateUserName(input.firstname) )    invalidFields.push('firstname')
    if( !validateUserName(input.lastname) )     invalidFields.push('lastname')

    return {input, invalidFields, valide: invalidFields.length == 0};
}

function userUpdateEmail(email: string){
    return validateEmail(email)
}

function userUpdatePassword(password: string){
    return validatePassword(password)
}

function userUpdatePermissions(permissions: IUserPermission[]){
    return validatePermissions(permissions)
}

const sanitizeValidate = {
    userCreate,
    userUpdateName,
    userUpdateEmail,
    userUpdatePassword,
    userUpdatePermissions
}

export default sanitizeValidate;