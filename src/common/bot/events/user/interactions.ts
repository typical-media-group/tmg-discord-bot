//     ╭───────────────────────────────────────────╮
//     │             Copyright (c)                 │
//     │           ────────────────                │
//     │  Typical Meida Group, All Rights Reserved │
//     ╰───────────────────────────────────────────╯

//------------------------------------------------------------//

import { Collection, Interaction } from 'discord.js'
import path from 'path';
import fs from 'fs'
const { error } = require('../../../../utilities/components/logger');

//--------------------------------------------------------------------//

/**
 * Loads all slash commands from the disk into a Collection.
 * 
 * @returns {Collection} A collection of slash commands mapped by their names.
 */
function loadSlashCommands() {
    const commands = new Collection();
    const commandsPath = path.join(__dirname, '../../commands/slash_commands');
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        commands.set(command.data.name, command);
    }

    return commands;
}

//--------------------------------------------------------------------//

/**
 * Handles the execution of a slash command.
 * 
 * @param {Interaction} interaction - The interaction triggered by the user.
 * @param {Collection} commands - A collection of available slash commands.
 */
async function handleSlashCommand(interaction, commands) {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (e) {
        error(`InteractionCreate Event: ${e}`);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true,
        });
    }
}

//--------------------------------------------------------------------//

module.exports = {
    name: 'interactionCreate',
    
    /**
     * The main function to handle "interactionCreate" events in Discord.
     * This function initializes the commands and processes any received slash command interactions.
     * 
     * @param {Interaction} interaction - The interaction that triggered the event.
     */
    async execute(interaction) {
        const commands = loadSlashCommands();
        await handleSlashCommand(interaction, commands);
    },
};