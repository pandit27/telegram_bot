module.exports = (bot, OWNER_ID, GROUP_ID) => {
    let alertKeywords = new Set();

    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const text = msg.text ? msg.text.trim() : "";

        // ignore bot messages
        if (msg.from.is_bot || !text) return;

        // owner sets a keyword alert in private chat
        if (chatId === OWNER_ID && text.startsWith("-setalert ")) {
            const keyword = text.split(" ").slice(1).join(" ").toLowerCase();
            if (!keyword) {
                bot.sendMessage(chatId, "❌ Usage: -setalert <keyword>");
                return;
            }
            alertKeywords.add(keyword);
            bot.sendMessage(chatId, `✅ Alert set for keyword: "${keyword}"`);
            return;
        }

        // check if any keyword is mentioned in the group
        if (chatId === GROUP_ID) {
            for (let keyword of alertKeywords) {
                if (text.toLowerCase().includes(keyword)) {
                    bot.sendMessage(OWNER_ID, `🚨 *Keyword Alert!*
📌 Mentioned in Group: ${keyword}
👤 By: ${msg.from.first_name}
💬 Message: "${text}"`, { parse_mode: "Markdown" });
                    break;
                }
            }
        }
    });
};
