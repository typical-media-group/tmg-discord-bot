//     ╭───────────────────────────────────────────╮
//     │             Copyright (c)                 │
//     │           ────────────────                │
//     │  Typical Meida Group, All Rights Reserved │
//     ╰───────────────────────────────────────────╯

//------------------------------------------------------------//

import { Events, GuildMember } from 'discord.js';

//--------------------------------------------------------------------//

/**
 * Handles the event when a member leaves a guild.
 *
 * This module is responsible for executing actions when a member leaves the guild.
 * It listens to the `GuildMemberRemove` event from Discord.js, which is triggered whenever
 * a guild member leaves, gets kicked, or is banned from a guild.
 *
 * @module GuildMemberRemove
 */
export default {
    name: Events.GuildMemberRemove,  // Name of the event this handler will be listening to.
    once: false,  // This handler should not only run once; it runs every time the event occurs.
    
    /**
     * Executes actions when the GuildMemberRemove event is triggered.
     * 
     * @param {GuildMember} member - The member who has left the guild.
     */
    execute: async (member: GuildMember) => {
        try {
            console.log(`left ${member.id}`);  // Logs the ID of the member who left.
        } catch (e) {
            console.error(`Ready Event: ${e}`);  // Logs an error if something goes wrong.
        }
    },
};