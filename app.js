import express from "express"
import routerProduct from "./src/routes/products/productsRoutes.js";

const app = express();

app.use(express.json())
app.use("api/v1/products",routerProduct)

export default app;

