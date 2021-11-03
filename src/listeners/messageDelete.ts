import CryptomatGuild from "@cryptomat/lib/extensions/Guild";
import { GuildMember, Message } from "discord.js";

const { Listener } = require('discord-akairo');

export default class messageDelete extends Listener {
    constructor() {
        super('messageDelete', {
            emitter: 'client',
            event: 'messageDelete'
        });
    }

    exec(message: Message) {
        const guild = message.guild as CryptomatGuild;

        guild.logMessage(1, "messageDelete", [message])
    }
}