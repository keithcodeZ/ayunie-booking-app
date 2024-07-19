//users.ts as in plural is a REST naming convention

import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";

const router = express.Router()

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

//REGISTER A USER ENDPOINT
// /api/users/register
router.post(
    "/register",
    [
        check("firstName", "First name is required").isString(),
        check("lastName", "Last name is required").isString(),
        check("email", "Email is required").isEmail(),
        check("password", "Password with 6 or more characters required").isLength({ min: 6 })
    ],
    async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ message: errors.array() });
    }
    try {
        //check if user already exists and user email that was sent to us
        //what this does is it finds a document on our database model. It checks if the email matches the email that we received in the body of the request
        let user = await User.findOne({
            email: request.body.email,
        });

        //if a certain user exists, return an error because we are 1 is to 1 email
        if (user) {
            return response.status(400).json({ message: "User already exists"});
        }

        //if a user doesn't exist, create a new user
        user = new User(request.body);

        //save the user to the database
        await user.save();

        //storing user id in the jwt token
        //"secretkey" is a jwt that is used to encrypt the token
        const token = jwt.sign(
            //userId is always stored in the HTTP cookie Token that gets sent back and forth
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string, {
                //the token that we're gonna return to the frontend is only valid for 1 day
                expiresIn: "1d"
            }
        );

        //creating a cookie that will be stored in the browser
        response.cookie("auth_token", token, {
            httpOnly: true,
            //secure means only accept cooking over HTTPS
            //will return false if we're on dev mode else, true if we are on prod/deployment
            secure: process.env.NODE_ENV === "production",
            // sameSite: "strict",
            maxAge: 86400000,
            // maxAge: 24 * 60 * 60 * 1000
        });


        //return a status of 200 and a success message
        // response.status(200).json({ message: "User created"});

        return response.status(200).send({ message: "User created/registered OK", token });

    } catch (error) {
        //if there is an error, return an error
        console.log(error);
        response.status(500).send({ message: `Something went wrong: ${error}` });
    }
})

export default router;