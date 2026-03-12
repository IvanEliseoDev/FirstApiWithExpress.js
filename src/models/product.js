import { model, Schema } from "mongoose"

const productsSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    stock:{
        type: Number
    }
},
{
 timestamps: true,
 strict: true
})

export default model("Products", productsSchema)