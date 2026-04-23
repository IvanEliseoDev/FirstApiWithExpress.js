import express from "express"
import { recoveryPasswordController } from "../../controllers/auth/recoveryPasswordController.js"

export const recoveryPasswordRoute = express.Router()
recoveryPasswordRoute.route("/requestCode").post(recoveryPasswordController.requestCode)
recoveryPasswordRoute.route("/verifiedCode").post(recoveryPasswordController.verifiedCode)
recoveryPasswordRoute.route("/newPassword").put(recoveryPasswordController.newPassword)