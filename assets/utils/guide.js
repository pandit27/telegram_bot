module.exports = (bot, OWNER_ID) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        const userId = msg.from.id;

        if (text === "-guide") {
            if (userId !== OWNER_ID) {
                bot.sendMessage(chatId, "❌ You are not authorized to use this command.");
                return;
            }

            const guideMessage = ` *Bot Commands* 

*1. Send Message to group:* \`-sm <message>\
*2. Send Message:* \`-send <chat_id> <message>\`
*3. Forward Message:* Reply with \`-fwd <chat_id>\`
*4. Weather:* \`-weather <city>\`
*5. Dictionary:* \`-define <word>\`
*6. Solve Math:* \`-math <expression>\`
*7. YouTube Download:* \`-yt <YouTube URL>\`
*8. AI Chatbot:* \`-ai <message>\`
*9. Remove Background:* Reply with \`-removebg\`
*10. Face Detection:* Reply to an image with \`-detect\`
*11. Handwriting Generator:* \`-handwriting <text>\``;

            bot.sendMessage(chatId, guideMessage, { parse_mode: "Markdown" });
        }
    });
};
