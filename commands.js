// Import the quiz questions
const qs = require('./dsa_quiz');

module.exports = (bot) => {
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, "👋 Hello! I am your reminder bot made by @PV_027.\nUse /days to check the CUET PG exam countdown.");
    });
    
    bot.onText(/\/days/, (msg) => {
        const daysLeft = Math.ceil((EXAM_DATE - new Date()) / (1000 * 60 * 60 * 24));
        bot.sendMessage(msg.chat.id, `📆 ${daysLeft} days left until the CUET PG exam! Keep grinding.`);
    });
    
    bot.onText(/\/help/, (msg) => {
        bot.sendMessage(msg.chat.id, "📌 commands: \n/start : to start the bot. \n/days : to get CUET PG exam countdown. \n/nimcet	to get NIMCET exam countdown. \n contact : @PV_027");
    });

    bot.onText(/\/nimcet/, (msg) => {
        bot.sendMessage(msg.chat.id, "NIMCET exam date is yet to be announced.");
    });
}
