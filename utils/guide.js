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

*1. AI Chatbot:* \`-ai <message>\`
*2. Weather:* \`-weather <city>\`
*3. Handwriting Generator:* \`-handwriting <text>\`
*4. Face Detection:* Reply to an image with \`-detect\`
*5. Dictionary:* \`-define <word>\`
*6. YouTube Download:* \`-yt <YouTube URL>\`
*7. Forward Message:* Reply with \`-fwd <chat_id>\`
*8. Send Message:* \`-send <chat_id> <message>\`
*9. Remove Background:* Reply with \`-removebg\`
*10. Solve Math:* \`-math <expression>\``;

            bot.sendMessage(chatId, guideMessage, { parse_mode: "Markdown" });
        }
    });
};
