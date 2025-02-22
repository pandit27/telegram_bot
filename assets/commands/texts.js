/*------------------------------------------------------------------------------------------
                                    initial setup
-------------------------------------------------------------------------------------------*/
require("dotenv").config();
const natural = require("natural");
const { Trie } = require("mnemonist");
const levenshtein = require("fast-levenshtein");
// const tokenizer = new natural.WordTokenizer();




/*------------------------------------------------------------------------------------------
                                        chat ids
-------------------------------------------------------------------------------------------*/
const OWNER_ID = Number(process.env.OWNER_ID);
const GROUP_ID = Number(process.env.GROUP_ID);




/*------------------------------------------------------------------------------------------
                                        exporting module
-------------------------------------------------------------------------------------------*/
module.exports = (bot) => {
    const trie = new Trie();
    const responseMap = new Map();
    const keywordList = [];


    /*------------------------------------------------------------------------------------------
                            pre-defined responses
    -------------------------------------------------------------------------------------------*/
    const responses = require('../arrays and jsons/responses');


    /*------------------------------------------------------------------------------------------
                using Trie ds for faster lookup in the pre-defined responses array
    -------------------------------------------------------------------------------------------*/
    responses.forEach(({ keywords, response }) => {
        keywords.forEach((word) => {
            const lowerCaseWord = word.toLowerCase();
            trie.add(lowerCaseWord);
            responseMap.set(lowerCaseWord, response);
            keywordList.push(lowerCaseWord);
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

        // exact match using Trie
        if (trie.has(text)) {
            return bot.sendMessage(chatId, responseMap.get(text));
        }

        // Fuzzy matching using Levenshtein distance
        let bestMatch = { keyword: null, distance: Infinity };
        keywordList.forEach((keyword) => {
            const distance = levenshtein.get(text, keyword);
            if (distance < bestMatch.distance) {
                bestMatch = { keyword, distance };
            }
        });

        // If the closest match is within a reasonable distance (80% similarity)
        const maxDistance = Math.floor(bestMatch.keyword.length * 0.2); // Allow ~20% differences
        if (bestMatch.distance <= maxDistance) {
            return bot.sendMessage(chatId, responseMap.get(bestMatch.keyword));
        }

        // Default response if no close match is found
        bot.sendMessage(chatId, "I don't understand that question.");
    });

};
