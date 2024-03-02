import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: [true, "Please provide a username"],
            unique: false,
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
        },
        driveData:{
            type: [{}],
        },
        userData:{
            type: [{}],
        },
        otherData:{
            type: [{}],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
    },
    {
        timestamps: true,
    });

export default mongoose.models.users || mongoose.model("users", userSchema);
