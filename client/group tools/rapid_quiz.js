const questions = require("../../assets/questions/quiz_qs");

module.exports = (bot, OWNER_ID, GROUP_ID) => {
    let isQuizActive = false;
    let currentQuestionIndex = 0;
    let activeUsers = {};
    let quizQuestions = [];
    let pollIdToQuestionIndex = {};

    // function to start the quiz
    async function startQuiz(chatId) {
        if (isQuizActive) {
            bot.sendMessage(chatId, "A quiz is already running...");
            return;
        }

        isQuizActive = true;
        currentQuestionIndex = 0;
        activeUsers = {};

        if (questions.length === 0) {
            bot.sendMessage(GROUP_ID, "❌ No questions available. Please add questions before starting the quiz.");
            return;
        }  
        
        quizQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 10); // pick 10 random questions

        bot.sendMessage(GROUP_ID, `💻 Get ready for the **Computer Section** Quiz!

            🖊 10 questions  
            ⏱️ 30 seconds per question  
            📄 The first question will be sent in **30 seconds**!`, { parse_mode: "Markdown" });
            
        bot.sendMessage(OWNER_ID, "✅ *Quiz started!* The bot is now conducting a quiz in the group.", { parse_mode: "Markdown" });      

        setTimeout(() => {
            sendNextQuestion();
        }, 30000);
    }

    // function to send a question in Telegram quiz format
    async function sendNextQuestion() {
        if (currentQuestionIndex >= quizQuestions.length) {
            endQuiz();
            return;
        }

        const questionData = quizQuestions[currentQuestionIndex];
        const correctIndex = questionData.options.indexOf(questionData.answer);

        if (correctIndex === -1) {
            console.error(`⚠️ Error: Correct answer not found in options for question: ${questionData.question}`);
            return;
        }

        bot.sendPoll(GROUP_ID, questionData.question, questionData.options, {
            type: "quiz",
            correct_option_id: correctIndex,
            is_anonymous: false,
            open_period: 30, // next q after 30 seconds
        }).then((pollMsg) => {
            pollIdToQuestionIndex[pollMsg.poll.id] = currentQuestionIndex; // store poll ID for answer tracking

            setTimeout(() => {
                currentQuestionIndex++;
                sendNextQuestion();
            }, 31000);
        }).catch(error => {
            console.error("❌ Error sending quiz poll:", error);
        });
    }

    // function to handle correct answers from polls
    bot.on("poll_answer", (pollAnswer) => {
        const userId = pollAnswer.user.id;
        const username = pollAnswer.user.username || pollAnswer.user.first_name;
        const selectedIndex = pollAnswer.option_ids[0];
        const pollId = pollAnswer.poll_id;

        if (!isQuizActive || !(pollId in pollIdToQuestionIndex)) return;

        const questionIndex = pollIdToQuestionIndex[pollId];
        const correctIndex = quizQuestions[questionIndex].options.indexOf(quizQuestions[questionIndex].answer);

        if (selectedIndex === correctIndex) {
            if (!activeUsers[userId]) activeUsers[userId] = { username, score: 0 };
            activeUsers[userId].score++;
        }
    });

    // function to end quiz and display results
    function endQuiz() {
        isQuizActive = false;
        pollIdToQuestionIndex = {};

        if (Object.keys(activeUsers).length === 0) {
            bot.sendMessage(GROUP_ID, "🤷 No correct answers this time! Better luck next time.");
            return;
        }

        // sort users by score
        const leaderboard = Object.values(activeUsers)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .map((user, index) => `🏅 *${index + 1}. ${user.username}* - ${user.score} score`)
            .join("\n");

        bot.sendMessage(GROUP_ID, `🏁 *Rapid Computer Quiz Over! Here are the top 10 users:*\n\n${leaderboard}`, { parse_mode: "Markdown" });
    }

    // command to start the quiz
    bot.on("message", (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text?.trim();

        if (Number(chatId) === Number(OWNER_ID) && text === "/startquiz") {
            startQuiz(chatId);
        }
    });
};
