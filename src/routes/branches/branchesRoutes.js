import express from "express";
import branchesController from "../../controllers/branches/branchesController.js";


const router = express.Router();

router.route("/")
    .get(branchesController.getBranches) 
    .post(branchesController.insertBranches);

router.route("/updateProduct/:idProduct")
    .put(branchesController.updateBranches);

router.route("/deleteProduct/:idProduct")
    .delete(branchesController.deletBranches);

export default router;