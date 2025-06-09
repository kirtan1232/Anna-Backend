const mongoose = require('mongoose');

const completedLessonsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    completedDays: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

const CompletedLessons = mongoose.model('CompletedLessons', completedLessonsSchema);
module.exports = CompletedLessons;