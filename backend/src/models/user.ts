import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//USER TYPES
export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    // createdAt: Date;
    // updatedAt: Date;
}

//USER SCHEMA
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

//middleware for mongodb that encrypts the password
userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    // this.password = "*****";
    //next function will call the next function which is saving the user to the database
    next();
});

//USER MODEL
const User = mongoose.model<UserType>("User", userSchema);

export default User