import { ApiError } from "../utils/api-error-handle.js";
import { db } from "../libs/db.js";
import { AsyncHandler } from "../utils/api-async-handler.js";
import jwt from 'jsonwebtoken'

const checkLogin = AsyncHandler(async (req, res, next) => {
    const token = req.cookies.ACCESS_TOKEN;

    if(!token) {
        throw new ApiError(401, "Token expired, Please Login again.")
    }

    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await db.user.findUnique({
        where:{
            id:data.id
        }
    })

    if(!user) {
        throw new ApiError(404, "User not found or token expired. Please login again")
    }
    
    req.user = await user;
    next()
})

export {checkLogin}