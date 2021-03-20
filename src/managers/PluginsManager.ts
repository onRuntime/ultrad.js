import { Collection } from "discord.js";
import { DiscordPlugin } from "..";

export class PluginsManager {
    private _plugins: Collection<string, DiscordPlugin>;

    constructor() {
        this._plugins = new Collection<string, DiscordPlugin>();
    }

    getPlugins(): Array<DiscordPlugin> {
        return this._plugins.array();
    }

    getPlugin(name: string): DiscordPlugin | undefined {
        return this._plugins.get(name);
    };

    register(plugin: DiscordPlugin): void {
        this._plugins.set(plugin.name, plugin);
    }
}