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

            const guideMessage = `🔹 *Bot Commands* 🔹

*1️. AI Chatbot:* \`-ai <message>\`
*2️. Weather:* \`-weather <city>\`
*3️. Handwriting Generator:* \`-handwriting <text>\`
*4️. Face Detection:* Reply to an image with \`-detect\`
*5️. Dictionary:* \`-define <word>\`
*6️. YouTube Download:* \`-yt <YouTube URL>\`
*7️. Forward Message:* Reply with \`-fwd <chat_id>\`
*8️. Send Message:* \`-send <chat_id> <message>\`
*9️. Remove Background:* Reply with \`-removebg\`
*10. Solve Math:* \`-math <expression>\`

🔐 *Restricted to Owner*`;

            bot.sendMessage(chatId, guideMessage, { parse_mode: "Markdown" });
        }
    });
};
