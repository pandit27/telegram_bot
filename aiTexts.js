// include packages
const axios = require("axios");

module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text.toLowerCase();

        // Ignore commands
        if (text.startsWith("/")) return;

        // Respond only in private chat
        if (msg.chat.type !== "private") return;

        // Call LLaMA 2 API
        const response = await getLlamaResponse(text);

        // Send reply to user
        bot.sendMessage(chatId, response);
    });
}

// Function to call LLaMA 2 API (Outside module.exports)
async function getLlamaResponse(userInput) {
    try {
        const apiKey = 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;
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf",
            { inputs: userInput },
            { headers: { Authorization: `Bearer ${apiKey}` } }
        );

        return response.data[0].generated_text || "Sorry, I didn't get you.";
    } 
    catch (error) {
        console.error("LLaMA API Error:", error);
        return "Oops! Something went wrong.";
    }
}