const axios = require("axios");

module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text ? msg.text.trim() : "";

        if (chatId !== Number(process.env.OWNER_ID)) return;

        if (text.startsWith("-handwriting")) {
            const parts = text.split(" ");
            if (parts.length < 2) {
                bot.sendMessage(chatId, "❌ Usage: -handwriting <text>");
                return;
            }

            const inputText = parts.slice(1).join(" ");
            const apiUrl = `https://api.freetts.com/text-image-generator?text=${encodeURIComponent(inputText)}&font=handwriting`;

            try {
                const response = await axios.get(apiUrl, { responseType: "arraybuffer" });
                const imageBuffer = Buffer.from(response.data, "binary");
                bot.sendPhoto(chatId, imageBuffer, { caption: "📝 Your handwritten text" });
            } catch (error) {
                bot.sendMessage(chatId, "❌ Could not generate handwriting. Try again later.");
            }
        }
    });
};
