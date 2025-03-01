module.exports = (bot, GROUP_ID) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text?.trim();

        if (Number(chatId) !== Number(process.env.OWNER_ID)) return;

        if (text?.startsWith("-pin")) {
            const parts = text.split(" ");
            if (parts.length < 2) {
                bot.sendMessage(chatId, "❌ Please provide a message link!");
                return;
            }

            const messageLink = parts[1]; // extract message link
            const messageId = extractMessageId(messageLink); // extract message ID

            if (!messageId) {
                bot.sendMessage(chatId, "❌ Invalid message link. Please send a correct link.");
                return;
            }

            try {
                await bot.pinChatMessage(GROUP_ID, messageId);
                bot.sendMessage(chatId, "✅ Message pinned successfully!");
            } catch (error) {
                console.error("❌ Error pinning message:", error);
                bot.sendMessage(chatId, "❌ Failed to pin the message. Make sure the bot has admin rights.");
            }
        }
    });

    const extractMessageId = (link) => {
        const match = link.match(/\/(\d+)$/);
        return match ? parseInt(match[1]) : null;
    }
};
