const natural = require("natural");
const { Trie } = require("mnemonist");
const tokenizer = new natural.WordTokenizer();

module.exports = (bot) => {
    const trie = new Trie();
    
    // pre-defined responses (using Trie ds)
    const responses = [
        { keywords: ["hello", "hi"], response: "Hey there! 😊 How can I help?" },
        { keywords: ["bye", "goodbye"], response: "Have a great day! 👋" },
    ];

    // use Trie ds for faster lookup
    const responseMap = new Map();
    responses.forEach(({ keywords, response }) => {
        keywords.forEach((word) => {
            trie.add(word);
            responseMap.set(word, response);
        });
    });

    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text.toLowerCase().trim();

        // ignore "/" command
        if (text.startsWith("/")) return;
        
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

        // fuzzy matching (threshold concept)
        if (reply.startsWith("Sorry")) {
            for (let word of words) {
                for (let key of responseMap.keys()) {
                    if (natural.JaroWinklerDistance(word, key) > 0.95) { // 95% similarity threshold
                        reply = responseMap.get(key);
                        break;
                    }
                }
            }
        }

        bot.sendMessage(chatId, reply);
    });
};
