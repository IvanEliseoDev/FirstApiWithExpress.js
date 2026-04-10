import providerModel from "../../models/providerModel.js";


export const providerController = {};
 
providerController.getProvider = async (req, res) => {
    try {
        const providers = await providerModel.find()
        return res.status(200).json(providers)
    } catch (error) {
        console.log("Provider GET Fail: ", {error})
        return res.status(500).json({message: "Internal server error"})
    }
}
 
providerController.postProvider = async (req, res) => {
    try {
        const {name, birthday, height, DUI, phone} = req.body
 
        //Validar
        name = name?.trim()
        height = height?.trim()
        DUI = DUI?.trim()
        phone = phone?.trim()
 
        //Campos obligatorios
        if(!name || !DUI || !phone){
            return res.status(400).json({message: "Field required"})
        }
 
        if(name.length < 3){
            return res.status(400).json({message: "name too short"})
        }
 
        if(DUI.length > 10 || DUI.length < 9){
            return res.status(400).json({message: "DUI not valid"})
        }
 
        if(birthday > new Date() || birthday < new Date("1908-01-01")){
            return res.status(400).json({message: "Invalid date"})
        }
 
        if (Number(height) > 270){
            return res.status(400).json({message: "Heigth too long"})
        }
 
        const newProvider = new providerModel({
            name,
            birthday,
            height,
            DUI,
            phone
        })
        await newProvider.save()
        return res.status(201).json({message: "Provider saved"});
 
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}
 

 
export default providerController
 