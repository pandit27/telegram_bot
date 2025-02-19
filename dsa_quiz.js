// importing questions
const mathQuestions = require("./questions/math");
const reasoningQuestions = require("./questions/reasoning");
const dsaQuestions = require("./questions/dsa");

// mapping quiz (type of subject)
const quizQuestions = {
    Math: mathQuestions,
    Reasoning: reasoningQuestions,
    DSA: dsaQuestions
};

// exporing module
module.exports = (bot) => {
    const ownerChatId = '5036581553'; // owner chat_id

    // on typing command "/quiz"
    bot.onText(/\/quiz/, (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        // testing ke liye
        console.log("chat type:", msg.chat.type);

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

        // if used in a group
        else if (msg.chat.type === "group" || msg.chat.type === "supergroup") {
            if (String(userId) === String(ownerChatId)) {
                // combine all questions
                const allQuestions = [...mathQuestions, ...reasoningQuestions, ...dsaQuestions];
                const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];

                bot.sendPoll(chatId, randomQuestion.question, randomQuestion.options, {
                    is_anonymous: false,
                    type: 'quiz',
                    correct_option_id: randomQuestion.options.indexOf(randomQuestion.answer)
                });
            } 

            // if a user used in a group (to avoid spamming)
            else {
                bot.sendMessage(chatId, "It can only be used in private chat \n click on @pvnimcet2025_bot.");
            }
        }
    });

    // for GUI based button
    bot.on("callback_query", (query) => {
        const chatId = query.message.chat.id;
        const selectedCategory = query.data.split("_")[1]; // extract question type

        console.log("Selected category:", selectedCategory); // testing ke liye

        if (quizQuestions[selectedCategory]) {
            // randomly give a question
            const randomQuestion = quizQuestions[selectedCategory][Math.floor(Math.random() * quizQuestions[selectedCategory].length)];

            // console.log("Selected question:", randomQuestion); // testing ke liye

            // send telegram quiz (with correct answer)
            bot.sendPoll(chatId, randomQuestion.question, randomQuestion.options, {
                is_anonymous: false,
                type: 'quiz',
                correct_option_id: randomQuestion.options.indexOf(randomQuestion.answer)
            });

            bot.answerCallbackQuery(query.id);
        } 
        
        else {
            bot.answerCallbackQuery(query.id, { text: "Error: Category not found!", show_alert: true });
        }
    });
};
