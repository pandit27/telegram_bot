module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        const userId = msg.from.id;

        if (text.startsWith("-guide")) {
            if (userId !== Number(process.env.OWNER_ID)) {
                bot.sendMessage(chatId, "❌ You are not authorized to use this command.");
                return;
            }

            const guideMessage = `*Bot Commands*  

1. *Send Message to group:* \`-sm <message>\`  
2. *Send Message:* \`-send <chat_id> <message>\`  
3. *Forward Message:* Reply with \`-fwd <chat_id>\`  
4. *Weather:* \`-weather <city>\`  
5. *Dictionary:* \`-define <word>\`  
6. *Translator:* \`-translate <text>\`  
7. *Solve Math:* \`-math <expression>\`  
8. *YouTube Download:* \`-yt <YouTube URL>\`  
9. *AI Chatbot:* \`-ai <message>\`  
10. *Remove Background:* Reply with \`-removebg\`  
11. *Face Detection:* Reply to an image with \`-detect\`  
12. *Handwriting Generator:* \`-handwriting <text>\``;

            bot.sendMessage(chatId, guideMessage, { parse_mode: "MarkdownV2" });
        }
    });
};
