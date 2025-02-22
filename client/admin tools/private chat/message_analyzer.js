module.exports = (bot, OWNER_ID, GROUP_ID) => {
    let messageHistory = [];
    const MAX_MESSAGES = 100;

    // function to fetch recent messages from the group (bot must be an admin)
    async function preloadMessages() {
        try {
            const messages = await bot.getChatHistory(GROUP_ID, { limit: MAX_MESSAGES });
            messages.forEach((msg) => {
                if (msg.text && !msg.from.is_bot) {
                    messageHistory.push({ userId: msg.from.id, text: msg.text.trim() });
                }
            });
            console.log("✅ Preloaded past messages successfully.");
        } catch (err) {
            console.error("❌ Error preloading messages:", err.message);
        }
    }

    // preload messages when the bot starts
    preloadMessages();

    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const text = msg.text ? msg.text.trim() : "";

        // ignore bot messages
        if (msg.from.is_bot || !text) return;

        // store messages only from the specified group
        if (chatId === GROUP_ID) {
            messageHistory.push({ userId, text });
            if (messageHistory.length > MAX_MESSAGES) {
                messageHistory.shift(); // Remove oldest message
            }
        }

        // analyze recent messages (only owner can use that too in private chat)
        if (chatId === OWNER_ID && text === "-analyze") {
            if (messageHistory.length === 0) {
                bot.sendMessage(chatId, "❌ No messages to analyze from the group.");
                return;
            }

            let userCounts = {};
            let wordCounts = {};
            let totalMessages = messageHistory.length;
            let totalWords = 0;
            
            messageHistory.forEach(({ userId, text }) => {
                userCounts[userId] = (userCounts[userId] || 0) + 1;
                let words = text.split(/\s+/);
                totalWords += words.length;
                words.forEach(word => {
                    wordCounts[word] = (wordCounts[word] || 0) + 1;
                });
            });

            let mostActiveUser = Object.entries(userCounts).sort((a, b) => b[1] - a[1])[0];
            let mostCommonWord = Object.entries(wordCounts).sort((a, b) => b[1] - a[1])[0];
            let avgMessageLength = (totalWords / totalMessages).toFixed(2);

            let report = `📊 *Message Analysis (Last ${totalMessages} messages in group)*\n\n` +
                `👑 Most Active User: ${mostActiveUser ? mostActiveUser[0] : "N/A"} (${mostActiveUser ? mostActiveUser[1] : 0} messages)\n` +
                `💬 Most Common Word: "${mostCommonWord ? mostCommonWord[0] : "N/A"}" (${mostCommonWord ? mostCommonWord[1] : 0} times)\n` +
                `📏 Avg. Message Length: ${avgMessageLength} words\n` +
                `📢 Total Messages: ${totalMessages}`;

            bot.sendMessage(chatId, report, { parse_mode: "Markdown" });
        }
    });
};
