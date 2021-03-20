import { GuildMember, Role, TextChannel } from "discord.js";

export interface ParsedCommand {
    prefix: string;
    command: string;
    content: string;
    args: string[];

    mentionnedMembers: GuildMember[];
    mentionnedRoles: Role[];
    mentionnedChannels: TextChannel[];
}