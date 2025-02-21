**Personal Bot Features Documentation**

### **1. AI Chatbot**
- Command: `-ai <your message>`
- Uses Together API to generate AI-based responses.
- Returns AI-generated replies based on user queries.

### **2. Weather Information Retrieval**
- Command: `-weather <city>`
- Fetches real-time weather details using `wttr.in` API.
- Returns:
  - Condition
  - Temperature
  - Wind speed
  - Humidity
  - Pressure
  - Sunrise & Sunset times

### **3. Handwriting Generator**
- Command: `-handwriting <text>`
- Converts text into a handwritten-style document.
- Uses a handwriting generation API.
- Returns an image of the handwritten text.

### **4. Face Detection in Images**
- Command: Reply to an image with `-detect`.
- Works **only for the bot owner**.
- Uses `face-api.js` for facial detection.
- Loads models dynamically from a hosted URL.
- Processes images and detects faces.
- Returns the number of faces detected in the image.

### **5. Dictionary Lookup**
- Command: `-define <word>`
- Uses the Dictionary API to fetch word meanings.
- Returns:
  - Definitions
  - Pronunciations
  - Example usages (if available)

### **6. YouTube Video Downloader**
- Command: `-yt <YouTube URL>`
- Uses `play-dl` to download videos.
- Saves and sends the video file to the user.

### **7. Message Forwarding**
- Command: Reply to a message with `-fwd <chat_id>`
- Forwards the replied message to the specified chat ID.
- Only the bot owner can use this feature.

### **8. Message Sending to a Specific Chat**
- Command: `-send <chat_id> <message>`
- Sends a custom message to a specified chat ID.
- Useful for private message automation.

### **9. Remove bg of Images**
- Command: Reply to an image with `-removebg`.
- Works **only for the bot owner**.
- Uses `remove.bg` for bg removal.
- Returns the image with removed bg.

### **10. Solve Math Equations**
- Command: Reply to an image with `-math`.
- Works **only for the bot owner**.
- Uses `mathjs` & `nerdamer` to solve equations.
- Returns the calculated answer.

### **Security and Restrictions**
- Only the owner (defined via `OWNER_ID`) can use certain commands.
- Prevents unauthorized access and usage.

---

### **Future Enhancements (Planned)**
- More AI-based image processing features.
- Handwriting styles customization.
- Additional commands for user interaction.

More features coming soon...

---

Thanks

Made by **Piyush Jha** with ❤️ & ☕.