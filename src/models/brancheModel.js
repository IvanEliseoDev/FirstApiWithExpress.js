import { model, Schema } from "mongoose"

const branchesSchema = new Schema({
    name: {
        type: String
    }, 
    address: {
        type: String
    }, 
    schedule: {
        type: String
    }, 
    isActive: {
        type: String
    },
},
{
 timestamps: true,
 strict: true
})

export default model("Branches", branchesSchema)