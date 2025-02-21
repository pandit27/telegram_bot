const { create, all } = require("mathjs");
const math = create(all);
const nerdamer = require("nerdamer");
require("nerdamer/Algebra");

module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;

        if (text.startsWith("-math")) {
            const expression = text.slice(5).trim();
            if (!expression) {
                bot.sendMessage(chatId, "❌ Usage: -math <expression or equation>");
                return;
            }

            try {
                let responseText = "";

                if (expression.includes("=")) {
                    // solve equations using nerdamer
                    let solutions = nerdamer(`solve(${expression})`).evaluate().toString();
                    responseText = `📌 Solutions: ${solutions}`;
                } 
                else {
                    // simplify expression using mathjs
                    let simplified = math.simplify(expression).toString();
                    responseText = `📌 Simplified Expression: ${simplified}`;
                }

                bot.sendMessage(chatId, responseText);
            } catch (error) {
                bot.sendMessage(chatId, "❌ Error: Unable to process the expression.");
                console.error(error);
            }
        }
    });
};
