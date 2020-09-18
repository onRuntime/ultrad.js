import { BotPlugin } from "../resources";

export class PluginsManager extends Array<BotPlugin> {
    
    public init(plugin: BotPlugin): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                plugin.init();
                this.push(plugin);

                resolve();
            } catch(err) {
                reject(err);
            }
        });
    }

    public start(plugin: BotPlugin): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                plugin.start();

                resolve();
            } catch(err) {
                reject(err);
            }
        });
    }

    public restart(plugin: BotPlugin): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                plugin.restart();

                resolve();
            } catch(err) {
                reject(err);
            }
        });
    }

    public stop(plugin: BotPlugin): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                plugin.stop();

                resolve();
            } catch(err) {
                reject(err);
            }
        });
    }
}