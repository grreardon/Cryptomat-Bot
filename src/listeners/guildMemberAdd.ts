import Cryptomat from "@cryptomat/lib/Cryptomat";
import CryptomatGuild from "@cryptomat/lib/extensions/Guild";
import { GuildMember } from "discord.js";

const { Listener } = require('discord-akairo');

export default class guildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    exec(member: GuildMember) {
        const guild = member.guild as CryptomatGuild;

        guild.logMessage(1, "guildMemberAdd", [member])
    }
}