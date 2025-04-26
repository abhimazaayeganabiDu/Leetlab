import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import {v2 as cloudinary} from 'cloudinary'
 


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


// routes import here
import authRoutes from "./routes/auth.route.js"
import { truncates } from 'bcryptjs'


// routes add here

app.use("/api/v1/auth", authRoutes)


export default app;