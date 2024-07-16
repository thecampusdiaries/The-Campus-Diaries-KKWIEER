// EventSchema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: false },
    organizer: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },
    posts: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Post' 
    }],
    regLink: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;