import { NextFunction,Response,Request } from "express";
import { ErrorHandler } from "../utils/error-handler";

export const ErrorMiddleware=(
 err:unknown,
 req:Request,
 res:Response,
 next:NextFunction
)=>{
    const errorResponse=ErrorHandler(err);
    
     console.error({
        messge:errorResponse.message,
        statusCode:errorResponse.statusCode,
        path:req.path,
        method:req.method
     })
     
    res.status(errorResponse.statusCode).json(errorResponse)
} 