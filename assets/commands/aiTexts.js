require("dotenv").config();
const natural = require("natural");
const { Trie } = require("mnemonist");
const tokenizer = new natural.WordTokenizer();

/*------------------------------------------------------------------------------------------
                                        chat ids
-------------------------------------------------------------------------------------------*/
const OWNER_ID = Number(process.env.OWNER_ID);
const GROUP_ID = Number(process.env.GROUP_ID);

module.exports = (bot) => {
    const trie = new Trie();

    /*------------------------------------------------------------------------------------------
                            pre-defined responses
    -------------------------------------------------------------------------------------------*/
    const responses = [
        { keywords: ["hello", "hi", "Hello", "Hi", "hey", "Hey"], response: "Hey there! 😊 How can I help?" },
    ];

    /*------------------------------------------------------------------------------------------
                using Trie ds for faster lookup in the pre-defined responses array
    -------------------------------------------------------------------------------------------*/
    const responseMap = new Map();
    responses.forEach(({ keywords, response }) => {
        keywords.forEach((word) => {
            trie.add(word);
            responseMap.set(word, response);
        });
    });

    /*------------------------------------------------------------------------------------------
                        function to send message (with `-sm` command )
    -------------------------------------------------------------------------------------------*/    
    bot.on("message", async (msg) => {
        const chatId = Number(msg.chat.id);
        
        // ensure the message has text before processing
        if (!msg.text) return;

        const text = msg.text.trim();

        // send message to the group using "-sm <message>"
        if (chatId === OWNER_ID && text.startsWith("-sm")) {
            const messageContent = text.replace("-sm", "").trim();
            if (!messageContent.length) {
                bot.sendMessage(chatId, "❌ You need to enter a message after '-sm'.");
                return;
            }
            bot.sendMessage(GROUP_ID, messageContent);
            bot.sendMessage(chatId, "✅ Message sent to the group!");
            return;
        }

        // send replied message to the group
        if (chatId === OWNER_ID && msg.reply_to_message && text === "-sm") {
            console.log("Forwarding message:", msg.reply_to_message);
            bot.forwardMessage(GROUP_ID, chatId, msg.reply_to_message.message_id)
                .then(() => bot.sendMessage(chatId, "✅ Message forwarded to the group!"))
                .catch((err) => bot.sendMessage(chatId, `❌ Error forwarding message: ${err.message}`));
            return;
        }

        // respond only in private chats
        if (msg.chat.type !== "private") return;

        // tokenize input
        const words = tokenizer.tokenize(text);
        let reply = "";

        for (let word of words) {
            if (trie.has(word)) {
                reply = responseMap.get(word);
                break;
            }
        }

        bot.sendMessage(chatId, reply);
    });
};
