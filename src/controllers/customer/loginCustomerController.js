import { config } from "../../../config.js";
import { CustomerModel } from "../../models/customerModel.js";
import bcrypt from "bcrypt"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"

const loginCustomerController = []
loginCustomerController.login = async(req, res)  =>{
    try{
        const {email, password} = req.body
        //Verificar
        const customerExist = await CustomerModel.findOne({email})
        if(!customerExist) return res.status(404).json({message: "Cliente No Encontrado"})
        if(customerExist.timeOut && customerExist.timeOut > Date.now()) return res.status(403).json({message: "Su cuenta esta bloqueada"})
        const isMatch = await bcrypt.compare(password, customerExist.password)
        if(!isMatch){
          //En caso se equivoque sumarle su intento fallido
          customerExist.loginAttemps = (customerExist.loginAttemps || 0 ) + 1
          if(customerExist.loginAttemps >= 5){
            customerExist.timeOut = Date.now() + 15 * 60 * 1000
            customerExist.loginAttemps = 0
            await customerExist.save()
            return res.status(403).json({message: "Tu cuenta a sido Bloqueada por exceder el limite de intentos"})
          }
          await customerExist.save()
          return res.tatus(401).json({message: "Contraseña Incorrecta"})
        }
        //SI escribe bien la contraseña se reiniciaran los intentos
        customerExist.loginAttemps = 0
        customerExist.timeOut = null
        await customerExist.save()
        const token = jsonwebtoken.sign(
            //Que vamos a guardar 
            {id: customerExist.id, userType: "Customer"},
            //Secret Key
            config.jwt.secret,
            //Cuando Expira
            {expiresIn: "30d"}
        )
        res.cookie("authCookie", token)
        //LIsto
        return res.status(200).json({message: "Inicio de Sesion Exitoso"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message: "Internal Server Error - Check Server Logs"})
    }
}
