import { model, Schema } from "mongoose";


const bannerSchema = new Schema({
    title:{
        type: String
    },
    subTitle:{
        type: String
    },
    image:{
        type: String
    },
    public_id: {
        type: String
    }
},{
    timestamps: true
})

export const bannerModel = model("Banner", bannerSchema)