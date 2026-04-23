import { config } from "../../../config.js";
import { CustomerModel } from "../../models/customerModel.js";
import crypto from "crypto";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";
import { HTMLRecoveryEmail } from "../../utils/sendMailerRecovery.js";

export const recoveryPasswordController = [];
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
        const {codeRequest} = req.body
        if(!codeRequest || codeRequest.length <= 0 ) return res.status(403).json({message: "Bad Request - The codeRequest is Empty"})
        const token = req.cookie.recoveryCookie
        const decoded = jsonwebtoken.verify(token, config.jwt.secret)
        if(codeRequest != decoded.code)return res.status(400).json({message: "invalid code"})
        const newToken = jsonwebtoken.sign(
         {email: decoded.email, userType: "customer", verified: true},
         config.jwt.secret,
         {expiresIn: "15m"}
        )
        res.cookie("recoveryCookie", newToken, {maxAge: 15 *60 *1000})
        return res.status(200).json({message: "Verified Code successfully"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message: "Internal Server Error - Check Server Logs"})
    }
}
recoveryPasswordController.newPassword = async(req, res) => {
    try {
        const {newPassword, confirmNewPassword} = req.body
        if(newPassword !== confirmNewPassword) return res.status(400).json({message: "Password doesnt match"})
        const token = req.cookie.recoveryCookie
        const decoded = jsonwebtoken.verify(token, config.jwt.secret)
        if(!decoded.verified)return res.status(400).json({message: "Code not Verified"})
        const passwordHas = await bcrypt.hash(newPassword, 10)
        await CustomerModel.findOneAndUpdate(
            {email: decoded.emai},
            {password: passwordHas},
            {new: true}
        )
        res.clearCookie("recoverCookie")
        return res.status(200).json({message: "Password Updated"})
    } catch (error) {
         console.log(error)
        return res.status(500).json({message: "Internal Server Error - Check Server Logs"})
    }
}
