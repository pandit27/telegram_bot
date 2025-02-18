# 📢 Telegram Exam Reminder Bot

A **simple** Telegram bot that sends daily reminders for upcoming exams and provides interactive commands for users. The bot is written in **JavaScript** using the `node-telegram-bot-api` library and runs **automatically at 12 AM** every day.

## 🚀 Features

✅ **Daily Exam Reminder** – Sends a countdown message every day at **12 AM**.  
✅ **Interactive Commands** – Users can interact with the bot using commands.  
✅ **Modular Code** – Commands are managed separately in `commands.js` for better readability.  
✅ **Free Hosting Support** – Can be hosted for free on platforms like **Railway, Render, or Replit**.  
✅ **Cross-Platform Execution** – Can run on **PC, laptop, or even a mobile phone** using Termux or online Node.js environments.

---

## 📜 Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Commands](#commands)
- [Hosting Options](#hosting-options)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## 🔧 Installation

1. **Clone the repository:**  
   ```sh
   git clone https://github.com/pandit27/telegram_bot.git
   cd telegram-exam-reminder-bot
   ```

2. **Install dependencies:**  
   ```sh
   npm install
   ```

3. **Create a `.env` file** (optional, if using environment variables):
   ```env
   TOKEN = your_telegram_bot_token
   CHAT_ID = your_chat_id
   ```

---

## ⚙️ Configuration

1. **Get a Telegram Bot Token:**  
   - Open Telegram and search for `@BotFather`.
   - Use `/newbot` to create a bot and get a **BOT TOKEN**.
   
2. **Get the Chat ID:**  
   - Add `@getidsbot` to your group and get the **CHAT ID**.

3. **Modify `index.js` with your details:**  
   ```javascript
   const TOKEN = 'YOUR_BOT_TOKEN';
   const CHAT_ID = 'YOUR_CHAT_ID';
   ```

---

## ▶️ Usage

Run the bot locally using:
```sh
node bot.js
```

If you want to run it on **your phone**, use a Node.js runtime like:
- [Termux](https://f-droid.org/en/packages/com.termux/)
- [Replit](https://replit.com/)

---

## 📌 Commands

| Command  | Description |
|----------|-------------|
| `/start` | Start the bot and get a welcome message. |
| `/help`  | Get a list of available commands. |
| `/exam`  | Get the number of days left until the CUET PG exam. |
| `/nimcet`  | Get the number of days left until the NIMCET exam. |
| `/resources`  | Get the resources for NIMCET 2025. |

---

## 🌐 Hosting Options

✅ **Railway** - Free cloud hosting with auto-restarts.  
✅ **Render** - Deploy as a background worker.  
✅ **Replit** - Run online without a server.  
✅ **Termux** - Run locally on a mobile device.

---

## 🧑‍💻 Updates (version 1.01)

🔹 "/days" & "/resources" commands can only be used in private chats. <br>
🔹 Data of users interacting with this both will be stored.

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

💡 **Feel free to contribute, suggest new features, or report bugs!**

Thanks. 

Made by Piyush Jha with ❤️ & ☕.
