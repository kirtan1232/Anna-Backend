// model/CompletedSessions.js
const mongoose = require('mongoose');

const completedSessionsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sessionIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Session',
        default: [],
    },
}, { timestamps: true });

const CompletedSessions = mongoose.model('CompletedSessions', completedSessionsSchema);
module.exports = CompletedSessions;