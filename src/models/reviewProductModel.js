import { Schema, mongoose } from "mongoose";

const reviewSchema = new Schema({
    rating:{
        type: Number
    },
    comment: {
        type: String
    },
    idEmployee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employeee"
    },
    idProducts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
},
{
 timestamps: true,
 strict: true
})

export default reviewSchema;