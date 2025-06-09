const CompletedLessons = require('../model/CompletedLessons');

exports.getCompletedLessons = async (req, res) => {
    try {
        const userId = req.user.id;
        const completedLessons = await CompletedLessons.findOne({ userId });

        if (!completedLessons) {
            return res.status(404).json({ message: 'No completed lessons found', completedDays: [] });
        }

        res.json(completedLessons);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.addCompletedLesson = async (req, res) => {
    const userId = req.user.id;
    const { day } = req.body;

    if (!day) {
        return res.status(400).json({ error: 'Day is required' });
    }

    try {
        let completedLessons = await CompletedLessons.findOne({ userId });
        if (!completedLessons) {
            completedLessons = new CompletedLessons({ userId, completedDays: [] });
        }

        if (!completedLessons.completedDays.includes(day)) {
            completedLessons.completedDays.push(day);
            await completedLessons.save();
        }

        res.status(200).json({ message: 'Lesson day marked as completed', completedLessons });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark lesson as completed' });
    }
};