import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import myPropertyRoutes from "./routes/my-properties";
import propertyRoutes from "./routes/properties";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
// test to see which database are we connected to
// .then(() => {
//      console.log("Connected to MongoDB database: ", process.env.MONGODB_CONNECTION_STRING);
// });

const app = express();

app.use(cookieParser());

//converts the api requests to json
app.use(express.json());

//helps parse the url and parameters
app.use(express.urlencoded({ extended: true }));

//security middleware that prevents certain requests from certain URLs if it doesnt with them
app.use(cors({
    //what this does is that the server is only going to accept requests from the URL
    //this means that if any strange URLS try to access the server, it will return an error
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

//USED FOR TESTING THE API ENDPOINT AT THE START ONLY
// app.get("/api/test", async (request, response) => {
//     response.json({ message: "Hello World!" });
// });

//merging frontend to the backend for hosting into 1 server
//what this does is that it goes to the frontend folder and then goes to the dist folder
//and serve those static assets on the ROOT of our url that the backend is running on
app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/auth", authRoutes)

//any requests from the api will be passed to the userRoutes
app.use("/api/users", userRoutes)

// properties endpoint
app.use("/api/my-properties", myPropertyRoutes)

//search endpoint
app.use("/api/properties", propertyRoutes)

//starts the server
app.listen(7000, () => {
    console.log("Server started on port localhost:7000");
});

