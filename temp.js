module.exports = (bot, CHAT_ID) => {
    bot.onText(/\/miniapp/, (msg) => {
        bot.sendMessage(msg.chat.id, "🚀 Open the Mini App:", {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Open Mini App",
                            web_app: { url: "https://peppy-muffin-c667f8.netlify.app/" }
                        }
                    ]
                ]
            }
        });
    });

    bot.on("message", (msg) => {
        if (msg.web_app_data) {
            const data = JSON.parse(msg.web_app_data.data);
            bot.sendMessage(msg.chat.id, `Received Data:\nName: ${data.name}\nScore: ${data.score}`);
        }
    });
    
};
