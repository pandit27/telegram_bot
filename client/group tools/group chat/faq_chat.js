const TelegramBot = require("node-telegram-bot-api");
const faq = require("../../../assets/arrays and jsons/faq_data");

module.exports = (bot, GROUP_ID) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const userMessage = msg.text?.toLowerCase();
        if (!userMessage || chatId !== Number(GROUP_ID)) return;
        
        // check if message matches predefined FAQs
        for (let entry of faq) {
            if (entry.keywords.some(keyword => userMessage.includes(keyword.toLowerCase()))) {
                bot.sendChatAction(chatId, "typing"); // 1-second typing effect
                setTimeout(() => {
                    bot.sendMessage(chatId, entry.response, {
                        reply_to_message_id: msg.message_id
                    });
                }, 1000);
                return;
            }
        }
    });
    
    console.log("FAQ Bot is running...");
    return bot;
};
