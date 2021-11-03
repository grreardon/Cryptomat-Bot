import { ConnectOptions, Model, Mongoose, MongooseOptions, Schema } from "mongoose"
import { guildSchema } from "../schemas/guildschema"
import { muteSchema } from "../schemas/muteschema"
import Schemas from "../types/schema"

const schemas = {
    guilds: guildSchema,
    mutes: muteSchema
}

export default class Database {
    db: Mongoose
    constructor(options?: MongooseOptions, ) {
        this.db = new Mongoose(options)
    }

    async init(uri: string, options?: ConnectOptions) {
        this.db.connect(uri, options)
        .then(() => console.log("Logged into database."))
        .catch((err) => console.log(err));

        for(let x in schemas) {
            //@ts-ignore
             const model = schemas[x];
             this.db.model(x, model, x)
        }
    }


    async updateValue(id: string, value: any, schema: Schemas) {
        try {
        await this.db.models[schema].updateOne({
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
        return await this.db.models[schema].find({_id: id}).lean()
    }

    async getSchema(schema: Schemas) {
        return await this.db.models[schema].find().lean()
    }


}
