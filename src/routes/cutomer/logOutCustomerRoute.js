import express from "express"
import { logoutCustomerController } from "../../controllers/customer/logOutCustomerController.js"

export const logOutCustomerRouter = express.Router()
logOutCustomerRouter.route("/").post(logoutCustomerController.logout)