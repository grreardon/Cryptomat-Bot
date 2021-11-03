import Cryptomat from "@cryptomat/lib/Cryptomat";
import CryptomatGuild from "@cryptomat/lib/extensions/Guild";
import { GuildMember } from "discord.js";

const { Listener } = require('discord-akairo');

export default class guildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    exec(member: GuildMember) {
        const guild = member.guild as CryptomatGuild;

        guild.logMessage(1, "guildMemberRemove", [member])
    }
}