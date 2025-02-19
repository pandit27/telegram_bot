# 📢 Telegram Exam Reminder Bot

A **simple** Telegram bot that sends daily reminders for upcoming exams and provides interactive commands for users. The bot is written in **JavaScript** using the `node-telegram-bot-api` library and runs **automatically at 05:30 AM** every day.

## 🚀 Features

- **Automated Reminders** – Sends a daily countdown message at **05:30 AM**.  
- **Interactive Commands** – Users can access various commands for exam updates and quizzes.  
- **Modular Architecture** – Command handling is separated in `commands.js` for maintainability.  
- **Multiple Hosting Options** – Compatible with **Railway, Render, Replit, and Termux**.  
- **Cross-Platform Execution** – Can run on **PC, laptop, or mobile** with Node.js support.

---

## 📜 Table of Contents
- [Telegram Exam Reminder Bot](#-telegram-exam-reminder-bot)
- [Features](#-features)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [▶️sage](#️-usage)
- [Commands](#-commands)
- [Hosting Options](#-hosting-options)
- [🧑Updates (version 2.01) - 19/02/2025](#-updates)
- [License](#-license)


---

## 🧑‍💻 Recent Updates (v2.1) – 19/02/2025

- `/days` & `/resources` commands restricted to private chats.  
- User interaction data is now stored.  
- Added pre-defined response handling using the `natural` package.  
- Introduced a random DSA quiz command.  
- Users can now select quiz subjects (MATH, REASONING, DSA).  
- Quiz stats tracking (attempts, time taken, correct answers).  
- Daily random Math quiz sent to the group at **06:30 PM**.

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

## 💻 Usage

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
| `/start` | Starts the bot and provides a welcome message. |
| `/help`  | Displays a list of available commands. |
| `/exam`  | Shows the number of days left until the CUET PG exam. |
| `/nimcet` | Displays the countdown for the NIMCET exam. |
| `/resources` | Provides study resources for NIMCET 2025. |
| `/quiz` | Generates a random NIMCET quiz. |

---

## 🌐 Hosting Options

✅ **Railway** - Free cloud hosting with auto-restarts.  
✅ **Render** - Deploy as a background worker.  
✅ **Replit** - Run online without a server.  
✅ **Termux** - Run locally on a mobile device.

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

💡 **Feel free to contribute, suggest new features, or report bugs!**

Thanks. 

Made by **Piyush Jha** with ❤️ & ☕.
