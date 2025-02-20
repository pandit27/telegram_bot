require("dotenv").config();

const OWNER_ID = Number(process.env.OWNER_ID);

module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = Number(msg.chat.id);
        const text = msg.text ? msg.text.trim() : "";

        if (chatId !== OWNER_ID) return;

        // send message using username
        if (text.startsWith("-send")) {
            const parts = text.split(" ");
            if (parts.length < 3) {
                bot.sendMessage(chatId, "❌ Usage: -send @username message");
                return;
            }

            const username = parts[1];
            const message = parts.slice(2).join(" ");

            bot.getChat(username)
                .then((user) => {
                    bot.sendMessage(user.id, message);
                    bot.sendMessage(chatId, `✅ Message sent to ${username}!`);
                })
                .catch((err) => bot.sendMessage(chatId, `❌ Error: ${err.message}`));
            return;
        }

        // forward message using username
        if (msg.reply_to_message && text.startsWith("-fwd")) {
            const parts = text.split(" ");
            if (parts.length < 2) {
                bot.sendMessage(chatId, "❌ Usage: -fwd @username");
                return;
            }

            const username = parts[1];

            bot.getChat(username)
                .then((user) => {
                    bot.forwardMessage(user.id, chatId, msg.reply_to_message.message_id);
                    bot.sendMessage(chatId, `✅ Message forwarded to ${username}!`);
                })
                .catch((err) => bot.sendMessage(chatId, `❌ Error: ${err.message}`));
            return;
        }
    });
};
