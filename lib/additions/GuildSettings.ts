/*import { Snowflake } from "discord-api-types";
import { Client } from "discord.js";
import Cryptomat from "../Cryptomat";
import { guildSchema } from "../schemas/guildschema";


export default class GuildSettings {
    client: Cryptomat;
    id: Snowflake
    constructor(client: Cryptomat, id: Snowflake) {

    this.client = client;
    this.id = id;
    } 

    async init() {
        console.log("initilizing")
        console.log(this.client.database.db.connection.readyState)

        const d = await guildSchema.findOne({_id: this.id}).lean()
        console.log(`d: ${d}`)
        const data = await this.getData();
        console.log(data)
        if(!data) console.log('no data')
        else console.log(data)
    }
    async getData() {
        console.log("getting data")
        const data = this.client.database.getModel(this.id, "guild");
        return data;
    }
} */

