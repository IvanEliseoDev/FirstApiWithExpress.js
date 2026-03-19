
import { response } from "express";
import employeeSchema from "../../models/employeeModel.js"
import employeeModel from "../../models/employeeModel.js";

const employeeController = []

employeeController.getEmplloyees =  async(req, response) =>{
     const employee = await employeeSchema.find();
     response.json(employee);
}

employeeController.saveEmployee = async(req, response) => {
    const {firstName, lastName, salary, DUI, numberPhone, email, password, idBranch, isActive} = req.body;
      const newEmployee = new employeeSchema({firstName, lastName, salary, DUI, numberPhone, email, password, idBranch, isActive})
      await newEmployee.save()
      response.json({message: "Empleado Guardado Exitosament"})
} 

employeeController.updateEmployees = async(req,response) => {
    const {firstName, lastName, salary, DUI, numberPhone, email, password, idBranch, isActive} = req.body;
    await employeeModel.findByIdAndUpdate(req.params.id, {
        firstName,
        lastName, 
        salary, 
        DUI, 
        numberPhone, 
        email, 
        password, 
        idBranch, 
        isActive
    }, {
        new: true
    })
    response.json({message: "Employee updated"});
}

employeeController.deleteEmployees = async(req, response) => {
    await employeeModel.findByIdAndDelete(req.params.id)
    response.json({message: "employee deleted"})
}


export default employeeController;