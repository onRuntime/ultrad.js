import { Message } from "discord.js";
import { DiscordBot } from "..";
import { CommandsManager } from "../managers";
import { Command, DiscordPlugin, ParsedCommand } from "../types";

export default class PluginsCommand implements Command {
    name: string = 'plugins';
    aliases: string[] = ['plugin', 'pl'];
    options = {
        deleteAfter: false
    };

    private readonly _bot: DiscordBot;

    constructor(bot: DiscordBot) {
        this._bot = bot;
    }

    async handle(message: Message, parsed: ParsedCommand): Promise<void> {
        const args: string[] = parsed.args;

        if(args[0] === 'restart') {
            if(args.length > 1 && this._bot.commandsManager.commands.has(args[1])) {
                const waitingMessage: Message = await message.channel.send(`[⌛] Restarting plugin \`${this.name}\`...`);
                
                const plugin: DiscordPlugin | undefined = this._bot.pluginsManager.getPlugin(args[1]);
                if(!plugin) return;

                let ok: boolean = await plugin.disable(this._bot);
                if(!ok) {
                    waitingMessage.edit('[❌] Error occured while stopping plugin.');
                    return;
                }
                ok = await plugin.enable(this._bot);
                if(!ok) {
                    waitingMessage.edit('[❌] Error occured while starting plugin.');
                    return;
                }

                waitingMessage.edit(`[✔️] \`${this.name}\` plugin has been restarted successfully !`);
            } else {
                message.channel.send(`:x: Error occured while handling **${this.name}** command.`);
            }
            return;
        }
        else if(args.length === 0 || args[0] === 'list') {}
    }
}