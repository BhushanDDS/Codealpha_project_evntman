import mongoose from "mongoose";
import { DB_NAME } from '../constants.js'



const connnectDB = async() => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URL}${DB_NAME}`)
        console.log(`MongoDB Connected in db/index ${connection.connection.host}`);
    } catch (error) {
        console.log("Error db/index", error);

        process.exit(1);
    }
}

export default connnectDB;