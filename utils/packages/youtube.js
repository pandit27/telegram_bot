const playdl = require("play-dl");
const fs = require("fs");

module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text ? msg.text.trim() : "";

        if (chatId !== Number(process.env.OWNER_ID)) return;

        if (text.startsWith("-yt")) {
            const parts = text.split(" ");
            if (parts.length < 2) {
                bot.sendMessage(chatId, "❌ Usage: -yt <YouTube URL>");
                return;
            }

            const url = parts[1];

            try {
                bot.sendMessage(chatId, "⏳ Downloading... Please wait.");

                const video = await playdl.video_basic_info(url);
                const stream = await playdl.stream(url);
                const filePath = `./downloads/${video.video_details.title}.mp4`;

                const fileStream = fs.createWriteStream(filePath);
                stream.stream.pipe(fileStream);

                fileStream.on("finish", async () => {
                    bot.sendMessage(chatId, "✅ Download complete! Sending the file...");
                    await bot.sendVideo(chatId, filePath);
                });
            } catch (error) {
                bot.sendMessage(chatId, `❌ Error: ${error.message}`);
            }
        }
    });
};
