import { SlashCommandBuilder } from "discord.js";

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName("suggestion")
        .setDescription("Submit a suggestion")
        .addStringOption(option =>
            option.setName("suggestion")
                .setDescription("Your suggestion")
                .setRequired(true)
        )

        .addChannelOption(option =>
            option.setName("channel")
                .setDescription("Channel to post the suggestion in")
                .setRequired(false)
        ),

    async execute(interaction) {
        const suggestion = interaction.options.getString("suggestion");
        const channel = interaction.options.getChannel("channel");

        const embed = {
            color: 0xffdd00,
            title: "Suggestion",
            description: suggestion,
            footer: {
                text: `Submitted by ${interaction.user.tag}`,
                icon_url: interaction.user.avatarURL()
            }
        };

        await (channel || interaction.channel).send({ embeds: [embed] });

        await interaction.reply({ content: `Your suggestion: "${suggestion}"`, ephemeral: true });
    },
};