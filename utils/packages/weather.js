const axios = require("axios");

module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text ? msg.text.trim() : "";

        if (chatId !== Number(process.env.OWNER_ID)) return;

        if (text.startsWith("-weather")) {
            const parts = text.split(" ");
            if (parts.length < 2) {
                bot.sendMessage(chatId, "❌ Usage: -weather <city>");
                return;
            }

            const city = parts.slice(1).join(" ");
            const weatherUrl = `https://wttr.in/${encodeURIComponent(city)}?format=%C+%t+%w+%h`;

            try {
                const response = await axios.get(weatherUrl);
                const weatherData = response.data;

                const weatherText = `🌤 Weather in *${city}*:\n${weatherData}`;
                bot.sendMessage(chatId, weatherText, { parse_mode: "Markdown" });
            } catch (error) {
                bot.sendMessage(chatId, "❌ Could not fetch weather. Check city name or try again later.");
            }
        }
    });
};
