import { GuildMember, Message, User } from "discord.js";

import { Command } from "discord-akairo"
import Cryptomat from "@cryptomat/lib/Cryptomat";
import CryptomatGuild from "@cryptomat/lib/extensions/Guild";

export default class LockdownCommand extends Command {
    constructor() {
        super('lockdown', {
           aliases: ['lockdown', 'lock'],
           channel: "guild",
        clientPermissions: ['MANAGE_CHANNELS'],
        });
    }

    //@ts-ignore
    userPermissions(message: Message) {
        if(!message.member?.roles.cache.has((message.guild as CryptomatGuild).settings.modRole) && !message?.member?.permissions.has("ADMINISTRATOR")) return "Staff"
        else return null;
    }
   async exec(message: Message) {
    const lockedDown = !message.guild?.channels.cache.get((message.guild as CryptomatGuild).settings.generalChannel)?.permissionsFor(message.guildId as string)?.has("SEND_MESSAGES") ?? false; 
       const msg = await message.util?.send(`${lockedDown ? "Unl" : "L"}ocking the server...`);
       message.guild?.channels.cache.forEach(channel => {
           if(channel.manageable) {
               if(lockedDown) {
                channel.edit({permissionOverwrites: [{allow: "SEND_MESSAGES", id: message.guildId as string}]});
               } else {
                channel.edit({permissionOverwrites: [{deny: "SEND_MESSAGES", id: message.guildId as string}]});
               }
           }
       })
       msg?.edit(`Sucesfully ${lockedDown ? "un" : ""}locked the server. `)
    }
}