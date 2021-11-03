import { Message } from "discord.js";

const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
           aliases: ['ping'] 
        });
    }

    exec(message: Message) {
        //@ts-ignore
        console.log(message.guild.settings)
        return message.reply('Pong!');
    }
}

module.exports = PingCommand;