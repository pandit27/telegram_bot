const axios = require("axios");

module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text ? msg.text.trim() : "";

        if (chatId !== Number(process.env.OWNER_ID)) return;

        if (text.startsWith("-define")) {
            const parts = text.split(" ");
            if (parts.length < 2) {
                bot.sendMessage(chatId, "❌ Usage: -define <word>");
                return;
            }

            const word = parts[1];
            const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

            try {
                const response = await axios.get(apiUrl);
                const data = response.data[0];

                const definition = data.meanings[0]?.definitions[0]?.definition || "No definition found.";
                const example = data.meanings[0]?.definitions[0]?.example || "No example available.";
                const synonyms = data.meanings[0]?.synonyms.slice(0, 5).join(", ") || "None";

                const message = `📖 *Definition of "${word}":*\n\n*Meaning:* ${definition}\n\n *Example:* ${example}\n\n *Synonyms:* ${synonyms}`;

                bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
            } catch (error) {
                bot.sendMessage(chatId, "❌ Could not fetch the definition. Check the word and try again.");
            }
        }
    });
};
