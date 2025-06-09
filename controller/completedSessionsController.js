// controller/completedSessionsController.js
const CompletedSessions = require('../model/CompletedSessions');
const Session = require('../model/Session');

exports.getCompletedSessions = async (req, res) => {
    try {
        const userId = req.user.id;
        const completedSessions = await CompletedSessions.findOne({ userId })
            .populate('sessionIds');

        if (!completedSessions) {
            return res.status(200).json({ sessionIds: [] });
        }

        res.json(completedSessions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.toggleCompletedSession = async (req, res) => {
    const userId = req.user.id;
    const { sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required' });
    }

    try {
        const sessionExists = await Session.findById(sessionId);
        if (!sessionExists) {
            return res.status(400).json({ error: 'Invalid session ID' });
        }

        let completedSessions = await CompletedSessions.findOne({ userId });
        if (!completedSessions) {
            completedSessions = new CompletedSessions({ userId, sessionIds: [] });
        }

        const sessionIdStr = sessionId.toString();
        if (completedSessions.sessionIds.some(id => id.toString() === sessionIdStr)) {
            completedSessions.sessionIds = completedSessions.sessionIds.filter(id => id.toString() !== sessionIdStr);
        } else {
            completedSessions.sessionIds.push(sessionId);
        }

        await completedSessions.save();
        res.status(200).json({ message: 'Session completion toggled successfully', completedSessions });
    } catch (error) {
        res.status(500).json({ error: 'Failed to toggle session completion' });
    }
};