// File: prefix_commands/ping.js

module.exports = {
    name: "ping",
    execute(message, args) {
        message.reply("Pong!");
    },
};
