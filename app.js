const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const AuthRouter = require("./routes/authRoutes");
const protectedRouter = require("./routes/protectedRoutes");
const songRoutes = require("./routes/songRoutes");
const sessionRoutes = require('./routes/sessionRoutes');
const quizRoutes = require('./routes/quizRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const completedLessonsRoutes = require('./routes/completedLessonsRoutes'); // Add this line
const completedSessionsRoutes = require('./routes/completedSessionsRoutes');
const esewaRoutes = require('./routes/esewaRoutes');
const supportRoutes = require('./routes/supportRoutes');
const songRequestRoutes = require('./routes/songRequestRoutes');

const path = require("path");
const app = express();

// Connect to MongoDB
connectDb();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parser middleware
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/protected", protectedRouter);
app.use("/api/songs", songRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/completed', completedLessonsRoutes); // Add this line
app.use('/api/completed-sessions', completedSessionsRoutes); // Add this line
app.use('/api/esewa', esewaRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/song-requests', songRequestRoutes);

// Handle 404
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});