const mathsteps = require("mathsteps");

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

            // to make sure that its an eqn (must contain '=')
            if (expression.includes("=")) {
                const steps = mathsteps.solveEquation(expression);
                steps.forEach((step, index) => {
                    responseText += `📝 Step ${index + 1}:\n`;
                    responseText += `Before: ${step.oldEquation.ascii()}\n`;
                    responseText += `Change: ${step.changeType}\n`;
                    responseText += `After: ${step.newEquation.ascii()}\n\n`;
                });
            } 
            else {
                // Simplify an exprn
                const steps = mathsteps.simplifyExpression(expression);
                steps.forEach((step, index) => {
                    responseText += `📝 Step ${index + 1}:\n`;
                    responseText += `Before: ${step.oldNode.toString()}\n`;
                    responseText += `Change: ${step.changeType}\n`;
                    responseText += `After: ${step.newNode.toString()}\n\n`;
                });
            }

            if (responseText === "") {
                bot.sendMessage(chatId, "❌ Unable to solve or simplify the given input.");
            } 
            else {
                bot.sendMessage(chatId, responseText);
            }
        } catch (error) {
            bot.sendMessage(chatId, "❌ Error: Unable to process the expression.");
            console.error(error);
        }
    }
});
