import mongoose, { model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    customerId: {
      type: mongoose.Types.ObjectId,
      ref: "Customers",
    },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
        },
        subtotal: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const cartModel = model("cart", cartSchema);
