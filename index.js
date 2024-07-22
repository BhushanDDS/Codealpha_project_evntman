import dotenv from "dotenv"
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config();


const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is running on ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("server connection failed", err);
    })