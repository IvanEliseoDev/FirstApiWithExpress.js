import { cartModel } from "../../models/cartModel.js";
import productModel from "../../models/product.js";

export const cartController = {
  getAllCarts: async (req, res) => {
    try {
      const carts = await cartModel
        .find()
        .populate("customerId", "-password name email")
        .populate("products.productId", "name");
      if (!carts)
        return res
          .status(404)
          .json({ status: 404, message: "Carts not found" });
      return res
        .status(200)
        .json({ status: 200, message: "Carts find successfully", data: carts });
    } catch (error) {
      console.error("Error interno ", error);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  },
  getCartById: async (req, res) => {
    try {
      const cart = await cartModel
        .findById(req.params.id)
        .populate("customerId", "-password name email")
        .populate("products.productId", "name");
      if (!cart)
        return res
          .status(404)
          .json({ status: 404, message: "Cart not found", data: null });
      return res
        .status(200)
        .json({ status: 200, message: "cart find successfully", data: cart });
    } catch (error) {
      console.error("Error interno ", error);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  },
  insertCart: async (req, res) => {
    try {
      const { customerId, products } = req.body;

      if (!products || products.length === 0) {
        return res.status(400).json({ status: 400, message: "El carrito no puede estar vacío" });
      }

      // Extraer los IDs únicos
      const productIds = products.map((p) => p.product);

      //  Buscar todos de un solo golpe
      const productsFound = await productModel.find({
        _id: { $in: productIds },
      });

      // Mapear para acceso O(1)
      const productMap = productsFound.reduce((acc, prod) => {
        acc[prod._id.toString()] = prod;
        return acc;
      }, {});

      let total = 0;
      let newProducts = [];

      // 4. Procesar items
      for (let item of products) {
        const productData = productMap[item.product.toString()];

        if (!productData) {
          return res.status(404).json({
            status: 404,
            message: `Producto con ID ${item.product} no encontrado`,
          });
        }

        const quantity = item.quantity || 1;
        const subTotalCalculated = productData.price * quantity;
        total += subTotalCalculated;

        newProducts.push({
          productId: productData._id,
          quantity: quantity,
          subtotal: subTotalCalculated, 
        });
      }

      //Instanciar y guardar
      const newCart = new cartModel({
        customerId: customerId, 
        products: newProducts,
        total: total, 
      });

      await newCart.save();

      return res.status(201).json({
        status: 201,
        message: "Carrito creado con éxito",
        data: newCart,
      });
    } catch (error) {
      console.error("Error al insertar carrito:", error);
      return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  },
};
