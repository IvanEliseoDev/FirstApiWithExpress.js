import express from "express"
import { registerController } from "../../controllers/customer/registerController.js"


export const registerCustomerRouter = express.Router()

registerCustomerRouter.route("/").post(registerController.registerCustomer)
registerCustomerRouter.route("/verifyCodeEmail").post(registerController.verifyCode)