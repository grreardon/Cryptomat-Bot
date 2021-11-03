import { Schema, model } from "mongoose"

export const muteSchema = new Schema(
  {
    _id: { required: true, type: String },
  },
  {
    strict: true,
    versionKey: false,
  }
)



