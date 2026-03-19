import { model, Schema , mongoose} from "mongoose"

const employeeSchema = new Schema({
    firstName: {
        type: String
    }, 
    lastName: {
        type: String
    }, 
    salary: {
        type: String
    },
    DUI: {
        type: String
    },
    numberPhone: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    idBranch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branches"
    },
    isActive: {
        type: String
    },
},
{
 timestamps: true,
 strict: true
})

export default model("Employees", employeeSchema)