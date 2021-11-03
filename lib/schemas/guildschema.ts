import { Schema, model } from "mongoose"

export const guildSchema = new Schema(
  {
    _id: { required: true, type: String },
  },
  {
    strict: true,
    versionKey: false,
  }
)