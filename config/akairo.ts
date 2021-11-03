import { AkairoOptions } from "discord-akairo";
import { Snowflake } from "discord-api-types";

export const akairo: AkairoOptions = {
    ownerID: process.env.OWNER as Snowflake
}