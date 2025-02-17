module.exports = (bot) => {
    bot.onText(/\/resources/, (msg) => {
        const message = `📚 *NIMCET 2025 Resources* \n\n` +
            `🧑‍🏫 *Math:* \n
            | [📖 Book](https://t.me/nimcet_resources/87) | 
            | [📝 DPP](https://t.me/nimcet_resources/587) | 
            | [📂 PYQs](https://t.me/nimcet_resources/847) \n\n` +
            `👩‍🏫 *Reasoning:* \n
            👉 [📖 Book](https://t.me/nimcet_resources/571) | 
            // [📝 DPP](https://t.me/nimcet_resources/876)\n\n` +
            `💻 *Groups & Channels* \n
            | 1. [NIMCET resources](https://t.me/nimcet_resources) |
            | 2. [NIMCET group 2025](https://t.me/nimcet2025_group) | 
            | 3. [CUET group 2025](https://t.me/cuetpg_2025_group) | 
            | 4. [NIMCET daily quiz](https://t.me/nimcet_quiz) | 
            | 5. [Super Nimcet Group](https://t.me/supernimcetgroup) | 
            | 6. [NIMCET Discussion Group](https://t.me/nimcet2025group) | 
            | 7. [NIMCET Quizzes](https://t.me/nimcet2025_group) |`;

        bot.sendMessage(msg.chat.id, message, { parse_mode: "Markdown", disable_web_page_preview: true });
    });
}