require('dotenv').config();
const { Telegraf } = require('telegraf');
const axios = require('axios');
const express = require('express');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const app = express();
const PORT = process.env.PORT || 3000;

let aiMode = new Map();

bot.command('ai', (ctx) => {
    aiMode.set(ctx.chat.id, true);
    ctx.reply('AI mode activated! Send a message, and I will respond. Type /stopai to deactivate.');
});

bot.command('stopai', (ctx) => {
    aiMode.delete(ctx.chat.id);
    ctx.reply('❌ AI mode deactivated.');
});

bot.on('text', async (ctx) => {
    if (aiMode.get(ctx.chat.id)) {
        const userMessage = ctx.message.text;
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: userMessage }],
                },
                { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
            );
            ctx.reply(response.data.choices[0].message.content);
        } 
        catch (error) {
            console.error('AI API Error:', error);
            ctx.reply('An error occured.');
        }
    }
});

bot.launch().then(() => console.log('Bot is running...'));

app.get('/', (req, res) => {
    res.send('Bot is live...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
