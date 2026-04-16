
import { config } from "../../../config.js";
import { CustomerModel } from "../../models/customerModel.js";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"

export const registerController = {};

registerController.registerCustomer = async (req, res) => {
  try {

    const {
      name,
      lastName,
      birthDay,
      email,
      password,
      isVerified,
      loginAttemps,
      timeOut,
    } = req.body;

    const existCustomer = await CustomerModel.findOne({email: email})
    if(existCustomer) return res.status(409).json({message: "Customer alredy Exist"}) 
    if (name.length < 3)
      return res.status(400).json({ message: "Bad Request - Name Invalid" });

    const passwordHashed  = await bcrypt.hash(password, 10)

    const verificationCode = crypto.randomBytes(3).toString("hex")

    const tokenCode = jsonwebtoken.sign(
        {email, verificationCode},
        config.jwt.secret,
        {expiresIn: "15m"}
    )

    res.cookie("VerificationToken", tokenCode, {maxAge: 15 * 60 * 1000})

    const tranporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.email.user,
            pass: config.email.password
        }
    })

    const mailOptions = {
        from: config.email.user,
        to: email,
        subject: "verificacion de tu cuenta",
        text: "Hola! "  + name +" Para verificar tu cuenta, utiliza este codigo "+ verificationCode + " Expira en 15 Minutos"
    }

    tranporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error)
        }
    }) 

    const customerRegister = await CustomerModel.create({
      name,
      lastName,
      birthDay,
      email,
      password: passwordHashed,
      isVerified,
      loginAttemps,
      timeOut,
    });

    return res.status(201).json({ message: "Employee Create Succesful", data: customerRegister} );
  } catch (error) {
    console.log(error);
  }
};

registerController.verifyCode = async(req, res) => {
    try{

        const {verificationCodeRequest} = req.body
        const token = req.cookies.VerificationToken

        const decoded = jsonwebtoken.verify(token, config.jwt.secret)
        const {email, verificationCode: storedCode} = decoded

        if(verificationCodeRequest !== storedCode) return res.status(400).json({message: "Invalid Code"})

        const customer = await CustomerModel.findOne({email})
        customer.isVerified = true
        await customer.save()    

        res.clearCookie("VerificationToken")

        res.json({message: "Email verified successfuly"})
    }catch(error){

        console.log(error)
        return res.status(500).json({message: "Internal Server Error - Check Server Logs"})
    }
}