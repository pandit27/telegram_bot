const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "8169135424:AAFMNrthUWEsFMAE3qQJSuSCyv9rJxNg9jI";
const CHAT_ID = "-1002165186773";
const EXAM_DATE = new Date("2025-03-10");
const bot = new TelegramBot(TOKEN, { polling: true });

// remainder function
// const sendReminder = () => {
//     const today = new Date();
//     const timeDiff = EXAM_DATE - today;
//     const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

//     let message;

//     if (daysLeft > 0) {
//         message = `📢 <b>CUET PG Exam Reminder!</b>\n\n⏳ Only <b>${daysLeft} days</b> left! \n\nStay focused and keep grinding! 🚀`;
//     } 
//     else if (daysLeft === 0) message = `🚨 <b>Today is the Exam!</b> 🎯\n\nBest of luck! 🍀`;
//     else message = `✅ <b>Exam Completed!</b> 🎉\nHope you did well!`;

//     bot.sendMessage(CHAT_ID, message, { parse_mode: "HTML" }).catch(error => {
//         console.log("Error sending message:", error.response.body);
//     });
// }

const sendReminder = () => {
    const now = new Date();
    if (now.getHours() !== 4 || now.getMinutes() !== 0) return; // Ensures it runs only at 4 AM

    const daysLeft = Math.ceil((EXAM_DATE - now) / (1000 * 60 * 60 * 24));
    const message = daysLeft > 0 
        ? `📢 <b>Exam Reminder!</b>\n\n⏳ Only <b>${daysLeft} days</b> left! \n\nStay focused! 🚀`
        : daysLeft === 0 
            ? `🚨 <b>Today is the Exam!</b> 🎯\n\nBest of luck! 🍀`
            : `✅ <b>Exam Completed!</b> 🎉\nHope you did well!`;

    bot.sendMessage(CHAT_ID, message, { parse_mode: "HTML" }).catch(err => console.log("Error:", err.response.body));
};

// to send remainder
sendReminder();

// function to schedule at a certain time
setInterval(() => {
    const now = new Date();
    if (now.getHours() === 9 && now.getMinutes() === 0) sendReminder();}, 60 * 1000);

// some commands
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "👋 Hello! I am your reminder bot made by @PV_027.\nUse /days to check the exam countdown.");
});

bot.onText(/\/days/, (msg) => {
    const daysLeft = Math.ceil((EXAM_DATE - new Date()) / (1000 * 60 * 60 * 24));
    bot.sendMessage(msg.chat.id, `📆 ${daysLeft} days left until the exam! Stay prepared! 💪`);
});

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, "📌 Commands:\n/start - Welcome Message\n/days - Check Exam Countdown\n/help - List Commands");
});
