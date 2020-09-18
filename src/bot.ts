import { Client } from 'discord.js';

import { CommandsManager } from './managers/commands';
import { PluginsManager } from './managers/plugins';
import { BotConfig, BotPlugin } from './resources';

export class Bot {
    constructor(config: BotConfig = {}) {
        this.config = config;
        this.client = new Client();

        this.commandsManager = new CommandsManager();
        this.pluginsManager = new PluginsManager();

        this.client.on('ready', () => {
            // - Starts plugins.
            this.pluginsManager.forEach((plugin: BotPlugin) => {
                this.pluginsManager.start(plugin);
            });
        });
    }

    private config: BotConfig;
    private client: Client;

    private commandsManager: CommandsManager;
    private pluginsManager: PluginsManager;

    /**
     * registerPlugin
     * 
     * @param plugin BotPlugin to register
     */
    public registerPlugin(plugin: BotPlugin): Promise<void> {
        return this.pluginsManager.init(plugin);
    }

    /**
     * connect
     * 
     * @param token Discord bot's token
     */
    public connect(token: string): Promise<string> {
        return this.client.login(token);
    }

    /**
     * disconnect
     */
    public disconnect() {
        this.pluginsManager.forEach((plugin: BotPlugin) => {
            this.pluginsManager.stop(plugin);
        });

        return this.client.destroy();
    }
}