import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from 'discord-akairo';
import { config } from "@cryptomat/config/index"
import Database from './additions/database';
export default class Cryptomat extends AkairoClient {
    clearInterval: typeof clearInterval;
    clearTimeout: typeof clearTimeout;
    setInterval: typeof setInterval;
    setTimeout: typeof setTimeout;

    commandHandler: CommandHandler
    inhibitorHandler: InhibitorHandler
    listenerHandler: ListenerHandler

   database: Database
    constructor() {
        super({...config.akairo, ...config.discord});

        this.clearInterval = clearInterval;
        this.clearTimeout = clearTimeout;
        this.setInterval = setInterval;
        this.setTimeout = setTimeout;

        this.commandHandler = new CommandHandler(this, {
            directory: this.isDist ? "./dist/src/commands" : "./src/commands",
            prefix: process.env.PREFIX,
            aliasReplacement: /-/g,
            allowMention: true,
            handleEdits: true,
            commandUtil: true
        });
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: this.isDist ? "./dist/src/inhibitors" : "./src/inhibitors"
        });
        this.listenerHandler = new ListenerHandler(this, {
            directory: this.isDist ? "./dist/src/listeners" : "./src/listeners"
        });

        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.commandHandler.useListenerHandler(this.listenerHandler);

        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler
        });

        this.commandHandler.loadAll();
        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();

        this.database = new Database(config.mongoBaseOptions);

       //@ts-ignore @ts-ignore

     this.database.init(process.env.MONGO, config.mongoConnectOptions);
    }

    get isDist() {
            return __dirname.includes("/dist/") || __dirname.includes("\\dist\\");
    }
}
