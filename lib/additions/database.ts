import { ConnectOptions, Mongoose, MongooseOptions } from "mongoose"
import { guildSchema } from "../schemas/guildschema"
import Schemas from "../types/schema"

const schemas = {
    guild: guildSchema,

}
export default class Database {
    db: Mongoose
    constructor(options?: MongooseOptions, ) {
        this.db = new Mongoose(options)

    }

    async init(uri: string, options?: ConnectOptions) {
        this.db.connect(uri, options)
        .then(() => console.log("Logged into database."))
        .catch((err) => console.log(err))
    }

    async updateValue(id: string, value: any, schema: Schemas) {
        try {
        const schem = schemas[schema]

        await schem.updateOne({
            _id: id
        }, {
            $set: value
        },
        {
            upsert: true,
            new: true
        }
        )
        return false;
    } catch(err) {
        return err;
    }
    }

    async getModel(id: string, schema: Schemas) {
        console.log("heyo!")
        const data = await guildSchema.find({_id: id})
        console.log(`Data: ${data}`)
    }
}
