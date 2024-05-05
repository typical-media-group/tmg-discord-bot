//     ╭───────────────────────────────────────────╮
//     │             Copyright (c)                 │
//     │           ────────────────                │
//     │  Typical Meida Group, All Rights Reserved │
//     ╰───────────────────────────────────────────╯

//------------------------------------------------------------//

import path from 'path';
import fs from 'fs';
const { error } = require('../../../../utilities/components/logger');

//--------------------------------------------------------------------//
/**
 * Loads all prefix-based commands from the file system.
 *
 * This function reads all JavaScript files in the 'prefix_commands' directory and
 * requires them as modules. Each command module is expected to export an object
 * that contains at least a 'name' and an 'execute' function.
 *
 * @returns {Array<Object>} An array of command objects.
 */
function loadPrefixCommands() {
    const commandsPath = path.join(__dirname, "../../commands/prefix_commands");
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

    const commands = commandFiles.map((file) => {
        const filePath = path.join(commandsPath, file);
        return require(filePath);
    });

    return commands;
}

//--------------------------------------------------------------------//

module.exports = {
    name: "messageCreate",
    
    /**
     * Executes a command based on a message event in Discord.
     * 
     * This function checks if the message starts with a predefined prefix and is not
     * sent by a bot. If these conditions are met, it parses the message to extract
     * the command name and arguments, then searches for and executes the command.
     * 
     * @param {import('discord.js').Message} message - The message event that triggered this handler.
     */
    async execute(message) {
        if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

        const args = message.content.slice(process.env.PREFIX?.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const commands = loadPrefixCommands();

        for (const command of commands) {
            if (command.name === commandName) {
                try {
                    await command.execute(message, args);
                } catch (e) {
                    error("MessageCreate Event: " + e);
                    message.reply("There was an error while executing this command!");
                }
                break;
            }
        }
    },
};