const fs = require("fs");
const axios = require("axios");
const { createCanvas, Image } = require("canvas");
const faceapi = require("face-api.js");
const path = require("path");
const { Canvas, ImageData } = require("canvas");

const MODEL_URL = path.join(__dirname, "models");
const OWNER_ID = Number(process.env.OWNER_ID);

(async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
})();

module.exports = (bot) => {
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        if (chatId !== OWNER_ID) return;

        if (msg.reply_to_message && msg.reply_to_message.photo && msg.text === "-detect") {
            const photo = msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id;
            try {
                const fileUrl = await bot.getFileLink(photo);
                const fetch = (await import("node-fetch")).default;
                const response = await fetch(fileUrl);
                const buffer = await response.buffer();
                fs.writeFileSync("input.jpg", buffer);

                const img = await faceapi.bufferToImage(buffer);
                const canvas = createCanvas(img.width, img.height);
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);

                const detections = await faceapi.detectAllFaces(canvas);
                bot.sendMessage(chatId, `👥 Faces detected: ${detections.length}`);

                fs.unlinkSync("input.jpg"); // delete file after sending
            } catch (error) {
                bot.sendMessage(chatId, "❌ Could not process the image. Try again later.");
            }
        }
    });
};
