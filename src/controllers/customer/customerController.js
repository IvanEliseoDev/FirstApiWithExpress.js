import { CustomerModel } from "../../models/customerModel.js";

export const customerController = {};

customerController.getCustomer = async (req, res) => {
  try {
    const customers = await CustomerModel.find();
    return res.json(customers);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

customerController.deleteCustomer = async (req, res) => {
  try {
    const deleteCustomer = await CustomerModel.findByIdAndDelete(req.params.id);

    if (!deleteCustomer) {
      return res.status(404).json({ message: "Customer Not Found" });
    }

    return res.status(200).json({ message: "Customer deleted succesfuly" });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal Server Error - Check Server Logs");
  }
};

customerController.updateCustomer = async (req, res) => {
  try {
    let {
      name,
      lastName,
      birthDay,
      email,
      password,
      isVerified,
      loginAttemps,
      timeOut,
    } = req.body;

    if (name.length < 3 || name.length > 15)
      return res.status(400).json({ message: "Bad Request - Name Invalid" });

    if (birthDay > new Date() || birthDay < new Date("1900-01-01"))
      return res
        .status(400)
        .json({ message: "Bad Request - BirthDay is Invalid - Is Not Old" });

    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        lastName,
        birthDay,
        email,
        password,
        isVerified,
        loginAttemps,
        timeOut,
      },
      { new: true },
    );

    if (!updatedCustomer)
      return res.status(404).json({ message: "Customer Not Found" });
  } catch (error) {
    console.log(error)
    return res.status(500).json("Internal Server Error - Check server logs")
  }
};
