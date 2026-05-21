import express from "express";
import { BannersController } from "../../controllers/banners/BannersController.js";

export const bannerRouter = express.Router()

bannerRouter.route("/").get(BannersController.getBanner)