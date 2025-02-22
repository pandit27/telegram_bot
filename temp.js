// only for testing updates
module.exports = (bot, TEST_ID) => {
    const q_response = new Map();
    const q_answers = new Map();

    const sendQuiz = () => {
        const question = random_q[Math.floor(Math.random() * random_q.length)];
        const correctOptionId = question.options.indexOf(question.answer);

        bot.sendPoll(TEST_ID, question.question, question.options, {
            is_anonymous: false,
            type: "quiz",
            correct_option_id: correctOptionId
        }).then((poll) => {
            const quizId = poll.poll.id;
            q_response.set(quizId, new Map());
            q_answers.set(quizId, correctOptionId);

            // quiz result after 2 hours
            setTimeout(() => endQuiz(quizId), 2 * 60 * 60 * 1000);
        });
    };

    // Send quiz immediately after the bot starts
    sendQuiz();

    const sendDailyQuiz = () => {
        setInterval(() => {
            const present = new Date();
            let hoursIST = present.getUTCHours() + 5; // convert UTC to IST
            let minutesIST = present.getUTCMinutes() + 30;

            if (minutesIST >= 60) {
                minutesIST -= 60;
                hoursIST += 1;
            }

            if (hoursIST === 17 && minutesIST === 0) {
                sendQuiz();
            }
        }, 60 * 1000); // Check every minute
    };

    sendDailyQuiz();
};
