module.exports = (bot, OWNER_ID, GROUP_ID) => {
    let typingInterval = null;

    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text?.trim();

        if (Number(chatId) !== Number(OWNER_ID)) return;

        if (text === "/type") {
            if (typingInterval) {
                bot.sendMessage(chatId, "✅ Already typing in the group!");
                return;
            }

            bot.sendMessage(chatId, "✅ Started typing in the group!");
            
            typingInterval = setInterval(async () => {
                try {
                    await bot.sendChatAction(GROUP_ID, "typing");
                } catch (error) {
                    console.error("❌ Error in typing:", error.message);
                    
                    if (typingInterval) {
                        clearInterval(typingInterval);
                        typingInterval = null;
                    }
                    
                    bot.sendMessage(chatId, "⚠️ Error: Unable to type.");
                }
            }, 5000);
        }

        if (text === "/stoptyping") {
            if (!typingInterval) {
                bot.sendMessage(chatId, "❌ Typing was not active!");
                return;
            }

            clearInterval(typingInterval);
            typingInterval = null;
            bot.sendMessage(chatId, "🛑 Stopped typing in the group!");
        }
    });
};
