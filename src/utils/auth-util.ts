import { Request, Response } from "express";
import Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies-util'
import { IAuthLoginSession, IAuthTokenData } from "../types/auth";
import { IClofyAuthenticationError, IClofyError } from "../models/IClofyError";

const TOKEN_SECRET = process.env.TOKEN_SECRET!

export async function setLoginSession(res: Response, session: IAuthLoginSession) {
    const createdAt = Date.now()

    // Create a session object with a max age that we can validate later
    const obj: IAuthTokenData = { ...session, createdAt, maxAge: MAX_AGE }
    const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

    setTokenCookie(res, token)
}

export async function getLoginSession(req: Request) {
    const token = getTokenCookie(req)

    if (!token) {
        throw new IClofyAuthenticationError({
            type: 'authentication_error',
            code: 'authentication_required',
            message: 'Authentication required'
        })
    }

    const session: IAuthTokenData = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
    const expiresAt = session.createdAt + session.maxAge * 1000

    // Validate the expiration date of the session
    if (Date.now() > expiresAt) {
        throw IClofyError.generate({
            type: 'cookie_error',
            code: 'cookie_token_expired',
            message: 'Session expired'
        })
    }

    return session
}