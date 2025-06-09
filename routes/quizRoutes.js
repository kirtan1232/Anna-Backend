const express = require('express');
const uploadMiddleware = require("../middleware/uploadMiddleware");
const quizController = require('../controller/quizController');
const router = express.Router();

router.post('/addquiz', uploadMiddleware, quizController.createQuiz);
router.get('/getquiz', quizController.getAllQuizzes);
router.get('/getAllQuizzes', quizController.getAllQuizzes);
router.put('/updatequiz/:quizId', uploadMiddleware, quizController.updateQuiz);
router.delete('/deletequiz/:quizId', quizController.deleteQuiz);

module.exports = router;