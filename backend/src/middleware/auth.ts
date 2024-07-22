import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

//add a userId property to the Request type in the express namespace
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

// logged in user middleware
const verifyToken = (request: Request, response: Response, next: NextFunction) => {

    //we need to install a cookie parser package -- npn i cookie-parser
    const token = request.cookies["auth_token"];

    if (!token) {
        return response.status(401).json({ message: "Unauthorized" });
    }

    try {
        //verify the token if it's created by us and not createtd by someone else
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        request.userId = (decoded as JwtPayload).userId;
        next();
    } catch (error) {
        return response.status(401).json({ message: "Unauthorized" });
    }
}

export default verifyToken