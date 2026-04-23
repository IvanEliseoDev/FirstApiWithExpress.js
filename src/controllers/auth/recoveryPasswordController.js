import { config } from "../../../config.js";
import { CustomerModel } from "../../models/customerModel.js";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import { error } from "console";
import nodemailer from "nodemailer";
import { HTMLRecoveryEmail } from "../../utils/sendMailerRecovery.js";

const recoveryPasswordController = [];
recoveryPasswordController.requestCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || email.length <= 0)
      return res
        .status(401)
        .json({ message: "Bad Request - Email is not Empty" });
    const userFound = await CustomerModel.findOne({ email });
    if (!userFound) return res.status(404).json({ message: "User Not Found" });
    const code = crypto.randomBytes(3).toString("hex");
    const token = jsonwebtoken.sign(
      { email, code, userType: "customer", verified: "true" },
      config.jwt.secret,
      { expiresIn: "15m" },
    );
    res.cookie("recoveryCookie", token, { maxAge: 15 * 60 * 1000 });
    const transporter = nodemailer.createTransport({
      service: "email",
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    });
    const mailOptions = {
      from: config.email.user,
      to: email,
      subject: "Correo de Recuperacion de contraseña",
      body: "use this code to recover un account",
      html: HTMLRecoveryEmail(code),
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error)
            return res.status(500).json({message: "Error al enviar el Correo"})
        }
        return res.status(200).json({message: "Correo enviado exitosamente"})
    });
  } catch (erorr) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error - Check Server Logs" });
  }
};
recoveryPasswordController.verifiedCode = async(req, res) => {
    try{

    }catch(error){
        
    }
}
