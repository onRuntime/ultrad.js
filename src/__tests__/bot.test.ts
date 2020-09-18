import { Bot } from '../bot';
import { BotPlugin } from '../resources';

test('Registering plugins', () => {
    const bot: Bot = new Bot();

    bot.registerPlugin(new TestPlugin());

    bot.connect('valid-token');
});

class TestPlugin implements BotPlugin {
    init(): void {
        throw new Error('Method not implemented.');
    }
    start(): void {
        throw new Error('Method not implemented.');
    }
    restart(): void {
        throw new Error('Method not implemented.');
    }
    stop(): void {
        throw new Error('Method not implemented.');
    }
}