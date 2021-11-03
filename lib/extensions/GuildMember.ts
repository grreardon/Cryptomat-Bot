import { GuildMember } from "discord.js";
import { RawGuildMemberData } from "discord.js/typings/rawDataTypes";
import Cryptomat from "../Cryptomat";
import CryptomatGuild from "./Guild";

export default class CryptomatGuildMember extends GuildMember {
    constructor(client: Cryptomat, data: RawGuildMemberData, guild: CryptomatGuild) {
        super(client, data, guild);
    }

    async banAndLog(reason?: string, moderator?: this, noDM=false) {
        return new Promise(async (resolve, reject) => {
            if(!this.bannable) return reject("I am unable to ban this user!");
            if(moderator?.id === this.id) return reject("You can't ban yourself!")
            if(!this.isModeratable()) return reject("You can't ban someoneone who is a moderator!")

            if(!noDM) {
                const c = await this.createDM().catch(() => {});
                c?.send(`You have been banned from \`${this.guild.name}\` for **${reason || "no reason provided."}**`).catch(() => {})
            }
            try {
                await (this.guild as CryptomatGuild).logMessage(0, "memberBanned", [this, moderator, reason]);

                await this.ban({reason: reason || "No reason provided."});

                return resolve(`Sucesfully banned ${this}!`)
            } catch(err) {
                return reject("An unknown error occured!")
            }
        })
    };

    async kickAndLog(reason?: string, moderator?: this, noDM=false) {
        return new Promise(async (resolve, reject) => {
            if(!this.kickable) return reject("I am unable to kick this user!");
            if(moderator?.id === this.id) return reject("You can't kick yourself!")
            if(!this.isModeratable()) return reject("You can't kick someoneone who is a moderator!")

            if(!noDM) {
                const c = await this.createDM().catch(() => {});
                c?.send(`You have been kicked from \`${this.guild.name}\` for **${reason || "no reason provided."}**`).catch(() => {})
            }
            try {
                await (this.guild as CryptomatGuild).logMessage(0, "memberKicked", [this, moderator, reason]);

                await this.kick(reason || "No reason provided.");

                return resolve(`Sucesfully kicked ${this}!`)
            } catch(err) {
                return reject("An unknown error occured!")
            }
        })
    }
    isModeratable() {
        return !this.permissions.has("BAN_MEMBERS") && !this.roles.cache.has((this.guild as CryptomatGuild).settings.modRole)
    }
}