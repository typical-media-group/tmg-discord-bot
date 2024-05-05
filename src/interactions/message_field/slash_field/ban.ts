import { SlashCommandBuilder } from "discord.js";

module.exports = {

    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("User to be banned")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the ban")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("duration")
                .setDescription("Duration of the ban in minutes (e.g., 60 for 1 hour)")
                .setRequired(false) // Make this option optional
        ),

    async execute(interaction) {

        const member = interaction.member;
        if (!member.permissions.has("BAN_MEMBERS") && !member.permissions.has("ADMINISTRATOR")) {
            return interaction.reply("You do not have permission to use this command.");
        }

        const bannedUser = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        const duration = interaction.options.getString("duration");

        const banManager = interaction.guild.bans;

        try {
            const banInfo = await banManager.fetch(bannedUser);
            if (banInfo) {
                return interaction.reply(`${bannedUser.username} is already banned.`);
            }
        } catch (error) {
            // User is not banned
            return interaction.reply(`${bannedUser.username} is not banned. ${error}`);
        }

        const embed = {
            color: 0xff0000,
            title: "Ban",
            description: `You have been banned for the following reason:\n\`\`\`${reason}\`\`\``,
            footer: {
                text: `Ban issued by ${interaction.user.username} on ${new Date().toLocaleString()}`
            }
        };

        try {
            const bannedMember = await interaction.guild.members.fetch(bannedUser);
            if (bannedMember) {
                if (await bannedUser.createDM()) {
                    try {
                        await bannedUser.send({ embeds: [embed] });
                    } catch (error) {
                        console.error(`Failed to send DM to user ${bannedUser.username}: ${error}`);
                        return interaction.reply(`Failed to send DM to user ${bannedUser.username}. ${error}`);
                    }
                }

                try {
                    await interaction.guild.members.ban(bannedMember, { reason: reason });
                } catch (error) {
                    console.error(`Failed to ban user ${bannedUser.username}: ${error}`);
                    return interaction.reply(`Failed to ban user ${bannedUser.username}. ${error}`);
                }

                if (duration) {
                    const durationMs = parseInt(duration) * 60000; // Convert duration from minutes to milliseconds
                    if (isNaN(durationMs)) {
                        return interaction.reply("Invalid ban duration.");
                    }

                    setTimeout(async () => {
                        try {
                            await interaction.guild.members.unban(bannedUser, "Ban duration expired");
                        } catch (error) {
                            console.error(`Failed to unban user ${bannedUser.username}: ${error}`);
                            return interaction.followUp(`Failed to unban user ${bannedUser.username}. ${error}`);
                        }
                    }, durationMs);
                }

                return interaction.reply(`Successfully banned ${bannedUser.username}.`);
            } else {
                return interaction.reply(`${bannedUser.username} is not a member of this guild. `);
            }
        } catch (error) {
            console.error(`Failed to fetch member: ${error}`);
            return interaction.reply(`Failed to fetch member. ${error}`);
        }
    },
};
