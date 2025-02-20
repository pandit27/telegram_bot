const mongoose = require("mongoose");

mongoose.connect("url", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB Connection Error:", err));

const userSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    username: String,
    chatType: String, // private/group
    commandsUsed: [{ command: String, timestamp: Date }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

const examSchema = new mongoose.Schema({
    examName: { type: String, required: true },
    examDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Exam = mongoose.model("Exam", examSchema);

const quizSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    question: { type: String, required: true },
    options: [String],
    correctAnswer: Number
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = { User, Exam, Quiz };
