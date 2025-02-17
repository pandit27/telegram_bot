module.exports = (bot) => {
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, "👋 Hello! I am your reminder bot made by @PV_027.\nUse /days to check the exam countdown.");
    });
    
    bot.onText(/\/days/, (msg) => {
        const daysLeft = Math.ceil((EXAM_DATE - new Date()) / (1000 * 60 * 60 * 24));
        bot.sendMessage(msg.chat.id, `📆 ${daysLeft} days left until the CUET PG exam! Stay prepared! 💪`);
    });
    
    bot.onText(/\/help/, (msg) => {
        bot.sendMessage(msg.chat.id, "📌 contact: @PV_027");
    });

    bot.onText(/\/nimcet/, (msg) => {
        bot.sendMessage(msg.chat.id, "NIMCET exam date is yet to be announced.");
    });
}
