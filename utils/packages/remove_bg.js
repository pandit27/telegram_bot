const { removeBackgroundFromImageUrl } = require("remove.bg");
const fs = require("fs");
const path = require("path");

module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text ? msg.text.trim() : "";

        // only I can use this feature
        if (chatId !== Number(process.env.OWNER_ID)) return;

        if (msg.reply_to_message && msg.reply_to_message.photo && text.startsWith("-removebg")) {
            const fileId = msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id;

            try {
                // get file path from Telegram
                const file = await bot.getFile(fileId);
                const fileUrl = `https://api.telegram.org/file/botNGPkDcoMzNbhDYTkSsLTmGqf/${file.file_path}`;

                bot.sendMessage(chatId, "⏳ Removing background... Please wait.");

                // remove the background
                const { base64img } = await removeBackgroundFromImageUrl({
                    url: fileUrl,
                    apiKey: process.env.REMOVE_BG_API_KEY,
                    size: "auto",
                });

                // conver base64 to buffer
                const buffer = Buffer.from(base64img, "base64");
                const outputPath = path.join(__dirname, "output.png");
                fs.writeFileSync(outputPath, buffer);

                // send the processed image back
                bot.sendPhoto(chatId, buffer, { caption: "✅ Background removed!" });

            } catch (error) {
                console.error(error);
                bot.sendMessage(chatId, "❌ Error: Could not remove background. Try again later.");
            }
        }
    });
};
