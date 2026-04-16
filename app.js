import express from "express"
import routerProduct from "./src/routes/products/productsRoutes.js";
import routerBranche from "./src/routes/branches/branchesRoutes.js";
import routerEmployee from "./src/routes/employee/employeeRoutes.js"
import routerReview from "./src/routes/reviews/reviewsRoutes.js"
import routerProvider from "./src/routes/provider/providerRoute.js"
import { routerCustomer } from "./src/routes/cutomer/customerRoutes.js";
import { registerCustomerRouter } from "./src/routes/cutomer/registerRoute.js";
import cookieParser from "cookie-parser";
import { loginCustomerRouter } from "./src/routes/cutomer/loginCustomerRoute.js";
import { logOutCustomerRouter } from "./src/routes/cutomer/logOutCustomerRoute.js";

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use("/api/v1/products",routerProduct)
app.use("/api/v1/branches",routerBranche)
app.use("/api/v1/employees",routerEmployee)
app.use("/api/v1/reviews",routerReview)
app.use("/api/v1/provider", routerProvider)
app.use("/api/v1/customer", routerCustomer )
app.use("/api/v1/registerCustomer", registerCustomerRouter)
app.use("/api/v1/customerLogin", loginCustomerRouter)
app.use("/api/v1/customerLogOut", logOutCustomerRouter)
export default app;

