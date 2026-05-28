import express from "express";
import { cartController } from "../../controllers/cart/cartController.js";

export const cartRouter = express.Router()

cartRouter.route("/").get(cartController.getAllCarts).post(cartController.insertCart)

cartRouter.route("/:id").get(cartController.getCartById).delete(cartController.deleteCar)