module.exports = (bot) => {
    const OWNER_CHAT_ID = process.env.OWNER_ID;

/*------------------------------------------------------------------------------------------
                                send details to myself
-------------------------------------------------------------------------------------------*/
    const sendUserDetailsToOwner = (msg) => {
        const username = msg.from.username || "Anonymous";
        const firstName = msg.from.first_name || "User";
        const lastName = msg.from.last_name || "";
        const userId = msg.from.id;
    
        const messageToOwner = `<b>New User Opened the Bot!</b>\n\nName: ${firstName} ${lastName} \nUsername: @${username} \nUser ID: ${userId}`;
    
        bot.sendMessage(OWNER_CHAT_ID, messageToOwner, { parse_mode: "HTML" });
    };    

/*------------------------------------------------------------------------------------------
                            importing & loading modules
-------------------------------------------------------------------------------------------*/
    const resources = require('./resources');
    resources(bot);
    const texts = require('./texts');
    texts(bot);
    const dsa_quiz = require('./dsa_quiz');
    dsa_quiz(bot);
    const personal = require('../utils/personal');
    personal(bot);

/*------------------------------------------------------------------------------------------
                                        commands
-------------------------------------------------------------------------------------------*/
    /*
        1. /start command
    */
    bot.onText(/\/start/, (msg) => {
        if (msg.chat.type !== "private") {
            bot.sendMessage(msg.chat.id, "This command is available only in private chat. Use it via @pvnimcet2025_bot.");
            return;
        }

        sendUserDetailsToOwner(msg); // notify owner
    
        const firstName = msg.from.first_name || "User";
        const lastName = msg.from.last_name || "";
    
        const welcomeMessage = `👋 Hello, ${firstName} ${lastName}!\n Use /help to get all commands.`;
    
        const options = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "📩 Contact Owner", url: "https://t.me/PV_027" }],
                    [{ text: "🔗 GitHub Repo", url: "https://github.com/pandit27/telegram_bot" }]
                ]
            }
        };
    
        bot.sendMessage(msg.chat.id, welcomeMessage, options);
    });        
    
    /*
        2. /days command
    */
    bot.onText(/\/days/, (msg) => {
        // to make sure that /days command is to be used only in private chats
        // if (msg.chat.type !== "private") {
        //     bot.sendMessage(msg.chat.id, "This command is available only in private chat. Use it via @pvnimcet2025_bot.");
        //     return;
        // }

        const EXAM_DATE = new Date("2025-03-27");
        const now = new Date();
        const timeDiff = EXAM_DATE - now;
        if (timeDiff > 0) {
            const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

            const message = `⌛ <b>${daysLeft} days, ${hoursLeft} hours, and ${minutesLeft} minutes</b> left until the CUET PG exam! \n Keep grinding.`;
            bot.sendMessage(msg.chat.id, message, { parse_mode: "HTML" });
        } 
        else if (timeDiff === 0) bot.sendMessage(msg.chat.id, "🚨 Today is the CUET PG exam! Best of luck!");
        else bot.sendMessage(msg.chat.id, "The CUET PG exam has passed!");

        console.log(`Current date: ${now}, Exam date: ${EXAM_DATE}, Time difference: ${timeDiff}`);
    });

    /*
        3. /help command
    */
    bot.onText(/\/help/, (msg) => {
        if (msg.chat.type !== "private") {
            bot.sendMessage(msg.chat.id, "This command is available only in private chat. Use it via @pvnimcet2025_bot.");
            return;
        }

        bot.sendMessage(msg.chat.id, "/start : to start the bot. \n/days : to get CUET PG exam countdown. \n/nimcet : to get NIMCET exam countdown. \n/quiz : to get a random NIMCET quiz \n/resources : to get NIMCET 2025 resources. \n\nFor any query contact : @PV_027");
    });

    /*
        4. /nimcet_date command
    */
    bot.onText(/\/nimcet_date/, (msg) => {
        bot.sendMessage(msg.chat.id, "NIMCET exam date is yet to be announced.");
    });
}
