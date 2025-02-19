const TelegramBot = require("node-telegram-bot-api");
const cron = require('node-cron');
const TOKEN = "8169135424:AAFMNrthUWEsFMAE3qQJSuSCyv9rJxNg9jI";
const CHAT_ID = "-1002165186773";
const EXAM_DATE = new Date("2025-03-15");
const bot = new TelegramBot(TOKEN, { polling: true });

/*  
    importing commands 
*/
const commands = require('./commands'); // import commands.js
commands(bot); // load in bot.js
const math_random = require("./questions/math_random");

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


// function to send a random math q (at 5 pm - INDIAN time)
function sendDailyQuiz() {
    const question = math_random[Math.floor(Math.random() * math_random.length)];
    
    bot.sendPoll(CHAT_ID, question.question, question.options, {
        is_anonymous: false,
        type: 'quiz',
        correct_option_id: question.options.indexOf(question.answer)
    });
}

// send random q at 5 PM (INDIAN time)
cron.schedule("30 11 * * *", () => {
    console.log("Sending the daily random math q at 5 PM IST!");
    sendDailyQuiz();
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});
