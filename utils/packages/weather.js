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
            const weatherUrl = `https://wttr.in/${encodeURIComponent(city)}?format=%C|%t|%f|%w|%h|%P|%S|%s`;

            try {
                const response = await axios.get(weatherUrl);
                const data = response.data.split("|");

                const weatherText = `🌍 *Weather in ${city}*:
🌦 Condition: ${data[0]}
🌡 Temperature: ${data[1]} (Feels like ${data[2]})
💨 Wind: ${data[3]}
💧 Humidity: ${data[4]}
🌍 Pressure: ${data[5]}
🌅 Sunrise: ${data[6]}
🌇 Sunset: ${data[7]}`;

                bot.sendMessage(chatId, weatherText, { parse_mode: "Markdown" });
            } catch (error) {
                bot.sendMessage(chatId, "❌ Could not fetch weather. Check city name or try again later.");
            }
        }
    });
};
