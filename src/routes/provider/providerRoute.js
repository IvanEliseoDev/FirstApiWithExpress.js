import express from "express";
import providerController from "../../controllers/provider/providerController.js"

const router = express.Router()

router.route("/")
.get(providerController.getProvider)
.post(providerController.postProvider)

export default router