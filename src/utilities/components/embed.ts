import { EmbedBuilder } from 'discord.js';

//------------------------------------------------------------//

/** Enum for custom color definitions used in embeds. */
enum CustomEmbedColor {
    Brand = 0x60A0FF,
    White = 0xFFFFFF,
    Red = 0xFF0000,
    Orange = 0xFF5500,
    Yellow = 0xFFFF00,
    Green = 0x00FF00,
    Blue = 0x0000FF,
    Indigo = 0x550088,
    Violet = 0xAA00FF,
    Magenta = 0xFF00FF,
}

/** Utility class for creating styled Embeds with predefined colors. */
export class CustomEmbed {
    static Color = CustomEmbedColor;

    /**
     * Creates an EmbedBuilder from Discord.js with preset color options.
     * @param options Embed options including optional color from the CustomEmbedColor.
     * @returns An instance of EmbedBuilder.
     */
    static from(
        options: Omit<EmbedBuilder['data'], 'color'> & {
            color?: CustomEmbedColor,
        } = {}
    ): EmbedBuilder {
        const embed = new EmbedBuilder(options);
        embed.setColor(options.color ?? this.Color.Brand);
        return embed;
    }

    /**
     * Adds a field to an existing EmbedBuilder.
     * @param embed The EmbedBuilder to add a field to.
     * @param name The name of the field.
     * @param value The value of the field, can be inline.
     * @param inline Whether the field is displayed inline. Defaults to false.
     */
    static addField(embed: EmbedBuilder, name: string, value: string, inline: boolean = false): EmbedBuilder {
        embed.addFields({ name, value, inline });
        return embed;
    }
}
