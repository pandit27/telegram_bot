require("dotenv").config();
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");

const OWNER_ID = Number(process.env.OWNER_ID);

module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = Number(msg.chat.id);
        const text = msg.text ? msg.text.trim() : "";

        if (chatId !== OWNER_ID) return;

        if (text.startsWith("-yt")) {
            const parts = text.split(" ");
            if (parts.length < 2) {
                bot.sendMessage(chatId, "❌ Usage: -yt <YouTube_URL>");
                return;
            }

            const url = parts[1];
            if (!ytdl.validateURL(url)) {
                bot.sendMessage(chatId, "❌ Invalid YouTube URL");
                return;
            }

            bot.sendMessage(chatId, "⏳ Downloading video, please wait...");

            try {
                const info = await ytdl.getInfo(url);
                const title = info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 20);
                const filePath = path.join(__dirname, `${title}.mp4`);

                const videoStream = ytdl(url, { quality: "highestvideo" });
                const writeStream = fs.createWriteStream(filePath);

                videoStream.pipe(writeStream);
                
                writeStream.on("finish", () => {
                    bot.sendVideo(chatId, filePath, { caption: `🎥 ${info.videoDetails.title}` })
                        .then(() => fs.unlinkSync(filePath)) // delete after sending
                        .catch((err) => console.error("Send error:", err));
                });
            } catch (err) {
                bot.sendMessage(chatId, `❌ Error: ${err.message}`);
            }
        }
    });
};
