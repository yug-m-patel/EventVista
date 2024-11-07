const { default: mongoose } = require('mongoose');
const db = require('./dbConnection');

const eventCreatorSchema = db.Schema({
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    events: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }]
  });
