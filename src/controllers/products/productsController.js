import productsSchema from "../../models/product.js";

const productsController = {};

productsController.getProducts = async (req, response) => {
  const products = await productsSchema.find();
  response.json(products);
};

productsController.insertProducts = async (req, response) => {
  const { name, description, price, stock } = req.body;
  const newProduct = new productsSchema({ name, description, price, stock });
  await newProduct.save();
  response.json({ message: "Producto Guardado Exitosament" });
};

productsController.updateProducts = async (req, response) => {
  const { name, description, price, stock } = req.body;
  await productsSchema.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      stock,
    },
    { new: true },
  );
  response.json({ message: "product updated" });
};

productsController.deletProduct = async (req, response) => {
  await productsSchema.findByIdAndDelete(req.params.id);
  response.json({ message: "product deleted" });
};

//Productos con stock bajo
productsController.getLowStock = async (req, res) => {
  try {
    const product = productsSchema.find({ stock: { $it: 5 } });
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res
      .status(200)
      .json({ message: "Productos menores a 5 encontrados", data: product });
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error - Check server logs"})
  }
};

productsController.getProductsByPriceRange = async(req, res) => {
  try {
    const {min, max} = req.body
    if(min == max) return res.status(400).json({message: "Error - max and min is equal"})
    const products = productsSchema.find({price: {$gte: min, $lte: max}})
    if(!products) return res.status(404).json({message: "Product not found"})
    return res.status(200).json({message: "Producto encontrado", data: products})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal server error - Check server logs"})
  }
}

export default productsController;
