const axios = require("axios");
const handwritten = require("handwritten.js");
const fs = require("fs");

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
            const outputPath = "handwriting.pdf";

            try {
                const converted = await handwritten(inputText);
                converted.pipe(fs.createWriteStream(outputPath));
                converted.on("finish", () => {
                    bot.sendDocument(chatId, outputPath, { caption: "📝 Your handwritten text" });
                    fs.unlinkSync(outputPath); // delete the file from sending
                });
            } catch (error) {
                bot.sendMessage(chatId, "❌ Could not generate handwriting. Try again later.");
            }
        }
    });
};
