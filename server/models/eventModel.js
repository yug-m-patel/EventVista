const mongoose = require('./dbConnection');
const moment = require('moment'); // Install moment for date formatting: npm install moment

const eventSchema = new mongoose.Schema({
    EventTitle: { type: String, required: true },
    Description: { type: String, required: true },
    Date: { type: String, required: true },
    Time: { type: String, required: true },
    Type: {
        type: String,
        required: true,
        enum: ['Webinar', 'Seminar', 'Technical', 'non-technical', 'sports', 'custom']
    },
    CustomType: { type: String },
    Department: { type: String, required: true },
    Mode: { type: String, required: true, enum: ['Online', 'Offline'] },
    OfflineVenue: { type: String },
    Fee: { type: String, required: true, enum: ['Free', 'Paid'] },
    PaidFee: { type: Number },
    Thumbnail: { type: String },
    Images: [{ type: String }],
    // EventAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }
});

// Pre-save hook to format the Date
eventSchema.pre('save', function (next) {
    if (this.Date) {
        // Use 'this' to refer to the current document being saved
        this.Date = moment(this.Date).format('DD-MM-YYYY');
    }
    next(); // Call next() to continue the save process
});

module.exports = mongoose.model('Event', eventSchema);
