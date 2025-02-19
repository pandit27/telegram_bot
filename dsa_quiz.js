// importing questions
const mathQuestions = require("./questions/math");
const reasoningQuestions = require("./questions/reasoning");
const dsaQuestions = require("./questions/dsa");

module.exports = (bot) => {
    // const quizQuestions = [
        
    // ];
    



    // owner chat_id
    const ownerChatId = '5036581553';


  
    
    // send poll
    bot.onText(/\/quiz/, (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
    
        // log the chat type
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
                const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    
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

        if (quizQuestions[selectedCategory]) {
            // Randomly pick a question
            const randomQuestion = quizQuestions[selectedCategory][Math.floor(Math.random() * quizQuestions[selectedCategory].length)];

            // Send quiz poll
            bot.sendPoll(chatId, randomQuestion.question, randomQuestion.options, {
                is_anonymous: false,
                type: 'quiz',
                correct_option_id: randomQuestion.options.indexOf(randomQuestion.answer)
            });

            // Acknowledge callback to remove "loading" icon
            bot.answerCallbackQuery(query.id);
        }
    });
    
};