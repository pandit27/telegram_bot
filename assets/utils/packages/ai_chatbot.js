const axios = require("axios");
require("dotenv").config();

const TOGETHER_API_KEY = '00b3b05a7afeac01e085b4ac07dd7cc16b582c58cde8e84ab80242655fd55281';
const OWNER_ID = Number(process.env.OWNER_ID);
const MODEL = "mistralai/Mistral-7B-Instruct";

module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text ? msg.text.trim() : "";

        if (chatId !== OWNER_ID) return; // only I can use it for now

        if (text.startsWith("-ai")) {
            const query = text.slice(3).trim();
            if (!query) {
                bot.sendMessage(chatId, "❌ Usage: -ai <your message>");
                return;
            }

            try {
                const response = await axios.post(
                    "https://api.together.xyz/v1/chat/completions",
                    {
                        model: MODEL,
                        messages: [{ role: "user", content: query }],
                        max_tokens: 200,
                    },
                    {
                        headers: { Authorization: `Bearer ${TOGETHER_API_KEY}` },
                    }
                );

                const aiReply = response.data.choices[0].message.content;
                bot.sendMessage(chatId, `🤖 *AI Response:*\n${aiReply}`, { parse_mode: "Markdown" });
            } catch (error) {
                bot.sendMessage(chatId, "❌ Error: Could not fetch AI response. Try again later.");
                console.error(error);
            }
        }
    });
};
