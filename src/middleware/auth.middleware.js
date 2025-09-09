import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken"
export const verifyJWT = asyncHandler(async(req , res , next)=>{
   const token =  req.cookies?.accessToken  || req.header("Authorization")?.replace("Bearer ", "")

    if(!token){
        throw new ApiError(401,"unothorised Token")
    }
    try {
        const decoderToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET )
      
        const user =  await User.findById(decoderToken?._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
        );
        if(!user){
            throw new ApiError(401,"Invalid Access Token ")
        }
        req.user = user
        next()
    } catch (error) {
    console.error("JWT verification failed:", error.message);
    throw new ApiError(401, "Invalid Access Token");
}

})