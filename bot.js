const TelegramBot = require("node-telegram-bot-api");
const TOKEN = process.env.TOKEN;
"8169135424:AAFMNrthUWEsFMAE3qQJSuSCyv9rJxNg9jI"
const CHAT_ID = process.env.GROUP_ID;
const OWNER_ID = process.env.OWNER_ID;
const TEST_ID = "-1002411306855";
const EXAM_DATE = new Date("2025-03-15");
const bot = new TelegramBot(TOKEN, { polling: true });

/*-------------------------------------------------------------------------------------------------
                                    importing modules
-------------------------------------------------------------------------------------------------*/
const commands = require('./assets/commands/commands');
commands(bot);
const random_q = require("./assets/questions/random_q");
const poll_qs = require('./assets/questions/nimcet poll/nimcet_poll');
poll_qs(bot, CHAT_ID)
const message_analyzer = require("./client/admin tools/private chat/message_analyzer");
message_analyzer(bot, OWNER_ID, CHAT_ID);
const keyword_alert = require("./client/admin tools/private chat/keyword_alert");
keyword_alert(bot, OWNER_ID, TEST_ID);


/*-------------------------------------------------------------------------------------------------
                function to send exam remider (at 05:30 AM)
-------------------------------------------------------------------------------------------------*/
const sendReminder = () => {
    const now = new Date();
    
    if (now.getHours() !== 0 || now.getMinutes() !== 0) return;

    const timeDiff = EXAM_DATE - now;

    if (timeDiff > 0) {
        const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        const message = `📢 <b>CUET PG 2025 Reminder!</b>\n\n⏳ Only <b>${daysLeft} days, ${hoursLeft} hours, and ${minutesLeft} minutes</b> left! \n\nStay focused and keep grinding.`;
        bot.sendMessage(CHAT_ID, message, { parse_mode: "HTML" });
    } 
    else if (timeDiff === 0) {
        bot.sendMessage(CHAT_ID, `<b>Today is the Exam!</b> 🎯\n\nBest of luck! 🍀`, { parse_mode: "HTML" });
    } 
    else {
        bot.sendMessage(CHAT_ID, `<b>Exam Completed!</b> 🎉\nHope you did well!`, { parse_mode: "HTML" });
    }
};

// to send reminder
sendReminder();

/*-------------------------------------------------------------------------------------------------
                            function to schedule remider
-------------------------------------------------------------------------------------------------*/
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) sendReminder();
}, 60 * 1000);



/*-------------------------------------------------------------------------------------------------
                        function to send a random q (at 05:00 PM)
-------------------------------------------------------------------------------------------------*/
const quizResponses = new Map();
const quizCorrectAnswers = new Map();

const sendDailyQuiz = () => {
    const present = new Date();
    let hoursIST = present.getUTCHours() + 5; // convert UTC to IST
    let minutesIST = present.getUTCMinutes() + 30;

    if (minutesIST >= 60) {
        minutesIST -= 60;
        hoursIST += 1;
    }

    if (hoursIST === 17 && minutesIST === 0) {
        const question = random_q[Math.floor(Math.random() * random_q.length)];
        const correctOptionId = question.options.indexOf(question.answer);

        bot.sendPoll(CHAT_ID, question.question, question.options, {
            is_anonymous: false,
            type: "quiz",
            correct_option_id: correctOptionId
        }).then((poll) => {
            const quizId = poll.poll.id;
            quizResponses.set(quizId, new Map());
            quizCorrectAnswers.set(quizId, correctOptionId);

            // quiz result after 2 hours
            setTimeout(() => endQuiz(quizId), 2 * 60 * 60 * 1000);
        });
    }
};

/*-------------------------------------------------------------------------------------------------
                        track user responses (those who ticked the correct option)
-------------------------------------------------------------------------------------------------*/
bot.on("poll_answer", (answer) => {
    const pollId = answer.poll_id;
    const userId = answer.user.id;
    const firstName = answer.user.first_name || "";
    const lastName = answer.user.last_name || "";
    const selectedOption = answer.option_ids[0];

    if (quizResponses.has(pollId) && quizCorrectAnswers.has(pollId)) {
        const correctOptionId = quizCorrectAnswers.get(pollId);

        if (selectedOption === correctOptionId) {
            quizResponses.get(pollId).set(userId, { firstName, lastName });
        }
    }
});

/*-------------------------------------------------------------------------------------------------
                                   function to send quiz result
-------------------------------------------------------------------------------------------------*/
const endQuiz = (quizId) => {
    if (!quizResponses.has(quizId)) return;

    const correctUsers = Array.from(quizResponses.get(quizId).values());

    if (correctUsers.length === 0) {
        bot.sendMessage(OWNER_ID, "Quiz ended! No one answered correctly today.");
    } 
    else {
        let resultMessage = "Quiz Ended! Here are the users who answered correctly:**\n\n";
        correctUsers.forEach((user, index) => {
            resultMessage += `${index + 1}. ${user.firstName} ${user.lastName}\n`;
        });
        bot.sendMessage(CHAT_ID, resultMessage, { parse_mode: "Markdown" });
    }

    quizResponses.delete(quizId);
    quizCorrectAnswers.delete(quizId);
};

/*-------------------------------------------------------------------------------------------------
                                    to send quiz result
-------------------------------------------------------------------------------------------------*/
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 18 && now.getMinutes() === 59) {
        setTimeout(sendDailyQuiz, 60 * 1000);
    }
}, 60 * 1000);
