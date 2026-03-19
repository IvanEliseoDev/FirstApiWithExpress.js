import express from "express"
import routerProduct from "./src/routes/products/productsRoutes.js";
import routerBranche from "./src/routes/branches/branchesRoutes.js";
import routerEmployee from "./src/routes/employee/employeeRoutes.js"
import routerReview from "./src/routes/reviews/reviewsRoutes.js"

const app = express();

app.use(express.json())
app.use("/api/v1/products",routerProduct)
app.use("/api/v1/branches",routerBranche)
app.use("/api/v1/employees",routerEmployee)
app.use("/api/v1/reviews",routerReview)

export default app;

