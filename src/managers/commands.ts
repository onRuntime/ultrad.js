import { Client, Message } from "discord.js";
import { CommandOptions, ICommand } from "../resources";

export class CommandsManager extends Map<string, ICommand> {
    constructor(client: Client) {
        super();

        client.on('message', (message: Message) => {
            const command: ICommand | undefined = this.get(message.content);
            if(!command) return message.reply('this command isn\'t exists.');

            if(command.options.deleteMessage) message.delete();
            if(command.options.permissions && !message.member?.hasPermission(command.options.permissions))
                return message.reply('you don\'t have permission to do this.')
            command.handle();
        });
    }

    /**
     * on
     * 
     * @param command Command name
     * @param handler Command handler
     * @param options Command options
     */
    public on(command: string, handler: () => {}, options: CommandOptions= {}): this {
        const cmd = new Command(command, handler, options);

        this.set(command, cmd);
        return this;
    }

    /**
     * off
     * 
     * @param command Command name
     */
    public off(command: string): this {
        this.delete(command);
        return this;
    }
}

// tslint:disable-next-line: max-classes-per-file
class Command implements ICommand {
    constructor(command: string, handler: () => {}, options: CommandOptions) {
        this.command = command;
        this.handler = handler;
        this.options = options;
    }

    public command: string;
    public handler: () => {};
    public options: CommandOptions;

    public handle(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.handle();
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
}