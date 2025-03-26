require("dotenv").config();


module.exports = (bot) => {
    const OWNER_ID = Number(process.env.OWNER_ID);
    const OWNER2_ID = Number(process.env.OWNER2_ID);

    
/*------------------------------------------------------------------------------------------
                                    importing modules
-------------------------------------------------------------------------------------------*/
    const youtube = require("./packages/youtube");
    youtube(bot);
    const weathers = require("./packages/weather");
    weathers(bot);
    const dictionary = require("./packages/dictionary");
    dictionary(bot);
    const ai_chatbot = require("./packages/ai_chatbot");
    ai_chatbot(bot);
    const text_to_handwriting = require("./packages/text_to_handwriting");
    text_to_handwriting(bot);
    // const detect_face = require("./packages/detect_face");
    // detect_face(bot);
    const remove_bg = require("./packages/remove_bg");
    remove_bg(bot);
    const mathstep = require("./math_pkg/mathstep");
    mathstep(bot);
    // const guide = require("./guide");
    // guide(bot);
    const translator = require("./packages/translator");
    translator(bot);


/*------------------------------------------------------------------------------------------
                        function to send messsage to any chat (using chat_id)
-------------------------------------------------------------------------------------------*/
    bot.on("message", async (msg) => {
        const chatId = Number(msg.chat.id);
        const text = msg.text ? msg.text.trim() : "";

        if (chatId !== OWNER_ID && chatId !== OWNER2_ID) return;


        // send message using chat ID
        if (text.startsWith("-send")) {
            const parts = text.split(" ");
            if (parts.length < 3) {
                bot.sendMessage(chatId, "❌ Usage: -send chat_id message");
                return;
            }

            const targetChatId = Number(parts[1]);
            const message = parts.slice(2).join(" ");

            bot.sendMessage(targetChatId, message)
                .then(() => bot.sendMessage(chatId, `✅ Message sent to ${targetChatId}!`))
                .catch((err) => bot.sendMessage(chatId, `❌ Error: ${err.message}`));
            return;
        }

        // forward message using chat ID
        /* 
            use karne ke liye bas uss message par reply and use -fwd <userid>
            can be used only in that bot (out of scope not defined)
        */
        if (msg.reply_to_message && text.startsWith("-fwd")) {
            const parts = text.split(" ");
            if (parts.length < 2) {
                bot.sendMessage(chatId, "❌ Usage: -fwd chat_id");
                return;
            }

            const targetChatId = Number(parts[1]);

            bot.forwardMessage(targetChatId, chatId, msg.reply_to_message.message_id)
                .then(() => bot.sendMessage(chatId, `✅ Message forwarded to ${targetChatId}!`))
                .catch((err) => bot.sendMessage(chatId, `❌ Error: ${err.message}`));
            return;
        }
    });


/*------------------------------------------------------------------------------------------
                        function to get poll's data
-------------------------------------------------------------------------------------------*/
    bot.on("poll", (poll) => {
        bot.pollData = bot.pollData || {};
        bot.pollData[poll.id] = poll;
    });

    bot.on("message", async (msg) => {
        const chatId = Number(msg.chat.id);
        const text = msg.text ? msg.text.trim() : "";

        if (chatId !== OWNER_ID) return;
        if (!msg.chat.type || msg.chat.type !== "private") return;

        if (text === "-userdata" && msg.reply_to_message && msg.reply_to_message.poll) {
            const pollId = msg.reply_to_message.poll.id;
            const pollData = bot.pollData ? bot.pollData[pollId] : null;
            
            if (!pollData) {
                bot.sendMessage(chatId, "❌ No data found for this poll.");
                return;
            }

            let userData = "📊 Poll User Data:\n\n";
            
            for (const option of pollData.options) {
                if (option.voter_count > 0) {
                    userData += `📝 Option: ${option.text}\n`;
                    const voters = option.voter_count;
                    for (let i = 0; i < voters; i++) {
                        userData += `👤 User ${i + 1}: (ID: Unknown, Name: Unknown)\n`; 
                    }
                    userData += "\n";
                }
            }

            bot.sendMessage(chatId, userData);
        }
    });

    /******************************************/
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text?.trim();
    
        if (Number(chatId) !== Number(process.env.OWNER_ID)) return;
    
        if (text?.startsWith("-snd message link")) {
            const message = text.replace("-snd message link", "").trim();
    
            if (!message) {
                bot.sendMessage(chatId, "❌ Please provide a message!");
                return;
            }
    
            try {
                await bot.sendMessage(process.env.TEST_ID, message);
                bot.sendMessage(chatId, "✅ Message sent to the group!");
            } catch (error) {
                bot.sendMessage(chatId, "❌ Failed to send the message. Make sure the bot has admin rights.");
            }
        }
    });
    
    
       

};
