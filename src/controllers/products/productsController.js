
import productsSchema from "../../models/product.js";

const productsController = {};

productsController.getProducts = async (req, response) => {
  const products = await productsSchema.find();
  response.json(products);
};

productsController.insertProducts = async(req, response) =>{
  const {name, description, price, stock} = req.body;
  const newProduct = new productsSchema({name, description, price, stock})
  await newProduct.save()
  response.json({message: "Producto Guardado Exitosament"})
}

productsController.updateProducts = async (req, response) => {
  const {name, description, price, stock} = req.body
  await productsSchema.findByIdAndUpdate(req.params.find, {
    name, description, price, stock
  }, {new: true})
  response.json({message: "product updated"})
}

productsController.deletProduct = async (req, response) => {
  await productsSchema.findByIdAndDelete(req.params.find)
  response.json({message: "product deleted"})
}

export default productsController;