const TelegramBot = require("node-telegram-bot-api");
// const cron = require('node-cron');
const TOKEN = "8169135424:AAFMNrthUWEsFMAE3qQJSuSCyv9rJxNg9jI";
const CHAT_ID = process.env.GROUP_ID;
const OWNER_ID = process.env.OWNER_ID;
const EXAM_DATE = new Date("2025-03-15");
const bot = new TelegramBot(TOKEN, { polling: true });

// importing modules
/* ----------------------------------------------------------------------------- */
const commands = require('./assets/commands/commands');
commands(bot);
const math_random = require("./assets/questions/math_random");
const poll_qs = require('./assets/questions/nimcet poll/nimcet_poll');
poll_qs(bot, CHAT_ID)
/* ----------------------------------------------------------------------------- */

const sendReminder = () => {
    const now = new Date();
    
    // reminder everyday at 05:30 AM (Indian time)
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
        bot.sendMessage(CHAT_ID, `🚨 <b>Today is the Exam!</b> 🎯\n\nBest of luck! 🍀`, { parse_mode: "HTML" });
    } 
    else {
        bot.sendMessage(CHAT_ID, `✅ <b>Exam Completed!</b> 🎉\nHope you did well!`, { parse_mode: "HTML" });
    }
};

// to send reminder
sendReminder();

// function to schedule remider
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) sendReminder();
}, 60 * 1000);


/*-------------------------------------------------------------------------------------------------
                        function to send a random math q (at 06:30 PM)
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

    if (hoursIST === 18 && minutesIST === 0) {
        const question = math_random[Math.floor(Math.random() * math_random.length)];
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

// track user responses
bot.on("poll_answer", (answer) => {
    const pollId = answer.poll_id;
    const userId = answer.user.id;
    const firstName = answer.user.first_name || "";
    const lastName = answer.user.last_name || "";
    // const username = answer.user.username ? `@${answer.user.username}` : "Anonymous";
    const selectedOption = answer.option_ids[0];

    if (quizResponses.has(pollId) && quizCorrectAnswers.has(pollId)) {
        const correctOptionId = quizCorrectAnswers.get(pollId);

        if (selectedOption === correctOptionId) {
            quizResponses.get(pollId).set(userId, { firstName, lastName, username });
        }
    }
});

// function to send quiz results after 4 hours
const endQuiz = (quizId) => {
    if (!quizResponses.has(quizId)) return;

    const correctUsers = Array.from(quizResponses.get(quizId).values());

    if (correctUsers.length === 0) {
        bot.sendMessage(CHAT_ID, "Quiz ended! No one answered correctly today.");
    } else {
        let resultMessage = "Quiz Ended! Here are the users who answered correctly:**\n\n";
        correctUsers.forEach((user, index) => {
            resultMessage += `${index + 1}. ${user.firstName} ${user.lastName}\n`;
            // (${user.username}) // lets not add it for now
        });
        bot.sendMessage(CHAT_ID, resultMessage, { parse_mode: "Markdown" });
    }

    quizResponses.delete(quizId);
    quizCorrectAnswers.delete(quizId);
};


setInterval(sendDailyQuiz, 60 * 1000);
