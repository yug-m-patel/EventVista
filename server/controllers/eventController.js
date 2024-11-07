const Event = require("../models/eventModel")
const createEvent = (req, res) => {
    const newEvent = new Event(req.body);

    newEvent.save().then((event) => {
        res.status(201).json({
            status: "Success",
            data: event,
        });
    }).catch((err) => {
        console.log(err.message);
    });
};

const editEvent = (req, res) => {
    const eventId = req.params.id;
    const updateData = req.body;
    console.log("here" + eventId)
    Event.findByIdAndUpdate(eventId, updateData, { new: true })
        .then((updatedEvent) => {
            if (!updatedEvent) {
                return res.status(404).json({
                    status: "Failure",
                    message: "Event not found"
                });
            }
            res.status(200).json({
                status: "Success",
                data: updatedEvent
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                status: "Failure",
                message: "Failed to update event",
                error: err
            });
        });
};

const deleteEvent = (req, res) => {
    const eventId = req.params.id;
    Event.findByIdAndDelete(eventId)
        .then((deletedEvent) => {
            if (!deletedEvent) {
                return res.status(404).json({
                    status: "Failure",
                    message: "Event not found"
                });
            }
            res.status(200).json({
                status: "Success",
                message: "Event deleted successfully",
                data: deletedEvent
            });
        }).catch((error) => {
            console.error(error);
            res.status(500).json({
                status: "Failure",
                message: "Failed to delete event",
                error: err
            });
        })
}

const fetchEvents = (req, res) => {
    Event.find()
        .then((data) => {
            res.status(200).json({
                status: "Success",
                data: data
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                status: "Failure",
                message: "Failed to fetch events",
                error: err
            });
        });
};

module.exports = {
    createEvent,
    editEvent,
    deleteEvent,
    fetchEvents,

}
