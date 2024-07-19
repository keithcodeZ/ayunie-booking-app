import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Property from "../models/property";
import { PropertyType } from "../shared/types";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const properties = await Property.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = properties.map((property) => {
      const userBookings = property.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const propertyWithUserBookings: PropertyType = {
        ...property.toObject(),
        bookings: userBookings,
      };

      return propertyWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;