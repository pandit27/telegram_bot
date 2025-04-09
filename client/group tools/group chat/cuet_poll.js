const DEFAULT_GROUP_ID = process.env.CUET_ID;
const DEFAULT_NIMCET_ID = process.env.GROUP_ID;
const TEST_GROUP_ID = process.env.TEST_ID;

module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        const reply = msg.reply_to_message;

        if (!text) return;

        if (text.startsWith("-sp")) {
            if (chatId !== Number(process.env.OWNER_ID) && chatId !== Number(process.env.OWNER2_ID)) return;
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




    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        const reply = msg.reply_to_message;

        if (!text) return;

        if (text.startsWith("-sp_nimcet")) {
            if (chatId !== Number(process.env.OWNER_ID)) return;
            if (reply && reply.poll) {
                let targetChatId = DEFAULT_NIMCET_ID;
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

            bot.sendMessage(chatId, "❌ Reply to a poll with `-sp_nimcet` to send it.");
        }
    });

    // to send quiz
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        const reply = msg.reply_to_message;

        if (!text) return;

        // Send Quiz to NIMCET group
        if (text.startsWith("-sq")) {
            if (chatId !== Number(process.env.OWNER_ID) && chatId !== Number(process.env.OWNER2_ID)) return;
            if (reply && reply.poll && reply.poll.type === "quiz") {
                let targetChatId = DEFAULT_GROUP_ID;
                const parts = text.split(" ");

                if (parts.length === 2) {
                    targetChatId = Number(parts[1]);
                }

                const poll = reply.poll;
                try {
                    await bot.sendPoll(
                        targetChatId,
                        poll.question,
                        poll.options.map(opt => opt.text),
                        {
                            type: "quiz",
                            correct_option_id: poll.correct_option_id,
                            is_anonymous: poll.is_anonymous || false,
                            explanation: poll.explanation || undefined,
                            allows_multiple_answers: false
                        }
                    );
                    bot.sendMessage(chatId, `✅ Quiz sent to ${targetChatId}!`);
                } catch (error) {
                    bot.sendMessage(chatId, `❌ Error: ${error.message}`);
                }
                return;
            }

            bot.sendMessage(chatId, "❌ Reply to a quiz-type poll with `-sq` to send it.");
        }
    });

    // to send image to the group
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        const reply = msg.reply_to_message;

        if (!text) return;

        // Send Photo
        if (text.startsWith("-sphoto")) {
            if (chatId !== Number(process.env.OWNER_ID) && chatId !== Number(process.env.OWNER2_ID)) return;
            if (reply && reply.photo) {
                let targetChatId = DEFAULT_GROUP_ID;
                const parts = text.split(" ");

                if (parts.length === 2) {
                    targetChatId = Number(parts[1]);
                }

                const photoArray = reply.photo;
                const fileId = photoArray[photoArray.length - 1].file_id;

                try {
                    await bot.sendPhoto(targetChatId, fileId, {
                        caption: reply.caption || ''
                    });
                    bot.sendMessage(chatId, `✅ Photo sent to ${targetChatId}!`);
                } catch (error) {
                    bot.sendMessage(chatId, `❌ Error: ${error.message}`);
                }
                return;
            }

            bot.sendMessage(chatId, "❌ Reply to a photo with `-sphoto` to send it.");
        }
    });


    // to forward messages to a chat id
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        const reply = msg.reply_to_message;

        if (!text) return;

        if (text.startsWith("-forward")) {
            if (chatId !== Number(process.env.OWNER_ID) && chatId !== Number(process.env.OWNER2_ID)) return;

            const parts = text.split(" ");
            if (parts.length !== 2) {
                bot.sendMessage(chatId, "❌ Usage: `-forward <chat_id>` (reply to any message)");
                return;
            }

            const targetChatId = Number(parts[1]);

            if (!reply) {
                bot.sendMessage(chatId, "❌ Please reply to the message you want to forward.");
                return;
            }

            try {
                await bot.copyMessage(targetChatId, chatId, reply.message_id);
                bot.sendMessage(chatId, `✅ Message copied to ${targetChatId}!`);
            } catch (error) {
                bot.sendMessage(chatId, `❌ Error: ${error.message}`);
            }
            return;
        }
    });




};

