module.exports = (bot) => {
    bot.onText(/\/resources/, (msg) => {
        const message = `📚 *NIMCET 2025 Resources* \n\n` +
            `🧮 *Math:* \n
            👉 [📖 Book](https://t.me/nimcet_resources/87) | 
            // [📝 DPP](https://t.me/nimcet_resources/587) | 
            // [📂 PYQs](https://t.me/nimcet_resources/847) \n\n` +
            `🧠 *Reasoning:* \n
            👉 [📖 Book](https://t.me/nimcet_resources/571) | 
            // [📝 DPP](https://t.me/nimcet_resources/876)`;

        bot.sendMessage(msg.chat.id, message, { parse_mode: "Markdown", disable_web_page_preview: true });
    });
}