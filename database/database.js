import mongoose, { mongo }  from "mongoose";
import { config } from "../config.js";

//Connect es una orden, de que se conecte aca
mongoose.connect(config.db.URI);

//connection es la conexion en general
const connection = mongoose.connection;

connection.once("open", () =>{
    console.log("DB Is connected")})

connection.on("disconnected", () =>{
    console.log("DB is disconnected");
})

connection.on("error", (error) =>{
    console.log("error found: ", error)
})