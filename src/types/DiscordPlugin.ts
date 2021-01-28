import { DiscordBot } from "..";

export interface DiscordPlugin {
    name: string;

    enable(bot: DiscordBot): boolean;
    disable(bot: DiscordBot): boolean;
}