module.exports = (bot) => {
    // initializing packages
    const natural = require("natural");
    const tokenizer = new natural.WordTokenizer();

    // some pre-defined responses
    const responses = [
        { keywords: ["hello", "hi"], response: "Hey ${firstName}! 😊 How can I help you?" },
        { keywords: ["bye", "goodbye"], response: "Have a great day! 👋" },
        { keywords: ["thanks", "thank you"], response: "You're welcome! 😊" },
        { keywords: ["how are you", "how's it going"], response: "I'm doing great! How about you?" },
        { keywords: ["help", "support"], response: "Sure! What do you need help with?" },
    ];

    // handle general messages (only in private chat)
    bot.on("message", (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text.toLowerCase();

        // user info
        const firstName = msg.chat.first_name || "User";
        const lastName = msg.from.last_name || "";

        // ignore "/"
        if (text.startsWith("/")) return;

        // to make sure it only responds in private chat
        if (msg.chat.type !== "private") return;

        // tokenize user input
        const words = tokenizer.tokenize(text);

        // find suitable response for user's query
        let reply = "Sorry, I'm still in the development phase. \n\n For more information contact @PV_027.";
        for (let i of responses) {
            const keywordMatch = i.keywords.some((word) => words.includes(word));

            // fuzzy matching for more accurate response
            if (!keywordMatch) {
                for (let keyword of i.keywords) {
                    const similarity = stringSimilarity.compareTwoStrings(text, keyword);
                    if (similarity > 0.6) { 
                        // threshold for fuzzy match
                        reply = i.response.replace("${firstName}", firstName);
                        break;
                    }
                }
            } 
            else {
                reply = i.response.replace("${firstName}", firstName);
                break;
            }
        }

        bot.sendMessage(chatId, reply);
    });
}