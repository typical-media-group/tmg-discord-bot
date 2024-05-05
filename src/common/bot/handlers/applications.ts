//     ╭───────────────────────────────────────────╮
//     │             Copyright (c)                 │
//     │           ────────────────                │
//     │  Typical Meida Group, All Rights Reserved │
//     ╰───────────────────────────────────────────╯

//------------------------------------------------------------//

import { REST } from 'discord.js';
import { cmd, error, evnt } from '../../../utilities/components/logger';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs';
import path from 'path';

//--------------------------------------------------------------------//

import config from '../../../utilities/config/config';
const { token, clientId } = config;

//--------------------------------------------------------------------//

/**
 * Defines the structure of a command for the Discord bot.
 */
interface Command {
    name: string;           // Name of the command.
    description: string;    // Description of what the command does.
    options: any[];         // Options for the command. Define a more specific type based on your command structure.
}

/**
 * Manages the registration and updating of slash commands for the Discord bot.
 */
class SlashCommand {
    /**
     * Refreshes the global application commands in Discord by reading them from local files and pushing them to Discord.
     */
    async applicationCommands() {
        try {
            const commands: Command[] = [];
            const commandDir = path.join(process.cwd(), 'main', 'interactions', 'message_field', 'slash_field');
            const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                try {
                    const command = require(path.join(commandDir, file));
                    const data: Command = command.data.toJSON();
                    commands.push(data);
                } catch (err) {
                    error(`Failed to load command ${file}: ${err}`);
                }
            }

            const rest = new REST({ version: '10' }).setToken(token);

            evnt(`Started refreshing ${commands.length} global [/] slash_commands.`);

            await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands }
            );

            evnt('Successfully reloaded global [/] slash_commands.');

            commands.forEach((x) => {
                cmd(x.name);
            });
        } catch (err) {
            console.error(err);
            error(typeof err === 'string' ? err : (err.message ? err.message : 'An error occurred.'));
        }
    }
}

//--------------------------------------------------------------------//

export const { applicationCommands } = new SlashCommand();
