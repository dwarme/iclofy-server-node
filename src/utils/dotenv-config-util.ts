import dotenv from 'dotenv'
const dotenvConfig = ()=>{
    if(process.env.NODE_ENV === 'production') dotenv.config({path: '.env'})
    else dotenv.config({path: '.env.dev'})
}

export default dotenvConfig;