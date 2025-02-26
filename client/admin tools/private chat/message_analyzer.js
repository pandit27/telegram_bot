module.exports = (bot, OWNER_ID, GROUP_ID) => {
    let messageHistory = [];
    const MAX_MESSAGES = 100;

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

        // analyze recent messages (only owner can use it in private chat)
        if (chatId === OWNER_ID && text === "-analyze") {
            console.log("command pressed");

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
                let words = text.split(/\s+/).filter(word => word.trim() !== "");
                totalWords += words.length;
                words.forEach(word => {
                    wordCounts[word] = (wordCounts[word] || 0) + 1;
                });
            });

            if (Object.keys(userCounts).length === 0 || Object.keys(wordCounts).length === 0) {
                bot.sendMessage(chatId, "❌ No valid analysis data. Please send more messages in the group.");
                return;
            }

            let mostActiveUser = Object.entries(userCounts).sort((a, b) => b[1] - a[1])[0] || ["N/A", 0];
            let mostCommonWord = Object.entries(wordCounts).sort((a, b) => b[1] - a[1])[0] || ["N/A", 0];
            let avgMessageLength = totalMessages > 0 ? (totalWords / totalMessages).toFixed(2) : "0";

            let report = `📊 *Message Analysis (Last ${totalMessages} messages in group)*\n\n` +
                `👑 Most Active User: ${mostActiveUser[0]} (${mostActiveUser[1]} messages)\n` +
                `💬 Most Common Word: "${mostCommonWord[0]}" (${mostCommonWord[1]} times)\n` +
                `📏 Avg. Message Length: ${avgMessageLength} words\n` +
                `📢 Total Messages: ${totalMessages}`;

            console.log("Generated Report:", report);

            if (!report.trim()) {
                bot.sendMessage(chatId, "❌ No valid analysis data.");
                return;
            }                

            bot.sendMessage(chatId, report, { parse_mode: "Markdown" });
        }
    });
};
