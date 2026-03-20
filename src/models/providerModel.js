import { model, Schema } from "mongoose"

const providerSchema = new Schema(
  {
    name: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    heigth: {
      type: Number,
    },
    DUI: {
      type: String,
    },
    Phono: {
      type: String,
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

export default model("provider", providerSchema)
