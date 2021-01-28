import { DiscordPlugin } from "..";

export class PluginsManager {
    private _plugins: Array<DiscordPlugin>;

    constructor() {
        this._plugins = new Array<DiscordPlugin>();
    }

    getPlugins(): Array<DiscordPlugin> {
        return this._plugins;
    }

    register(plugin: DiscordPlugin): void {
        this._plugins.push(plugin);
    }
}