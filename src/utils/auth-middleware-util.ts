import { NextFunction, Request, Response } from "express";
import { getLoginSession } from "./auth-util";
import { APP_ROUTES_WEB } from "./app-util";

export async function webMiddlewareAuthRequired (req: Request, res: Response, next: NextFunction){
    try{
        
        const session = getLoginSession(req)
        next()

    }catch(error){
        res.redirect(APP_ROUTES_WEB.signIn)
    }
}

export async function webMiddlewareDisconnectRequired (req: Request, res: Response, next: NextFunction){
    try{

        const session = getLoginSession(req)
        res.redirect(APP_ROUTES_WEB.account)

    }catch(error){
        next()
    }
}