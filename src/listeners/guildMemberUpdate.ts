import Cryptomat from "@cryptomat/lib/Cryptomat";
import CryptomatGuild from "@cryptomat/lib/extensions/Guild";
import { GuildMember } from "discord.js";

const { Listener } = require('discord-akairo');

export default class guildMemberUpdateListener extends Listener {
    constructor() {
        super('guildMemberUpdate', {
            emitter: 'client',
            event: 'guildMemberUpdate'
        });
    }

    exec(oldMember: GuildMember, newMember: GuildMember) {
        const guild = newMember.guild as CryptomatGuild;

        guild.logMessage(1, "guildMemberUpdate", [oldMember, newMember])
    }
}