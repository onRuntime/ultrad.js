import { BitFieldResolvable, Message, PermissionString } from "discord.js";

export interface Command {
    readonly name: string;
    readonly aliases: string[];

    options: {
        requiredPermissions?: BitFieldResolvable<PermissionString>,
        deleteAfter?: boolean
    }

    handle(message: Message): void;
}