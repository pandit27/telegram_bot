const alertKeywords = require("../../../assets/arrays and jsons/alert_keywords");

module.exports = (bot, OWNER_ID, GROUP_ID) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text?.trim();

        if (!msg.from || msg.from.is_bot || !text) return;

        const ownerIdNum = Number(OWNER_ID);
        const groupIdNum = Number(GROUP_ID);

        if (chatId === groupIdNum) {
            for (let keyword of alertKeywords) {
                if (text.toLowerCase().includes(keyword)) {
                    const username = msg.from.username ? `@${msg.from.username}` : "(No username)";
                    const messageLink = `https://t.me/c/${groupIdNum.toString().slice(4)}/${msg.message_id}`;

                    bot.sendMessage(ownerIdNum, `🚨 <b>Keyword Alert!</b>\n
                        📌 <b>Mentioned in Group:</b> ${keyword}\n
                        👤 <b>By:</b> ${msg.from.first_name} ${username}\n
                        💬 <b>Message:</b> "${text}"\n
                        🔗 <a href='${messageLink}'>View Message</a>`, 
                        { parse_mode: "HTML", disable_web_page_preview: true });
                    break;
                }
            }
        }
    });
};
