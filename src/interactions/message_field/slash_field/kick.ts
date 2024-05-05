import { SlashCommandBuilder } from "discord.js";

module.exports = {

    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("User to be kicked")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the kick")
                .setRequired(true)
        ),

    async execute(interaction) {

        const member = interaction.member;
        if (!member.permissions.has("KICK_MEMBERS") && !member.permissions.has("ADMINISTRATOR")) {
            return interaction.reply("You do not have permission to use this command.");
        }

        const kickedUser = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");

        try {
            const guild = interaction.guild;
            const kickedMember = await guild.members.fetch(kickedUser);
            
            if (kickedMember.roles.highest.position >= member.roles.highest.position) {
                return interaction.reply("You cannot kick a user with the same or higher role.");
            }

            const embed = {
                color: 0xff0000,
                title: "Kick",
                description: `You have been kicked for the following reason:\n${reason}`,
                footer: {
                    text: `Issued by ${interaction.user.username} on ${new Date().toLocaleString()}`
                }
            };

            try {
                await kickedMember.kick(reason);
                await kickedUser.send({ embeds: [embed] });
                return interaction.reply(`Successfully kicked ${kickedUser.username}. Reason:\n${reason}`);
            } catch (error) {
                if (error.code === 50013) {
                    return interaction.reply("I don't have the necessary permissions to kick that user.");
                }
                console.error(`Failed to kick user ${kickedUser.username}: ${error}`);
                return interaction.reply(`Failed to kick user ${kickedUser.username}. ${error}`);
            }
        } catch (error) {
            console.error(`Failed to fetch member: ${error}`);
            return interaction.reply(`Failed to fetch member. ${error}`);
        }
    },
};
