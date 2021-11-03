import { Schema, model } from "mongoose"

const schem = new Schema(
  {
    _id: { required: true, type: String },
  },
  {
    strict: true,
    versionKey: false,
  }
)

export const guildSchema = model("guilds", schem, "guilds");

