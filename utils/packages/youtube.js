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

                const video = await playdl.video_info(url);
                const fileName = `./downloads/${video.video_details.id}.mp4`;
                
                const buffer = await playdl.download(url, { quality: "highest" });
                fs.writeFileSync(fileName, buffer);

                bot.sendMessage(chatId, "✅ Download complete! Sending the file...");
                await bot.sendVideo(chatId, fileName);
            } catch (error) {
                bot.sendMessage(chatId, `❌ Error: ${error.message}`);
            }
        }
    });
};
