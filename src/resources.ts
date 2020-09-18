export interface BotConfig {}

export interface BotPlugin {
    init(): void;
    start(): void;
    restart(): void;
    stop(): void;
}