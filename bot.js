const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "8169135424:AAFMNrthUWEsFMAE3qQJSuSCyv9rJxNg9jI";
const CHAT_ID = "-1002165186773";
const EXAM_DATE = new Date("2025-03-15");
const bot = new TelegramBot(TOKEN, { polling: true });

/*  
    importing commands 
*/
const commands = require('./commands'); // import commands.js
commands(bot); // load in bot.js

const sendReminder = () => {
    const now = new Date();
    
    // reminder everyday at 12:00 AM
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
