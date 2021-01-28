import { Emoji, GuildEmoji } from "discord.js";

export interface CommandArgs {
    content: string;
    emojis: Emoji | GuildEmoji;
}