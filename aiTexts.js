const natural = require("natural");
const { Trie } = require("mnemonist");
const tokenizer = new natural.WordTokenizer();

const OWNER_ID = 5036581553;
const GROUP_ID = -1002165186773;

module.exports = (bot) => {
    const trie = new Trie();

    // pre-defined responses
    const responses = [
        { keywords: ["hello", "hi"], response: "Hey there! 😊 How can I help?" },
        { keywords: ["bye", "goodbye"], response: "Have a great day! 👋" },
    ];

    // using Trie ds for faster lookup
    const responseMap = new Map();
    responses.forEach(({ keywords, response }) => {
        keywords.forEach((word) => {
            trie.add(word);
            responseMap.set(word, response);
        });
    });

    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text.trim();

        if (chatId === OWNER_ID && text.startsWith("-sendMessage")) {
            const messageContent = text.replace("-sendMessage", "").trim();
            if (messageContent.length === 0) {
                bot.sendMessage(chatId, "❌ You need to enter a message after '-sendMessage'.");
                return;
            }
            bot.sendMessage(GROUP_ID, `${messageContent}`);
            bot.sendMessage(chatId, "✅ Message sent to the group!");
            return;
        }

        // respond only in private chats
        if (msg.chat.type !== "private") return;

        // tokenize input
        const words = tokenizer.tokenize(text);
        let reply = "Sorry, I'm still in the development phase.\n\nFor more information contact @PV_027.";

        for (let word of words) {
            if (trie.has(word)) {
                reply = responseMap.get(word);
                break;
            }
        }

        bot.sendMessage(chatId, reply);
    });
};
