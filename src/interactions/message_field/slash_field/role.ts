import { SlashCommandBuilder } from "discord.js";

module.exports = {

    data: new SlashCommandBuilder()
        .setName("role")
        .setDescription("Add or remove a role from a user")
        .addUserOption(option =>
            option.setName("user")
                .setDescription("User to add or remove the role")
                .setRequired(true)
        )

        .addRoleOption(option =>
            option.setName("role")
                .setDescription("Role to be added or removed")
                .setRequired(true)
        )
        
        .addStringOption(option =>
            option.setName("option")
                .setDescription("Whether to add or remove the role")
                .setRequired(true)
                .addChoices(
                    { name: "Add", value: "add" },
                    { name: "Remove", value: "remove" }
                )
        ),

    async execute(interaction) {

        if (!interaction.member.permissions.has("ADMINISTRATOR") && !interaction.member.permissions.has("KICK_MEMBERS")) {
            return interaction.reply("You do not have permission to use this command.");
        }

        const user = interaction.options.getUser("user");
        const role = interaction.options.getRole("role");
        const addRole = interaction.options.getString("option");

        if (!user) {
            return interaction.reply("User not found.");
        }

        if (!role) {
            return interaction.reply("Role not found.");
        }

        const member = interaction.guild.members.cache.get(user.id);

        if (addRole === "option") {
            if (!member.roles.cache.has(role.id)) {
                await member.roles.add(role);
                return interaction.reply(`Successfully added the role ${role.name} to ${user.username}.`);
            } else {
                return interaction.reply(`${user.username} already has the role ${role.name}.`);
            }
        } else if (addRole === "remove") {
            if (member.roles.cache.has(role.id)) {
                await member.roles.remove(role);
                return interaction.reply(`Successfully removed the role ${role.name} from ${user.username}.`);
            } else {
                return interaction.reply(`${user.username} does not have the role ${role.name}.`);
            }
        } else {
            return interaction.reply("Invalid value for 'add' argument. Please specify 'add' or 'remove'.");
        }
    },
};
