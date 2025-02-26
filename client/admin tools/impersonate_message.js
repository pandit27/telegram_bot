module.exports = (bot) => {
    require("dotenv").config();
    const OWNER_ID = Number(process.env.OWNER_ID);
    const GROUP_ID = Number(process.env.TEST_ID);

    bot.on("message", async (msg) => {
        const chatId = Number(msg.chat.id);
        const userId = Number(msg.from.id);
        const text = msg.text ? msg.text.trim() : "";

        if (chatId !== OWNER_ID || userId !== OWNER_ID) return;

        if (text.startsWith("-impersonate")) {
            const args = text.split(" ");
            if (args.length < 3) {
                bot.sendMessage(chatId, "❌ *Usage:* `-impersonate <user_id> <message>`", { parse_mode: "Markdown" });
                return;
            }

            const targetUserId = args[1];
            let impersonatedMessage = args.slice(2).join(" ").trim();

            console.log("DEBUG: Impersonated Message =", impersonatedMessage);

            if (!impersonatedMessage) {
                bot.sendMessage(chatId, "❌ *Message cannot be empty!*", { parse_mode: "Markdown" });
                return;
            }

            bot.sendMessage(Number(GROUP_ID), `👤 *User (${targetUserId}) says:* ${impersonatedMessage}\n\n🔹 _Sent on behalf of admin._`, { parse_mode: "Markdown" })
                .then(() => bot.sendMessage(chatId, "✅ *Message sent successfully!*", { parse_mode: "Markdown" }))
                .catch((err) => {
                    console.error("ERROR: ", err.message);
                    bot.sendMessage(chatId, `❌ *Error:* ${err.message}`, { parse_mode: "Markdown" });
                });
        }
    });
};
