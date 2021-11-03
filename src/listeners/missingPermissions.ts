import { Command } from "discord-akairo";
import { Message } from "discord.js";

const { Listener } = require('discord-akairo');

export default class missingPermissionsListener extends Listener {
    constructor() {
        super('missingPermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }

    exec(message: Message, command: Command, type: String, missing: any) {
        message.util?.reply(`You are missing the ${missing} Permission / Role`)
    }
}