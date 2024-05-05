import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warn a player")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("User to be warned")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for the warning")
                .setRequired(true)
        ),

    async execute(interaction) {
        const embed2 = {
            color: 0xff0000,
            title: "Message failed",
            description: `You don't have \`Permission\` to use this command`,
            fields: [
                { name: 'Invalid Permission', value: 'Required Permission \`ADMINISTRATOR\`', inline: false },
            ],
        };

        if (!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.permissions.has("KICK_MEMBERS")) {
            return interaction.reply({ embeds: [embed2] });
        }

        const warnedUser = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");

        const member = interaction.guild.members.cache.get(warnedUser.id);

        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            const embed3 = {
                color: 0xff0000,
                title: "Unable to warn the user",
                description: "You can't warn a user with a higher or the same role as yourself.",
            };
            return interaction.reply({ embeds: [embed3] });
        }

        const embed = {
            color: 0xff0000,
            title: "You have been warned",
            description: `You have been warned by \`${interaction.user.username}\` for the following reason:\n\`${reason}\``,
            footer: {
                text: `Issued on ${new Date().toLocaleString()}`,
            },
        };

        try {
            await warnedUser.send({ embeds: [embed] });
        } catch (error) {
            console.error(`Failed to send DM to user \`${warnedUser.username}\`: \`${error}\``);
        }

        const embed4 = {
            color: 0xff0000,
            title: `Successfully warned \`${warnedUser.username}\``,
            description: `For the following reason:\n \`${reason}\``,
            footer: {
                text: `${new Date().toLocaleString()}`,
            },
        };

        return interaction.reply({ embeds: [embed4] });
    },
};
