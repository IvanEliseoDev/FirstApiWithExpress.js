import dotenv from "dotenv"

//Ejecutar la libreria dotenv
dotenv.config()

export const config = {
    db:{
        URI: process.env.DB_URI
    },
    jwt:{
        secret: process.env.JWT_SECRET_KEY
    },
    email:{
        user: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD
    }
}