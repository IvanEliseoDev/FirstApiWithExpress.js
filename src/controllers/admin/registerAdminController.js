import { adminModel } from "../../models/adminModel.js"
import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import {config} from "../../../config.js"

export const registerAdminController = {

    addAdmin: async(req, res) => {
        try {
            const adminReq = req.body
            const adminExist = await adminModel.findByOne({email: adminReq.email})
            if(adminExist) return res.status(400).json({status:400, message:"this admin has allredy exist", data: null})
            const passwordHash = bcrypt.hash(adminReq.password, 10)
            const verifyCode = crypto.randomBytes(3).toString("hex")
            const token = jwt.sign(
                {email:adminReq.email, code:verifyCode},
                config.jwt.secret,
                {expiresIn: "30min"}
            )
            res.cookie("VerifyCode", token)
            const tranporter = nodemailer.createTransport({service: "gmail", 
                auth:{
                    user: config.email.user,
                    pass: config.email.password
                }
            })
            const mailOptions = {
             from: config.email.user,
             to: adminReq.email,
             subject: "verificacion de tu cuenta",
             text: "Hola! "  + adminReq.name +" Para verificar tu cuenta, utiliza este codigo "+ verifyCode + " Expira en 15 Minutos"
            }
            tranporter.sendMail(mailOptions,(error, info) =>{
             if(error){
              console.log(error)
             }
            })
            const insertedAdmin = new adminModel(adminReq)
            insertedAdmin.password = passwordHash
            insertedAdmin.isVerified = false
            const adminSaved = await insertedAdmin.save()
            return res.status(201).json({status:201, message:"admin create has successfully", data:adminSaved})
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: 200, message: "Admins found has successfully", data: admins })
        }
    }
}








