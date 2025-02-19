// importing questions
const mathQuestions = require("../questions/math");
const reasoningQuestions = require("../questions/reasoning");
const dsaQuestions = require("../questions/dsa");

// mapping quiz (type of subject)
const quizQuestions = {
    Math: mathQuestions,
    Reasoning: reasoningQuestions,
    DSA: dsaQuestions
};

// store quiz progress for each user
const userQuizData = {};

// exporting module
module.exports = (bot) => {
    const ownerChatId = '5036581553'; // owner chat_id

    // when the user types "/quiz"
    bot.onText(/\/quiz/, (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        console.log("Chat type:", msg.chat.type);

        // if used in a private chat
        if (msg.chat.type === "private") {
            bot.sendMessage(chatId, "Select a quiz category:", {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Math", callback_data: "quiz_Math" }],
                        [{ text: "Reasoning", callback_data: "quiz_Reasoning" }],
                        [{ text: "DSA", callback_data: "quiz_DSA" }]
                    ]
                }
            });
        }

        // if used in a group (only owner can start)
        else if (msg.chat.type === "group" || msg.chat.type === "supergroup") {
            if (String(userId) === String(ownerChatId)) {
                startRandomQuiz(bot, chatId);
            } else {
                bot.sendMessage(chatId, "It can only be used in private chat. Click on @pvnimcet2025_bot.");
            }
        }
    });

    // handle category selection
    bot.on("callback_query", (query) => {
        const chatId = query.message.chat.id;
        const userId = query.from.id;
        const selectedCategory = query.data.split("_")[1]; // extract category

        console.log("Selected category:", selectedCategory);

        if (quizQuestions[selectedCategory]) {
            // initialize user quiz data
            userQuizData[userId] = {
                category: selectedCategory,
                index: 0,
                startTime: Date.now(),
                attempted: 0,
                correctAnswers: 0
            };

            sendNextQuestion(bot, chatId, userId);
        } 
    });

    // handle "Next" and "End Quiz" buttons
    bot.on("callback_query", (query) => {
        const chatId = query.message.chat.id;
        const userId = query.from.id;
        const action = query.data;

        if (!userQuizData[userId]) return;

        if (action === "next_question") {
            userQuizData[userId].attempted++;
            sendNextQuestion(bot, chatId, userId);
        } 
        else if (action === "end_quiz") {
            sendQuizSummary(bot, chatId, userId);
        }

        bot.answerCallbackQuery(query.id);
    });

    // handle correct answer tracking
    bot.on("poll_answer", (pollAnswer) => {
        const userId = pollAnswer.user.id;
        if (!userQuizData[userId]) return;

        const userData = userQuizData[userId];
        const questionList = quizQuestions[userData.category];
        const currentQuestion = questionList[userData.index - 1];

        if (pollAnswer.option_ids.includes(currentQuestion.options.indexOf(currentQuestion.answer))) {
            userData.correctAnswers++;
        }
    });
};

// Function to send the next question
function sendNextQuestion(bot, chatId, userId) {
    const userData = userQuizData[userId];
    const category = userData.category;
    const questionList = quizQuestions[category];

    if (userData.index >= questionList.length) {
        sendQuizSummary(bot, chatId, userId);
        return;
    }

    const currentQuestion = questionList[userData.index];
    userData.index++;

    bot.sendPoll(chatId, currentQuestion.question, currentQuestion.options, {
        is_anonymous: false,
        type: 'quiz',
        correct_option_id: currentQuestion.options.indexOf(currentQuestion.answer),
        reply_markup: {
            inline_keyboard: [
                [{ text: "Next", callback_data: "next_question" }],
                [{ text: "End Quiz", callback_data: "end_quiz" }]
            ]
        }
    });
}

// function to send quiz summary
function sendQuizSummary(bot, chatId, userId) {
    const userData = userQuizData[userId];
    const totalTime = ((Date.now() - userData.startTime) / 1000).toFixed(2); // time in seconds
    const attempted = userData.attempted;
    const correctAnswers = userData.correctAnswers;
    const category = userData.category;

    const summaryText = `
📌 Quiz Summary
📝 Category: ${category}
✅ Questions Attempted: ${attempted}
🎯 Correct Answers: ${correctAnswers}
⏳ Time Taken: ${totalTime} seconds
`;

    bot.sendMessage(chatId, summaryText);
    delete userQuizData[userId]; // reset user data
}

// function to start a random quiz in group (only owner can use)
function startRandomQuiz(bot, chatId) {
    const allQuestions = [...quizQuestions.Math, ...quizQuestions.Reasoning, ...quizQuestions.DSA];
    const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];

    bot.sendPoll(chatId, randomQuestion.question, randomQuestion.options, {
        is_anonymous: false,
        type: 'quiz',
        correct_option_id: randomQuestion.options.indexOf(randomQuestion.answer)
    });
}
