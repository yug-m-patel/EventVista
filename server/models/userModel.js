const { default: mongoose } = require('mongoose');
const db = require('./dbConnection');


const userSchema = db.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    Department: {
        type: String,
        required: true,
        // enum: ['CSE', 'mech', 'ele', 'bpharma']
    },
    Role: {
        type: String,
        // required: true,
        enum: ['Student', 'Admin']
    },
    Preferences: {
        type: Array,
        // enum: ["CSE", "Mechanical", "Electrical", "Architecture", "MBA", "BBA", "Agriculture", "Chemical", "Pharmacy"],
        required: true
    },
    // ProfilePic: { type: String, required: true },
    Events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    Year: {
        type: String,
        required: true,
        // enum: [1, 2, 3, 4]
    },
    Review: {
        type: Array,
        items: {
            type: Object,
            properties: {
                Event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
                Review: { type: String }
            },
            // required: ["Event_id", "Review"]
        }
    }
});
module.exports = mongoose.model('User',userSchema);