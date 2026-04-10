import express from "express"
import { customerController } from "../../controllers/customer/customerController.js"

export const routerCustomer = express.Router()

routerCustomer.route("/")
.get(customerController.getCustomer)

routerCustomer.route("/:id")
.put(customerController.updateCustomer)
.delete(customerController.deleteCustomer)
