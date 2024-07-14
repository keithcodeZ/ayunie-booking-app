import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Property, { PropertyType } from "../models/property";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";


const router = express.Router();

// we want to tell multer that we want to store any file/images from the push request in memory
// this will forward the file to cloudinary
const storage = multer.memoryStorage();

// we want to define the file limits and initalize multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    }
});


// api/properties
// the endpoint where the frontend will make requests whenever the user submits the add property form
// we have to handle a multipart form data request because the frontend sends a file along with the form
router.post(
    "/",
    // we need to verify that the user is logged in
    verifyToken, 
    // express validator
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Property Type is required"),
        // body("adultCount").notEmpty().withMessage("Adult count is required"),
        // body("childCount").notEmpty().withMessage("Child count is required"),
        body("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
        body("pricePerNight")
            .notEmpty()
            .isNumeric()
            .withMessage("Price per night is required and must be a number"),
        // body("starRating").notEmpty().withMessage("Star rating is required"),

    ],
    upload.array("imageFiles", 6),
    async (request: Request, response: Response) => {
        // response.status(200).send();
        try {
            // response.status(200).send();
            const imageFiles = request.files as Express.Multer.File[];
            const newProperty: PropertyType = request.body;


            // 1. upload the images to cloudinary
            const uploadPromises = imageFiles.map( async (image) => {
                // encode the image as a base64 string
                const b64 = Buffer.from(image.buffer).toString("base64");

                // a string that describes the image
                let dataURI = "data:" + image.mimetype + ";base64," + b64;
                 
                // cloudinary SDK to upload the image
                const response = await cloudinary.v2.uploader.upload(dataURI);

                return response.url;
            })

            // waits all images to be uploaded first before continuing
            const imageUrls = await Promise.all(uploadPromises);

            // 2. if the upload is successful, add the URLs to the newProperty object
            newProperty.imageUrls = imageUrls;
            newProperty.lastUpdated = new Date();
            // request .userId is set in the auth middleware it is taken from the token/cookie in the request
            newProperty.userId = request.userId;

            // 3. save the newProperty object to the database
            //references the schema and creates a new document in the database
            const property = new Property(newProperty);
            await property.save();

            // 4. send the newProperty object back to the frontend & return a 201 status
            response.status(201).send(property);

        } catch (error) {
            console.log("Error creating a property: " + error);
            response.status(500).json({ message: `Something went wrong: ${error}` });
        }
    }
);


export default router