require('dotenv').config();
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const axios = require('axios');
const express = require('express');

const apiId = parseInt(process.env.TELEGRAM_API_ID);
const apiHash = process.env.TELEGRAM_API_HASH;
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const stringSession = new StringSession(process.env.TELEGRAM_SESSION || '');

const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });
const app = express();
const PORT = process.env.PORT || 3000;

let aiMode = new Map();

(async () => {
    await client.start({
        botAuthToken: botToken
    });
    console.log('Bot is running...');
})();

client.addEventHandler(async (event) => {
    const message = event.message;
    if (!message || !message.text) return;

    const chatId = message.chatId;
    const userMessage = message.text;

    if (userMessage.startsWith('/ai')) {
        aiMode.set(chatId, true);
        await client.sendMessage(chatId, { message: 'AI mode activated! Send a message, and I will respond. Type /stopai to deactivate.' });
    } 

    else if (userMessage.startsWith('/stopai')) {
        aiMode.delete(chatId);
        await client.sendMessage(chatId, { message: '❌ AI mode deactivated.' });
    } 

    else if (aiMode.get(chatId)) {
        try {
            const response = await axios.post(
                'local:101:24:07',
                {
                    model: 'custom llm',
                    messages: [{ role: 'user', content: userMessage }],
                },
                { headers: { Authorization: `key: ${key}` } }
            );
            await client.sendMessage(chatId, { message: response.data.choices[0].message.content });
        } catch (error) {
            console.error('AI API Error:', error);
            await client.sendMessage(chatId, { message: 'An error occurred while processing your request.' });
        }
    }
});

app.get('/', (req, res) => {
    res.send('Bot is live...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
