const { Discord } = require('discord.js');
import { SlashCommandBuilder } from "discord.js";

module.exports = {

    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Send an embed with titles and descriptions')
        .addStringOption(option =>
            option.setName('titles')
                .setDescription('Titles of the embed (comma-separated)')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('descriptions')
                .setDescription('Descriptions of the embed (comma-separated)')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Color of the embed (hex format, e.g., 0xff0000)')
                .setRequired(false) // Make the color option not required
        ),

    async execute(interaction) {
        const titles = interaction.options.getString('titles').split('||');
        const descriptions = interaction.options.getString('descriptions').split('||');
        const rawColor = interaction.options.getString('color');

        // Validate the color code
        let colorDecimal;

        if (rawColor) {
            const isValidColor = /^#?[0-9A-Fa-f]{6}$/.test(rawColor);

            if (!isValidColor) {
                return interaction.reply({ content: 'Invalid color code. Please provide a valid hexadecimal color code.', ephemeral: true });
            }

            // Convert hexadecimal color string to decimal number
            colorDecimal = parseInt(rawColor.replace(/^#/, ''), 16);
        } else {
            // If no color is provided, set a default color (e.g., white)
            colorDecimal = parseInt('FFFFFF', 16);
        }

        // Create an array of embeds
        const embeds = titles.map((title, index) => {
            return {
                color: colorDecimal,
                title: title.trim(),
                description: descriptions[index],
            };
        });

        await interaction.reply({ embeds: embeds });
    },
};
