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

    private readonly _pluginsManager: PluginsManager;
    private readonly _commandsManager: CommandsManager;

    readonly config: Config

    constructor(config: Config = DefaultConfig) {
        super();

        this._pluginsManager = new PluginsManager();
        this._commandsManager = new CommandsManager(this);
        this.config = config;

        this.on('ready', () => {
            this._pluginsManager.getPlugins().forEach((plugin: DiscordPlugin) => this.enablePlugin(plugin));
        });
    }

    registerPlugin(plugin: DiscordPlugin): void {
        this._pluginsManager.register(plugin);
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
        this._commandsManager.register(command);
    }
}