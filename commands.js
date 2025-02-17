module.exports = (bot) => {
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, "👋 Hello! I am your reminder bot made by @PV_027.\nUse /days to check the CUET PG exam countdown.");
    });
    
    bot.onText(/\/days/, (msg) => {
        const EXAM_DATE = new Date("2025-03-10");
        const now = new Date();
        const timeDiff = EXAM_DATE - now;
        if (timeDiff > 0) {
            const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

            const message = `⌛ <b>${daysLeft} days, ${hoursLeft} hours, and ${minutesLeft} minutes</b> left until the CUET PG exam! \n\n Keep grinding.`;
            bot.sendMessage(msg.chat.id, message);
        } else if (timeDiff === 0) {
            bot.sendMessage(msg.chat.id, "🚨 Today is the CUET PG exam! Best of luck!");
        } else {
            bot.sendMessage(msg.chat.id, "The CUET PG exam has passed!");
        }

        // print in console for testing...
        console.log(`Current date: ${now}, Exam date: ${EXAM_DATE}, Time difference: ${timeDiff}`);
    });
    
    bot.onText(/\/help/, (msg) => {
        bot.sendMessage(msg.chat.id, "📌 commands: \n/start : to start the bot. \n/days : to get CUET PG exam countdown. \n/nimcet	to get NIMCET exam countdown. \n contact : @PV_027");
    });

    bot.onText(/\/nimcet/, (msg) => {
        bot.sendMessage(msg.chat.id, "NIMCET exam date is yet to be announced.");
    });
}
