module.exports = (bot) => {
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, "👋 Hello! I am your reminder bot made by @PV_027.\nUse /days to check the exam countdown.");
    });
    
    bot.onText(/\/days/, (msg) => {
        const daysLeft = Math.ceil((EXAM_DATE - new Date()) / (1000 * 60 * 60 * 24));
        bot.sendMessage(msg.chat.id, `📆 ${daysLeft} days left until the CUET PG exam! Keep grinding.`);
    });
    
    bot.onText(/\/help/, (msg) => {
        bot.sendMessage(msg.chat.id, "📌 contact: @PV_027");
    });
}
