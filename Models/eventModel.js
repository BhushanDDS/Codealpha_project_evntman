import mongoose, { Schema } from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String

    },
    decs: {
        type: String
    },
    venue: {
        type: String
    },
    date: {
        type: String
    },
    capacity: {
        type: Number
    },
    status: {
        type: String
    }
})


export const Event = mongoose.model("Event", eventSchema)