export const logoutCustomerController = []
logoutCustomerController.logout = (req, res) => {
    try{
        res.clearCookie("authCookie")
        return res.status(200).json({message: "Sesion Cerrada Exitosamente"})
    }catch(error){
        console.log(error)
        return res.status(500).json({message: "Internal Server Error - Check Server Logs"})
    }
}