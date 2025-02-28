const formulas = require("../../assets/arrays and jsons/formulas");

module.exports = (bot, OWNER_ID, GROUP_ID) => {

    // function to send a random formula
    function sendFormula() {
        const formula = formulas[Math.floor(Math.random() * formulas.length)];

        bot.sendMessage(GROUP_ID, `📢 *Formula of the Day* 📢\n\n` +
            `📌 *Topic:* ${formula.topic}\n` +
            `📝 *Formula:* \`${formula.formula}\`\n` +
            `📖 *Explanation:* ${formula.explanation}`, { parse_mode: "Markdown" });

        bot.sendMessage(OWNER_ID, "✅ *Formula sent to the group!*", { parse_mode: "Markdown" });
    }

    // command to send the formula in the group
    bot.on("message", (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text?.trim();

        if (Number(chatId) === Number(OWNER_ID) && text === "/formula") {
            sendFormula();
        }
    });

};
