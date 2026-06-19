import jwt from "jsonwebtoken"
import { config } from "../../../config.js"

export const validateAuthCookie = (allowedTypes = []) => {
    return(req, res, next) => {
        try {
            const {authCookie} = req.cookies
            if(!authCookie) return res.status(404).json({status:404, message:"No cookies found", data: null})
            const decoded = jwt.verify(authCookie, config.jwt.secret)
            if(!allowedTypes.includes(decoded.userType)) return res.status(401).json({tatus:401, message:"Access denied", data: null})
            next()
        } catch (error) {
            console.log(error)
            return res.status(500).json({status:500, message:"Error interno del servidor checar server logs", data:null})
        }
    }
}