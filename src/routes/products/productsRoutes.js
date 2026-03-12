import express from "express";
import productsController from "../../controllers/products/productsController.js";

const router = express.Router();

router.route("/").get(productsController.getProducts()).post(productsController.insertProducts())

router.route("/updateProduct:idProduct").put(productsController.updateProducts())

router.route("/deleteProduct:idProduct").delete(productsController.deletProduct())

export default router;