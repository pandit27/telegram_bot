/*-------------------------------------------------------------------------------------------------
                                       initial setup
-------------------------------------------------------------------------------------------------*/
require('dotenv').config(); // to use .env setup
const TelegramBot = require("node-telegram-bot-api");
const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.GROUP_ID;
const OWNER_ID = process.env.OWNER_ID;
const TEST_ID = process.env.TEST_ID;
const EXAM_DATE = new Date("2025-03-20");
const bot = new TelegramBot(TOKEN, { polling: true });




/*-------------------------------------------------------------------------------------------------
                                    importing modules
-------------------------------------------------------------------------------------------------*/
const exprt = require("./all_exports");
exprt(bot, CHAT_ID, TEST_ID, OWNER_ID);
const commands = require('./assets/commands/commands');
commands(bot);
const random_q = require("./assets/questions/random_q");
const poll_qs = require('./assets/questions/nimcet poll/nimcet_poll');
poll_qs(bot, CHAT_ID);
const keyword_alert = require("./client/admin tools/private chat/keyword_alert");
keyword_alert(bot, OWNER_ID, CHAT_ID);
/*---------------------------------------------------------------------------------------------*/
// - for testing purposes (we'll use temp.js)
// const temp = require("./temp");
// temp(bot);
/*---------------------------------------------------------------------------------------------*/




/*-------------------------------------------------------------------------------------------------
                function to send exam remider (at 05:30 AM)
            --------------------------------------------------------
        - we can change the time to send reminder  accordingly
        - we're using setInterval() to send at the required time
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
    else if (timeDiff === 0) bot.sendMessage(CHAT_ID, `<b>Today is the Exam!</b> 🎯\n\nBest of luck! 🍀`, { parse_mode: "HTML" });
    else bot.sendMessage(CHAT_ID, `<b>Exam Completed!</b> 🎉\nHope you did well!`, { parse_mode: "HTML" });
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
                                function to send a random q
-------------------------------------------------------------------------------------------------*/
const quizResponses = new Map();
const quizCorrectAnswers = new Map();

const sendQuiz = () => {
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

        // to send quiz result
        setTimeout(() => endQuiz(quizId), 3 * 60 * 60 * 1000);
    });
};

// send quiz immediately
// sendQuiz();

const sendDailyQuiz = () => {
    setInterval(() => {
        const present = new Date();
        let hoursIST = present.getUTCHours() + 5; // convert UTC to IST
        let minutesIST = present.getUTCMinutes() + 30;

        if (minutesIST >= 60) {
            minutesIST -= 60;
            hoursIST += 1;
        }

        if (hoursIST === 17 && minutesIST === 30) {
            sendQuiz();
        }
    }, 60 * 1000); // check every minute
};

sendDailyQuiz();




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
                                   function to send quiz result (only top 10)
-------------------------------------------------------------------------------------------------*/
const endQuiz = (quizId) => {
    if (!quizResponses.has(quizId)) return;

    const correctUsers = Array.from(quizResponses.get(quizId).values());

    if (correctUsers.length === 0) {
        bot.sendMessage(OWNER_ID, "🏁 The time for today's POTD has ended! No one answered correctly today.");
    }

    else {
        let resultMessage = "🏁 The time for today's POTD has ended!\n\nFirst 10 users who answered correctly:\n\n";
        const medals = ["🥇", "🥈", "🥉"];
        
        correctUsers.slice(0, 10).forEach((user, index) => {
            if (index < 3) resultMessage += `${medals[index]} ${user.firstName} ${user.lastName}\n`;
            else resultMessage += `${index + 1}. ${user.firstName} ${user.lastName}\n`;
        });

        bot.sendMessage(CHAT_ID, resultMessage, { parse_mode: "Markdown" });
        bot.sendMessage(OWNER_ID, resultMessage, { parse_mode: "Markdown" });
    }

    quizResponses.delete(quizId);
    quizCorrectAnswers.delete(quizId);
};
