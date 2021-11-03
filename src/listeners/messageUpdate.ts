import CryptomatGuild from "@cryptomat/lib/extensions/Guild";
import { GuildMember, Message } from "discord.js";

const { Listener } = require('discord-akairo');

export default class messageUpdate extends Listener {
    constructor() {
        super('messageUpdate', {
            emitter: 'client',
            event: 'messageUpdate'
        });
    }

    exec(oldMessage: Message, newMessage: Message) {
        const guild = newMessage.guild as CryptomatGuild;

        guild.logMessage(1, "messageUpdate", [oldMessage, newMessage])
    }
}