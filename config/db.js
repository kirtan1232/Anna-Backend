const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://kirtan1232:z8qeAUU12PSna1Ga@anna.injlw2e.mongodb.net/?retryWrites=true&w=majority&appName=ANNA",
           
            {
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
            }
        );
        console.log("MongoDB Connected");
    } catch (e) {
        console.error("MongoDB not connected:", e);
    }
};

module.exports = connectDb;