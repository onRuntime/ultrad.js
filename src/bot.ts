import { Client } from 'discord.js';

import { CommandsManager } from './managers/commands';
import { PluginsManager } from './managers/plugins';

export class Bot {
    constructor(config: BotConfig = {}) {
        this.config = config;
        this.client = new Client();

        this.commandsManager = new CommandsManager();
        this.pluginsManager = new PluginsManager();
    }

    private config: BotConfig;
    private client: Client;

    public readonly commandsManager: CommandsManager;
    public readonly pluginsManager: PluginsManager;
}

export interface BotConfig {}