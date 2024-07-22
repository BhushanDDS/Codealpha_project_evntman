import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

//import routes
import userRoute from './Routes/userRoute.js'
import eventRoute from './Routes/eventRoute.js'


//declare routes
app.use("/api/v1/users", userRoute)
app.use("/api/v1/events", eventRoute)



export { app }