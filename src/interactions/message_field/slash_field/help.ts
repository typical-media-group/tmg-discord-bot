const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show commands and info.'),

    async execute(interaction) {
        try {
            // Get the current channel where the command was used
            const channel = interaction.channel;

            // Create the embed options
            const embed = {
                fields: [
                    {
                        name: `Help Center\n`,
                        value: ' ‎\nOur Help Center is a comprehensive resource dedicated to providing guidance and support for users. It offers detailed documentation to help you understand and utilize the bot\'s features effectively. Whether you need assistance with setup and command usage. \n',
                        inline: false
                    },
                    {
                        name: 'Utilities Commands',
                        value: '\`/giveaway\` \`<channel>\` \`<prize>\` \`<duration (minutes)>\` \`<date (DD/MM/YYYY)>\`\n\`/automod\` \`<message>\` \`<options (profanity | spam | nsfw)>\` \`<true | false>\`\n\`/suggestion\` \`<message>\` \`<option (channel)>\`\n\`/reroll\` \`<channel>\` \`<message_id>\`',
                        inline: false
                    },
                    {
                        name: 'Moderation Commands',
                        value: '\`/role\` \`<user>\` \`<role>\` \`<option (add | remove)>\`\n\`/ban\` \`<user>\` \`<reason>\` \`<duration>\`\n\`/kick\` \`<user>\` \`<reason>\`\n\`/warn\` \`<user>\` \`<reason>\`',
                        inline: false
                    },
                    {
                        name: 'Required Permissions',
                        value: '\`ban\` \`<BAN_MEMBERS>\` \`<ADMINISTRATOR>\`\n\`kick\` \`<KICK_MEMBERS>\` \`<ADMINISTRATOR>\`\n\`warn\` \`<KICK_MEMBERS>\` \`<ADMINISTRATOR>\`\n\`automod\` \`<ADMINISTRATOR>\`\n\`giveaway\` \`<ADMINISTRATOR>\`\n\`reroll\` \`<ADMINISTRATOR>\`'
                    },
                ],
                color: 0x6699FF, // Use hexadecimal value for the color
            };

            // Send the embed to the current channel
            await channel.send({ embeds: [embed] });

            // Send the reply acknowledging the command
            await interaction.reply({ content: 'Here is the help information.', ephemeral: true });
        } catch (error) {
            if (error.code === 10062) {
                await interaction.reply({ content: 'The interaction has expired or is no longer valid.', ephemeral: true });
            } else {
                console.error('An error occurred while executing the "help" command:', error);
                await interaction.reply({ content: 'An error occurred while executing the command. Please try again later.', ephemeral: true });
            }
        }
    },
};
