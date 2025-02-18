module.exports = (bot) => {
    const OWNER_CHAT_ID = "5036581553"; // owner chat_id

    // send details to myself 
    const sendUserDetailsToOwner = (msg) => {
        const username = msg.from.username || "Anonymous";
        const firstName = msg.from.first_name || "User";
        const lastName = msg.from.last_name || "";
        const userId = msg.from.id;
    
        const messageToOwner = `<b>New User Opened the Bot!</b>\n\nName: ${firstName} ${lastName} \nUsername: @${username} \nUser ID: ${userId}`;
    
        bot.sendMessage(OWNER_CHAT_ID, messageToOwner, { parse_mode: "HTML" });
    };    

    /* 
        importing & loading files
    */
    const resources = require('./resources');
    resources(bot);
    const aiTexts = require('./aiTexts') // import aiTexts.js
    aiTexts(bot); // load in bot.js

    /* 
        commands 
    */
    bot.onText(/\/start/, (msg) => {
        sendUserDetailsToOwner(msg); // notify owner

        const firstName = msg.from.first_name || "User";
        const lastName = msg.from.last_name || "";

        bot.sendMessage(msg.chat.id, `👋 Hello, ${firstName} ${lastName}!\n I am your reminder bot made by @PV_027.\n\nUse /days to check the CUET PG exam countdown.`);
    });
    
    bot.onText(/\/days/, (msg) => {
        // to make sure that /days command is to be used only in private chats
        if (msg.chat.type !== "private") {
            bot.sendMessage(msg.chat.id, "This command can only be used in private chat. \nClick on @pvnimcet2025_bot to continue.");
            return;
        }

        const EXAM_DATE = new Date("2025-03-15");
        const now = new Date();
        const timeDiff = EXAM_DATE - now;
        if (timeDiff > 0) {
            const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

            const message = `⌛ <b>${daysLeft} days, ${hoursLeft} hours, and ${minutesLeft} minutes</b> left until the CUET PG exam! \n Keep grinding.`;
            bot.sendMessage(msg.chat.id, message, { parse_mode: "HTML" });
        } 
        else if (timeDiff === 0) bot.sendMessage(msg.chat.id, "🚨 Today is the CUET PG exam! Best of luck!");
        else bot.sendMessage(msg.chat.id, "The CUET PG exam has passed!");

        console.log(`Current date: ${now}, Exam date: ${EXAM_DATE}, Time difference: ${timeDiff}`);
    });
    
    bot.onText(/\/help/, (msg) => {
        bot.sendMessage(msg.chat.id, "🧑‍💻 commands: \n/start : to start the bot. \n/days : to get CUET PG exam countdown. \n/nimcet	to get NIMCET exam countdown. \n/resources : to get NIMCET 2025 resources. \n\nFor any query contact : @PV_027");
    });

    bot.onText(/\/nimcet/, (msg) => {
        bot.sendMessage(msg.chat.id, "NIMCET exam date is yet to be announced.");
    });
}
