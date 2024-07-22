import mongoose, { mongo, Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: Number
    },
    bookedEvents: [{
        type: Schema.Types.ObjectId,
        ref: "Event"
    }]
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)