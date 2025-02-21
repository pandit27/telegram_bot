module.exports = (bot, CHAT_ID) => {
    const poll_qs = require('./poll_qs');
    const sendNimcetPoll = () => {
        const present = new Date();
        let hoursIST = present.getUTCHours() + 5; // convert UTC to IST
        let minutesIST = present.getUTCMinutes() + 30;

        if (minutesIST >= 60) {
            minutesIST -= 60;
            hoursIST += 1;
        }

        if (hoursIST === 21 && minutesIST === 0) {
            const poll = poll_qs[Math.floor(Math.random() * poll_qs.length)];

            bot.sendPoll(CHAT_ID, poll.question, poll.options, {
                is_anonymous: false,
                allows_multiple_answers: false
            });
        }
    };

    // run the function every minute to check if it's time for the poll
    setInterval(sendNimcetPoll, 60000); // 60000 ms = 1 min
}