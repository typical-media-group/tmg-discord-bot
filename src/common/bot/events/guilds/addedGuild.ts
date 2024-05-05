//     ╭───────────────────────────────────────────╮
//     │             Copyright (c)                 │
//     │           ────────────────                │
//     │  Typical Meida Group, All Rights Reserved │
//     ╰───────────────────────────────────────────╯

//------------------------------------------------------------//

import { Events, GuildMember } from 'discord.js';

//--------------------------------------------------------------------//

/**
 * Handles the event when a new member joins a guild.
 *
 * This module is responsible for executing actions when a new member joins the guild.
 * It listens to the `GuildMemberAdd` event from Discord.js, which is triggered whenever
 * a new member joins a guild.
 *
 * @module GuildMemberAdd
 */
export default {
    name: Events.GuildMemberAdd,  // Name of the event this handler will be listening to.
    once: false,  // Indicates that this handler should run each time the event occurs.

    /**
     * Executes actions when the GuildMemberAdd event is triggered.
     * 
     * @param {GuildMember} member - The member who has joined the guild.
     */
    execute: async (member: GuildMember) => {
        try {
            console.log(`join ${member.id}`);  // Logs the ID of the member who joined.
        } catch (e) {
            console.error(`GuildMemberAdd Event: ${e}`);  // Logs an error if something goes wrong during execution.
        }
    },
};