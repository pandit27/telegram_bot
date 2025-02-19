// Importing questions
const mathQuestions = require("./questions/math");
const reasoningQuestions = require("./questions/reasoning");
const dsaQuestions = require("./questions/dsa");

// Mapping quiz categories correctly
const quizQuestions = {
    Math: mathQuestions,
    Reasoning: reasoningQuestions,
    DSA: dsaQuestions
};

module.exports = (bot) => {
    const ownerChatId = '5036581553';

    // Send category selection buttons
    bot.onText(/\/quiz/, (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        console.log("chat type:", msg.chat.type);

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
        else if (msg.chat.type === "group" || msg.chat.type === "supergroup") {
            if (String(userId) === String(ownerChatId)) {
                const allQuestions = [...mathQuestions, ...reasoningQuestions, ...dsaQuestions]; // Combine all questions
                const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];

                bot.sendPoll(chatId, randomQuestion.question, randomQuestion.options, {
                    is_anonymous: false,
                    type: 'quiz',
                    correct_option_id: randomQuestion.options.indexOf(randomQuestion.answer)
                });
            } 
            else {
                bot.sendMessage(chatId, "You are not authorized, use in private chat @pvnimcet2025_bot.");
            }
        }
    });

    // Handle button clicks
    bot.on("callback_query", (query) => {
        const chatId = query.message.chat.id;
        const selectedCategory = query.data.split("_")[1]; // Extract category name

        console.log("Selected category:", selectedCategory); // Debugging log

        if (quizQuestions[selectedCategory]) {
            // Pick a random question from the selected category
            const randomQuestion = quizQuestions[selectedCategory][Math.floor(Math.random() * quizQuestions[selectedCategory].length)];

            console.log("Selected question:", randomQuestion); // Debugging log

            // Send quiz poll
            bot.sendPoll(chatId, randomQuestion.question, randomQuestion.options, {
                is_anonymous: false,
                type: 'quiz',
                correct_option_id: randomQuestion.options.indexOf(randomQuestion.answer)
            });

            // Acknowledge callback to remove "loading" icon
            bot.answerCallbackQuery(query.id);
        } else {
            bot.answerCallbackQuery(query.id, { text: "Error: Category not found!", show_alert: true });
        }
    });
};
