
import branchesSchema from "../../models/brancheModel.js";

const branchesController = {};

branchesController.getBranches = async (req, response) => {
  const branches = await branchesSchema.find();
  response.json(branches);
};

branchesController.insertBranches = async(req, response) =>{
  const {name, address, schedule, isActive} = req.body;
  const newProduct = new branchesSchema({name, address, schedule, isActive})
  await newProduct.save()
  response.json({message: "Marca Guardado Exitosament"})
}

branchesController.updateBranches = async (req, response) => {
  const {name, address, schedule, isActive} = req.body
  await branchesSchema.findByIdAndUpdate(req.params.find, {
    name, address, schedule, isActive
  }, {new: true})
  response.json({message: "Marca Actualizada exitosamente"})
}

branchesController.deletBranches = async (req, response) => {
  await branchesSchema.findByIdAndDelete(req.params.find)
  response.json({message: "Marca Eliminada exitosamente"})
}

export default branchesController;