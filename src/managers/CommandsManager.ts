import { Collection, Message } from "discord.js";

import { Command, DiscordBot, ParsedCommand } from "..";

export class CommandsManager {
    private _commands: Collection<string, Command>;

    constructor(bot: DiscordBot) {
        this._commands = new Collection<string, Command>();

        bot.on('message', (message: Message) => {
            if(message.author.bot || !this._canBeParsed(bot.config.prefix, message.content)) return;

            const parsed = this.parse(bot.config.prefix, message);
            if(!parsed) return;

            if(!this._commands.has(parsed.command)) return message.reply('this command doesn\'t exists.');
            const command: any = this._commands.get(parsed.command);

            if(command.options) {
                if(command.options.deleteAfter &&
                    message.guild &&
                    message.guild.me &&
                    message.guild.me.hasPermission('MANAGE_MESSAGES')) message.delete();

                if(command.options.requiredPermissions &&
                    message.member &&
                    !message.member.hasPermission(command.options.requiredPermissions))
                    return message.reply('you don\'t have permission to do this.')
            }
            
            try {
                command.handle(message);
            } catch(error) {
                message.reply(error);
            }
        });
    }

    register(command: Command): void {
        this._commands.set(command.name, command);

        if(command.aliases)
            command.aliases.forEach((alias: string) => this._commands.set(alias, command));
    }

    private parse(prefix: string, message: Message): ParsedCommand | undefined {
        if(!this._canBeParsed(prefix, message.content)) return;

        let remaining = message.content.slice(prefix.length).trim();
        remaining = remaining.trim();

        const command = remaining.match(/^[^\s]+/i)?.[0];
        if(!command) return;
        remaining = remaining.slice(command.length).trim();

        return {
            prefix: prefix,
            command: command
        }
    }

    private _canBeParsed(prefix: string, message: string): boolean {
        if(!message ||
            !message.toLowerCase().startsWith(prefix)) return false;
        return true;
    }
}