// exporting all modules in one file
module.exports = (bot, CHAT_ID, TEST_ID, OWNER_ID) => {
    const faq_chats = require("./client/group tools/group chat/faq_chat");
    faq_chats(bot, CHAT_ID);
};