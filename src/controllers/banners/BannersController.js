import { v2 } from "cloudinary"
import { bannerModel } from "../../models/bannerModel.js"

export const BannersController = {
    getBanner: async(req, res) => {
        try {
            const banners = await bannerModel.find()
            if(!banners) return res.status(404).json({status: 404, message: "No se encontro ningun Banner", data:null})
            return res.status(200).json({status: 200, message: "Banners Encontrados exitosamente", data:banners})
        } catch (error) {
            console.log(error)
            return res.status(500).json({status: 500, message: "Error interno del servidor - revisar logs", data:null})
        }
    },
    insertBanner: async(req,res) => {
        try {
            const reqBanner = req.body
            const title = reqBanner.title
            const subTitle = reqBanner.subTitle
            if(!reqBanner) return res.status(400).json({status:400, message: "Bad Request hay campos nulos", data: null})
            const newBanner = new bannerModel({title, subTitle, image: req.file.path, public_id: req.file.filename})    
            await newBanner.save()  
            return res.status(201).json({status:201, message: "Banner registrado exitosamente", data: newBanner})
        } catch (error) {
            console.log(error)
            return res.status(500).json({status: 500, message: "Error interno del servidor - revisar logs", data:null})
        }
    },
    deleteBanner: async(req, res) => {
        try {
            const bannerExist = await bannerModel.findById(req.params.id)
            await v2.uploader.destroy(bannerExist.public_id)
            await bannerModel.findByIdAndDelete(req.params.id)
            return res.status(204).json({status:204, message: "Banner eliminado exitosamente", data: null})
        } catch (error) { 
            console.log(error)
            return res.status(500).json({status: 500, message: "Error interno del servidor - revisar logs", data:null})
        }
    },
    updateBanner: async(req, res) => {
        try {
            const {title, subtitle} = req.body
            const bannerExist = await bannerModel.findById(req.params.id)
            const updateBanner = {
                title,
                subtitle
            }
            if(req.file) {
                await v2.uploader.destroy(bannerExist.public_id)
                updateBanner.image = req.file.path,
                updateBanner.public_id = req.file.filename
            }
            const result = await bannerModel.findByIdAndUpdate(req.params.id, updateBanner, {new: true})
            return res.status(200).json({status:200, message: "Banner actualizado exitosamente", data: result})
        } catch (error) {
            console.log(error)
            return res.status(500).json({status: 500, message: "Error interno del servidor - revisar logs", data:null})
        }
    }
}