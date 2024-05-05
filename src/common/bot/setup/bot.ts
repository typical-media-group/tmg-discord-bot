//     ╭───────────────────────────────────────────╮
//     │             Copyright (c)                 │
//     │           ────────────────                │
//     │  Typical Meida Group, All Rights Reserved │
//     ╰───────────────────────────────────────────╯

//------------------------------------------------------------//

import { ActivityType, Client } from 'discord.js';
import { applicationCommands } from '../handlers/applications';
import { prefixHandler } from '../handlers/user_inputs';
import { clear, clog, error, evnt } from '../../../utilities/components/logger';

//--------------------------------------------------------------------//

import dotenv from 'dotenv';
dotenv.config();

//--------------------------------------------------------------------//

async function setBotActivity(client: Client) {
    await client.user?.setActivity('/help', { type: ActivityType.Listening });
}

//--------------------------------------------------------------------//
// This module defines the behavior when the bot becomes ready to start interacting with Discord.

export default {
    name: 'ready',
    once: true, // This event should only trigger once after logging in.

    /**
     * Executes actions necessary when the Discord bot is ready.
     * 
     * @param {Client} client - The Discord client instance.
     */
    async execute(client: Client) {
        try {
            clear(); // Clear the console or any initial setup as required.

            if (client.user) {
                clog(`Ready! Logged in as ${client.user.tag}`);
            } else {
                throw new Error("Client user is undefined.");
            }

            await setBotActivity(client);
            applicationCommands();  
            await prefixHandler.loadCommands();
            prefixHandler.start(); 

        } catch (err) {
            error(`Ready Event: ${err.message || err}`);
        }
    },
};