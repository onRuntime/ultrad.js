//#region Bot

import { BitFieldResolvable, PermissionString } from "discord.js";

export interface BotConfig {}

//#endregion

//#region Plugins

export interface BotPlugin {
    init(): void;
    start(): void;
    restart(): void;
    stop(): void;
}

//#endregion

//#region Commands

export interface ICommand {
    command: string;
    handler: () => {};
    options: CommandOptions;

    handle(): void;
}

export interface CommandOptions {
    aliases?: string[];
    permissions?: BitFieldResolvable<PermissionString>;
    deleteMessage?: boolean;
}

//#endregion