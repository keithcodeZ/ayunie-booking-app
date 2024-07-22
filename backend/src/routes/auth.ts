//LOGIN API ENDPOINT
// /api/auth/login
import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import verifyToken from "../middleware/auth";

const router = express.Router();

//create an access token and HTTP cookie
router.post("/login",
 [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 })
 ],
 async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }

    //destructuring email and password from the request body
    const { email, password } = request.body;

    try {
        //fetch user
        const user = await User.findOne({ email });

        if (!user) {
            return response.status(400).json({ message: "User does not exist OR invalid credentials" });
        }

        //compare passwords
        //takes the password from the request body and compares it to the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(400).json({ message: "Password is incorrect" });
        }

        //create an access token and return it as part of the HTTP cookie
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string, {
                //the token that we're gonna return to the frontend is only valid for 1 day
                expiresIn: "1d"
            }
        );

        response.cookie("auth_token", token, {
            httpOnly: true,
            //secure means only accept cooking over HTTPS
            //will return false if we're on dev mode else, true if we are on prod/deployment
            secure: process.env.NODE_ENV === "production",
            // sameSite: "strict",
            maxAge: 86400000,
            // maxAge: 24 * 60 * 60 * 1000
        });

        response.status(200).json({ userId: user._id });

    } catch (error){
        console.log(error);
        response.status(500).json({ message: `Something went wrong: ${error}` });
    }
 }
);

//whenever wemake a request to the validate token endopoint it's going to run some middleware which will check the HTTP Cookie that was sent to us by the frontend
router.get("/validate-token", verifyToken, (request: Request, response: Response) => {
    
    response.status(200).send({ userId: request.userId });
});


//logout endpoint to clear the HTTP cookie that was sent to us by the frontend
router.post("/logout", (request: Request, response: Response) => {
    response.cookie("auth_token", "", {
        expires: new Date(0),
    });

    //this ensures that we don't have any hanging request. e.g. pending on the network tab
    response.send();

    // response.clearCookie("auth_token");
    // response.status(200).send({ message: "Logged out" });
});

export default router
