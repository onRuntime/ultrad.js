import { Message } from "discord.js";

export interface ParsedCommand {
    prefix: string;
    command: string;
}