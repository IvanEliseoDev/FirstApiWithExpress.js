import express from "express"
import { loginCustomerController } from "../../controllers/customer/loginCustomerController.js"
export const loginCustomerRouter = express.Router()

loginCustomerRouter.route("/").post(loginCustomerController.login)