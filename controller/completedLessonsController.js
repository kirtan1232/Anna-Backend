const CompletedLessons = require("../model/CompletedLessons");

exports.getCompletedLessons = async (req, res) => {
  try {
    const userId = req.user.id;
    const completedLessons = await CompletedLessons.findOne({ userId });

    if (!completedLessons) {
      return res.status(200).json({ completedLessons: [] }); // Changed to 200 for consistency
    }

    res.json({ completedLessons: completedLessons.completedLessons });
  } catch (error) {
    console.error("Error fetching completed lessons:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.addCompletedLesson = async (req, res) => {
  const userId = req.user.id;
  const { day, instrument } = req.body;

  if (!day || !instrument) {
    return res.status(400).json({ error: "Day and instrument are required" });
  }

  try {
    let completedLessons = await CompletedLessons.findOne({ userId });
    if (!completedLessons) {
      completedLessons = new CompletedLessons({ userId, completedLessons: [] });
    }

    // Check if the lesson is already completed
    const isAlreadyCompleted = completedLessons.completedLessons.some(
      (lesson) => lesson.day === day && lesson.instrument === instrument
    );
    if (isAlreadyCompleted) {
      return res.status(400).json({ message: "Lesson already completed" });
    }

    // Add new completion
    completedLessons.completedLessons.push({ day, instrument });
    await completedLessons.save();

    res.status(200).json({ message: "Lesson marked as completed", completedLessons: completedLessons.completedLessons });
  } catch (error) {
    console.error("Error adding completed lesson:", error);
    res.status(500).json({ error: "Failed to mark lesson as completed", error: error.message });
  }
};