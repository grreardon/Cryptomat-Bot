import { GuildMember, Message, User } from "discord.js";

import { Command } from "discord-akairo"
import CryptomatGuildMember from "@cryptomat/lib/extensions/GuildMember";
import CryptomatGuild from "@cryptomat/lib/extensions/Guild";

export default class KickCommand extends Command {
    constructor() {
        super('kick', {
           aliases: ['kick', 'k'],
           channel: "guild",
           args: [
            {
                id: 'member',
                type: 'member',
                default: null
            }, 
            {
                id: "reason",
                type: "string",
                match: "rest",
                default: "No reason provided."
            },
            {
                id: "nodm",
                match: "flag",
                flag: "--nodm",

            }
        ],
        clientPermissions: ['KICK_MEMBERS'],
        });
    }
 //@ts-ignore
 userPermissions(message: Message) {
    if(!message.member?.roles.cache.has((message.guild as CryptomatGuild).settings.modRole) && !message?.member?.permissions.has("ADMINISTRATOR")) return "Staff"
    else return null;
}
   async exec(message: Message, args: { member: CryptomatGuildMember ; reason?: string; nodm?: boolean}) {
        if(!args.member || args.member.id === message.guild?.me?.id) return message.util?.reply("Invalid User.");
        args.member.kickAndLog(args.reason, (message.member as CryptomatGuildMember), args.nodm?.valueOf())
        //@ts-ignore
        .then(value => message.channel.send(value))
        .catch((err) => message.channel.send(err))
   }
}
