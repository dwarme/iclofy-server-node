import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { CORS_ORIGIN } from './utils/constants-util'
import webRouters from './router/web'
import apiRouters from './router/api'

const app = express()
const PORT = 8069

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: CORS_ORIGIN,
    optionsSuccessStatus: 200
}))

app.use(webRouters)
app.use(apiRouters)

app.listen(PORT, () =>
  console.log(`App is listening at http://localhost:${PORT}`)
);