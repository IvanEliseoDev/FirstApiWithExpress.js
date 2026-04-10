import { model, Schema } from "mongoose";

 const customerSchema = new Schema({

    name: {
        type: String
    },
    lastName: {
        type: String
    },
    birthDay: {
        type: Date
    },
    email:{
        type: String
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean
    },
    loginAttemps: {
        type: Number
    },
    timeOut: {
        type:String
    }
},
{
    timestamps: true
})

export const CustomerModel = model("Customer", customerSchema)
