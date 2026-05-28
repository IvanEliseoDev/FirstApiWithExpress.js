import express from "express";
import { cartController } from "../../controllers/cart/cartController";

export const cartRouter = express.Router()

cartRouter.route("/").get(cartController.getAllCarts)