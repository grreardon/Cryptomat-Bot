import { Snowflake } from "discord-api-types";

export interface guildSettings {
    modLogChannel: Snowflake,
    discordLogChannel: Snowflake,
    muteRole: Snowflake,
    modRole: Snowflake,
    generalChannel: Snowflake,
}