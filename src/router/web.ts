import express from 'express'

const router = express.Router()

router.get('/', (_req, res)=>{
    res.render('index.ejs', {})
})

const webRouters = router
export default webRouters;