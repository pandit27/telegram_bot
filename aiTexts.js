module.exports = (bot) => {
    // initializing packages
    const natural = require("natural");
    const tokenizer = new natural.WordTokenizer();

    // some pre-defined responses
    const responses = [
        { keywords: ["hello", "hi"], response: "Hey there! 😊 How can I help?" },
        { keywords: ["bye", "goodbye"], response: "Have a great day! 👋" },
    ];

    // handle general messages (only in private chat)
    bot.on("message", (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text.toLowerCase();

        // ignore "/"
        if (text.startsWith("/")) return;

        // to make sure it only responds in private chat
        if (msg.chat.type !== "private") return;

        // tokenize user input
        const words = tokenizer.tokenize(text);

        // find suitable response for user's query
        let reply = "Sorry, I'm still in developement mode. \n\n For information contact @PV_027.";
        for (let i of responses) {
            if (i.keywords.some((word) => words.includes(word))) {
                reply = i.response;
                break;
            }
        }

        bot.sendMessage(chatId, reply);
    });
}