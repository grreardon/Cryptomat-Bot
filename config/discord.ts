import { guildSettings } from "@cryptomat/lib/interfaces/guildSettings";
import { ClientOptions, Intents } from "discord.js";

export const discord: ClientOptions = {
    intents: 
    Intents.FLAGS.GUILDS |
    Intents.FLAGS.GUILD_MEMBERS |
    Intents.FLAGS.GUILD_BANS |
    Intents.FLAGS.GUILD_MESSAGES,
    presence: {
        status: "dnd",
        activities: [{name: "The Cryptomat", type: "WATCHING"}]
    }
}

export const guild: guildSettings = {
    modLogChannel: "904825693932765244",
    discordLogChannel : "904827489237479514",
    muteRole: "904825768251654194",
    modRole: "904877598646095874",
    generalChannel: "902715130456981518"
}
