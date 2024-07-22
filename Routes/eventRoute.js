import { Router } from "express";
import { createEvent, getEvents, getSingleEvent } from "../Controllers/eventController.js";


const router = Router();


router.route('/crate-event').post(createEvent)
router.route('/getevents').get(getEvents)
router.route('/get-event:/id').get(getSingleEvent)


export default router;