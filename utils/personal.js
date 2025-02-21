require("dotenv").config();

const OWNER_ID = Number(process.env.OWNER_ID);

module.exports = (bot) => {
/*****************************************************************************************/
    // importing modules from packages
    const youtube = require("./packages/youtube");
    youtube(bot);
    const weathers = require("./packages/weather");
    weathers(bot);
    const dictionary = require("./packages/dictionary");
    dictionary(bot);
    const ai_chatbot = require("./packages/ai_chatbot");
    ai_chatbot(bot);
    const text_to_handwriting = require("./packages/text_to_handwriting");
    text_to_handwriting(bot);
    const detect_face = require("./packages/detect_face");
    detect_face(bot);
    const remove_bg = require("./packages/remove_bg");
    remove_bg(bot);
/*****************************************************************************************/


    bot.on("message", async (msg) => {
        const chatId = Number(msg.chat.id);
        const text = msg.text ? msg.text.trim() : "";

        if (chatId !== OWNER_ID) return;

        // send message using chat ID
        if (text.startsWith("-send")) {
            const parts = text.split(" ");
            if (parts.length < 3) {
                bot.sendMessage(chatId, "❌ Usage: -send chat_id message");
                return;
            }

            const targetChatId = Number(parts[1]);
            const message = parts.slice(2).join(" ");

            bot.sendMessage(targetChatId, message)
                .then(() => bot.sendMessage(chatId, `✅ Message sent to ${targetChatId}!`))
                .catch((err) => bot.sendMessage(chatId, `❌ Error: ${err.message}`));
            return;
        }

        // forward message using chat ID
        /* 
            use karne ke liye bas uss message par reply and use -fwd <userid>
            can be used only in that bot (out of scope not defined)
        */
        if (msg.reply_to_message && text.startsWith("-fwd")) {
            const parts = text.split(" ");
            if (parts.length < 2) {
                bot.sendMessage(chatId, "❌ Usage: -fwd chat_id");
                return;
            }

            const targetChatId = Number(parts[1]);

            bot.forwardMessage(targetChatId, chatId, msg.reply_to_message.message_id)
                .then(() => bot.sendMessage(chatId, `✅ Message forwarded to ${targetChatId}!`))
                .catch((err) => bot.sendMessage(chatId, `❌ Error: ${err.message}`));
            return;
        }
    });
};
