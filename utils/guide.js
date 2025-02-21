module.exports = (bot, OWNER_ID) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        const userId = msg.from.id;

        if (text === "-guide") {
            if (userId !== OWNER_ID) {
                bot.sendMessage(chatId, "❌ You are not authorized to use this command.");
                return;
            }

            const guideMessage = `🔹 *Personal Bot Features Documentation* 🔹\n\n" +
                "*1️⃣ AI Chatbot*\n" +
                "- Command: \`-ai <your message>\`\n" +
                "- Uses Together API to generate AI-based responses.\n" +
                "- Returns AI-generated replies based on user queries.\n\n" +

                "*2️⃣ Weather Information Retrieval*\n" +
                "- Command: \`-weather <city>\`\n" +
                "- Fetches real-time weather details using \`wttr.in\` API.\n" +
                "- Returns: Condition, Temperature, Wind Speed, Humidity, Pressure, Sunrise & Sunset times.\n\n" +

                "*3️⃣ Handwriting Generator*\n" +
                "- Command: \`-handwriting <text>\`\n" +
                "- Converts text into a handwritten-style document.\n" +
                "- Uses a handwriting generation API.\n" +
                "- Returns an image of the handwritten text.\n\n" +

                "*4️⃣ Face Detection in Images*\n" +
                "- Command: Reply to an image with \`-detect\`\n" +
                "- Works *only for the bot owner*.\n" +
                "- Uses \`face-api.js\` for facial detection.\n" +
                "- Loads models dynamically from a hosted URL.\n" +
                "- Returns the number of faces detected.\n\n" +

                "*5️⃣ Dictionary Lookup*\n" +
                "- Command: \`-define <word>\`\n" +
                "- Uses the Dictionary API to fetch word meanings.\n" +
                "- Returns definitions, pronunciations, and example usages (if available).\n\n" +

                "*6️⃣ YouTube Video Downloader*\n" +
                "- Command: \`-yt <YouTube URL>\`\n" +
                "- Uses \`play-dl\` to download videos.\n" +
                "- Saves and sends the video file to the user.\n\n" +

                "*7️⃣ Message Forwarding*\n" +
                "- Command: Reply to a message with \`-fwd <chat_id>\`\n" +
                "- Forwards the replied message to the specified chat ID.\n" +
                "- Only the bot owner can use this feature.\n\n" +

                "*8️⃣ Message Sending to a Specific Chat*\n" +
                "- Command: \`-send <chat_id> <message>\`\n" +
                "- Sends a custom message to a specified chat ID.\n" +
                "- Useful for private message automation.\n\n" +

                "*9️⃣ Remove Background from Images*\n" +
                "- Command: Reply to an image with \`-removebg\`\n" +
                "- Works *only for the bot owner*.\n" +
                "- Uses \`remove.bg\` for background removal.\n" +
                "- Returns the image with removed background.\n\n" +

                "*🔟 Solve Math Equations*\n" +
                "- Command: \`-math <expression or equation>\`\n" +
                "- Works *only for the bot owner*.\n" +
                "- Uses \`mathjs\` & \`nerdamer\` to solve equations.\n" +
                "- Returns the calculated answer.\n\n" +

                "🔐 *Security and Restrictions*\n" +
                "- Only the owner (defined via \`OWNER_ID\`) can use certain commands.\n" +
                "- Prevents unauthorized access and usage.\n\n" +

                "🚀 *Future Enhancements (Planned)*\n" +
                "- More AI-based image processing features.\n" +
                "- Handwriting styles customization.\n" +
                "- Additional commands for user interaction.\n\n" +

                "Thanks!\n\n" +
                "Made by *Piyush Jha* with ❤️ & ☕.";`

            bot.sendMessage(chatId, guideMessage, { parse_mode: "Markdown" });
        }
    });
};
