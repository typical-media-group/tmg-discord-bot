//     ╭───────────────────────────────────────────╮
//     │             Copyright (c)                 │
//     │           ────────────────                │
//     │  Typical Meida Group, All Rights Reserved │
//     ╰───────────────────────────────────────────╯

//------------------------------------------------------------//

import fs from 'fs';
import { evnt } from '../../../utilities/components/logger';
import dotenv from 'dotenv';
import path from 'path';

//--------------------------------------------------------------------//

dotenv.config(); // Load environment variables from .env file

//--------------------------------------------------------------------//

/**
 * Interface representing a command.
 */
interface Command {
    name: string;
    execute: (message: any, args: string[]) => void;
}

/**
 * Handles prefix-based commands for a Discord bot.
 */
class PrefixCommand {
    private prefix: string;
    private commands: Command[];

    /**
     * Constructs a new PrefixCommand handler.
     * @param {string} prefix The command prefix.
     */
    constructor(prefix: string) {
        this.prefix = prefix;
        this.commands = [];
    }

    /**
     * Loads command modules from the filesystem.
     */
    loadCommands() {
        const commandDir = path.join(process.cwd(), 'main', 'interactions', 'message_field', 'prefix_field');
        const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.join(commandDir, file));
            this.commands.push(command);
        }
    }

    /**
     * Processes a message and executes a command if matched with a known command name.
     * @param {any} message The message object from Discord.
     */
    handleCommand(message: any) {
        if (!message.content.startsWith(this.prefix)) return;

        const args = message.content.slice(this.prefix.length).trim().split(' ');
        const commandName = args.shift()?.toLowerCase();

        const command = this.commands.find(cmd => cmd.name === commandName);
        if (!command) {
            message.reply('Command not found.');
            return;
        }

        try {
            command.execute(message, args);
        } catch (error) {
            error(typeof error === 'string' ? error : (error.message ? error.message : 'An unknown error occurred.'));
            message.reply('An error occurred while executing the command.');
        }
    }
    
    /**
     * Starts the command listening process.
     */
    start() {
        evnt(`Starting command processing...`);
        // Add your bot event listener here to listen for messages

        evnt(`Commands are ready to be processed.`);
    }
}

//--------------------------------------------------------------------//

/**
 * A handler for processing commands with a specific prefix.
 */
export const prefixHandler = new PrefixCommand(process.env.PREFIX || '!');