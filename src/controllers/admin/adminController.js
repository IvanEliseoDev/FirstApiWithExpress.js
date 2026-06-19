import { adminModel } from "../../models/adminModel.js"

export const adminController = {

    getAllAdmins: async (req, res) => {
        try {
            const admins = adminModel.find()
            if (!admins) return res.status(404).json({ status: 404, message: "admins not found", data: null })
            return res.status(200).json({ status: 200, message: "Admins found has successfully", data: admins })
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: 200, message: "Admins found has successfully", data: admins })
        }

    }
}