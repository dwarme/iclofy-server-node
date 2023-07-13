import bcrypt from 'bcrypt'
import { AppAuthenticationError } from '../models/AppError';

export async function hashPassword(plainText: string) {
    try {

        const hashed = await bcrypt.hash(plainText, 12);
        return hashed;

    } catch (error) {

        throw new AppAuthenticationError({
            type: 'authentication_error',
            detail: 'password',
            message: 'An error occured while securing password'
        })

    }
}

export async function validatePassword(plainText: string, hashedText: string) {
    try {

        const match = await bcrypt.compare(plainText, hashedText);
        return match;

    } catch (error) {
        throw new AppAuthenticationError({
            type: 'authentication_error',
            code: 'password_incorrect',
            detail: 'password',
            message: 'Incorrect password'
        })

    }
}