const DEFAULT_GROUP_ID = process.env.CUET_ID;

module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        const reply = msg.reply_to_message;

        if (!text) return;

        if (text.startsWith("-sp")) {
            if (chatId !== Number(process.env.OWNER_ID)) return;
            if (reply && reply.poll) {
                let targetChatId = DEFAULT_GROUP_ID;
                const parts = text.split(" ");

                if (parts.length === 2) {
                    targetChatId = Number(parts[1]);
                }

                const poll = reply.poll;
                try {
                    await bot.sendPoll(targetChatId, poll.question, poll.options.map(opt => opt.text), {
                        is_anonymous: poll.is_anonymous,
                        type: poll.type,
                        allows_multiple_answers: poll.allows_multiple_answers
                    });
                    bot.sendMessage(chatId, `✅ Poll sent to ${targetChatId}!`);
                } catch (error) {
                    bot.sendMessage(chatId, `❌ Error: ${error.message}`);
                }
                return;
            }

            bot.sendMessage(chatId, "❌ Reply to a poll with `-sp` to send it.");
        }
    });
};

