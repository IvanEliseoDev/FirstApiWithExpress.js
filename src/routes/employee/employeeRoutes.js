import express from "express";
import employeeController from "../../controllers/employee/employeeController.js";


const router = express.Router();

router.route("/")
    .get(employeeController.getEmplloyees) 
    .post(employeeController.saveEmployee);

router.route("/:id")
    .get(employeeController.updateEmployees) 
    .post(employeeController.deleteEmployees);

export default router;