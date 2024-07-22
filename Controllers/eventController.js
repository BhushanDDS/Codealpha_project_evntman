import { Event } from "../Models/eventModel.js"

const createEvent = async(req, res) => {

    try {
        const [eventName, eventVenue, eventdate, eventDecs, eventStatus] = req.body
        const [eventCapacity] = 20;

        if (
            [eventName, eventVenue, eventdate, eventDecs, eventStatus].some((field) => field.trim() === "")
        ) {
            return res.status(400).json({
                msg: "all fields required"
            })
        }

        const event = new Event({
            eventName: eventName,
            decs: eventDecs,
            venue: eventVenue,
            date: eventdate,
            capacity: eventCapacity,
            status: eventStatus
        }).save()

        res.status(201).send({
            success: true,
            message: "Event Created Successfully",
            products,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in crearing event",
        });

    }



}


const getEvents = async(req, res) => {


    try {
        const events = await Event.find({})
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });


    }



}


const getSingleEvent = async(req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id)

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });

        }
        res.json(event)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }




}


export {
    createEvent,
    getEvents,
    getSingleEvent
}