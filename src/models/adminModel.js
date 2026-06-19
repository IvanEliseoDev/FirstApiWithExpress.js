import {Schema, model} from "mongoose"

const adminSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type: String
    },
    isVerified:{
        type:String
    },
    loginAttemps:{
        type:String
    },
    timeOut:{
        type:String
    }
})

export const adminModel = model("admin", adminSchema)