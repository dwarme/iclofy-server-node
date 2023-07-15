import express from 'express'
import { APP_ROUTES_WEB } from '../utils/app-util'
import { webMiddlewareAuthRequired, webMiddlewareDisconnectRequired } from '../utils/auth-middleware-util'

const router = express.Router()

router.get(APP_ROUTES_WEB.home, webMiddlewareDisconnectRequired, (_req, res)=>{
    res.render('index.ejs', {})
})

router.get(APP_ROUTES_WEB.signIn, webMiddlewareDisconnectRequired, (_req, res)=>{
    res.render('index.ejs', {})
})

router.get(APP_ROUTES_WEB.signUp, webMiddlewareDisconnectRequired, (_req, res)=>{
    res.render('index.ejs', {})
})

router.get(APP_ROUTES_WEB.account, webMiddlewareAuthRequired, (_req, res)=>{
    res.render('index.ejs', {})
})

router.get(APP_ROUTES_WEB.accountSetting, webMiddlewareAuthRequired, (_req, res)=>{
    res.render('index.ejs', {})
})

router.get(APP_ROUTES_WEB.posts, webMiddlewareAuthRequired, (_req, res)=>{
    res.render('index.ejs', {})
})

router.get(APP_ROUTES_WEB.post, webMiddlewareAuthRequired, (_req, res)=>{
    res.render('index.ejs', {})
})

router.get(APP_ROUTES_WEB.legalTerms, (_req, res)=>{
    res.render('index.ejs', {})
})

router.get(APP_ROUTES_WEB.legalPrivacyPolicy, (_req, res)=>{
    res.render('index.ejs', {})
})

const webRoutes = router
export default webRoutes;