import { Client } from 'discord.js';

import { 
    PluginsManager,
    CommandsManager,
    Config,
    DefaultConfig,
    DiscordPlugin,
    Command
} from '.';

export class DiscordBot extends Client {
    readonly pluginsManager: PluginsManager;
    readonly commandsManager: CommandsManager;

    readonly config: Config

    constructor(config: Config = DefaultConfig) {
        super();

        this.pluginsManager = new PluginsManager();
        this.commandsManager = new CommandsManager(this);
        this.config = config;

        this.on('ready', () => {
            this.pluginsManager.getPlugins().forEach((plugin: DiscordPlugin) => this.enablePlugin(plugin));
        });
    }

    registerPlugin(plugin: DiscordPlugin): void {
        this.pluginsManager.register(plugin);
    }

    enablePlugin(plugin: DiscordPlugin): Promise<DiscordPlugin> {
        return new Promise((resolve, reject) => {
            if(plugin.enable(this)) resolve(plugin);
            else reject();
        });
    }

    disablePlugin(plugin: DiscordPlugin): Promise<DiscordPlugin> {
        return new Promise((resolve, reject) => {
            if(plugin.disable(this)) resolve(plugin);
            else reject();
        });
    }

    registerCommand(command: Command): void {
        this.commandsManager.register(command);
    }
}