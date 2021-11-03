import CryptomatGuild from "@cryptomat/lib/extensions/Guild";
import { GuildMember, Message, Collection, Snowflake } from "discord.js";

const { Listener } = require('discord-akairo');

export default class messageDeleteBulk extends Listener {
    constructor() {
        super('messageDeleteBulk', {
            emitter: 'client',
            event: 'messageDeleteBulk'
        });
    }

    exec(messages: Collection<Snowflake, Message>) {
        const firstMessage = messages.first() as Message;
        (firstMessage.guild as CryptomatGuild).logMessage(1, "messageDeleteBulk", [messages.size, firstMessage.channel])
    }
}