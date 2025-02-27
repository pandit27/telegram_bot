const axios = require("axios");

module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text ? msg.text.trim() : "";

        if (chatId !== Number(process.env.OWNER_ID)) return;

        if (text.startsWith("-translate")) {
            const query = text.replace("-translate", "").trim();
            
            if (!query) {
                bot.sendMessage(chatId, "❌ *Usage:* `-translate <text>`", { parse_mode: "Markdown" });
                return;
            }

            const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=en|hi`;

            try {
                const response = await axios.get(apiUrl);
                const { translatedText } = response.data.responseData;
                if (!translatedText) throw new Error("Translation not found.");

                bot.sendMessage(chatId, `📝 *Translation:*\n\n🌍 *Detected:* ${response.data.responseData.match}\n🇮🇳 *Hindi:* ${translatedText}`, { parse_mode: "Markdown" });
            } catch (error) {
                console.error("Translation Error:", error.message);
                bot.sendMessage(chatId, "❌ *Error:* Could not fetch the translation. Please try again later.", { parse_mode: "Markdown" });
            }
        }
    });
};
