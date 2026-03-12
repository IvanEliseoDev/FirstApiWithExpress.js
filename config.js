import dotenv from "dotenv"

//Ejecutar la libreria dotenv
dotenv.config()

export const config = {
    db:{
        URI: process.env.DB_URI
    }
}