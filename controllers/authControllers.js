import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {

    const { name, email, password } = req.body
    if (!name) {
        return res.status(400).send({ success: false, message: 'please provide name' })
    }
    if (!email) {
        return res.status(400).send({ success: false, message: 'please provide email' })
    }
    if (!password) {
        return res.status(400).send({ success: false, message: 'please provide password' })
    }

    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        return res.status(200).send({
            success: false,
            message: 'Email id found, please login!'
        })
    }

    const user = await userModel.create({ name, email, password });

    const token = user.createJWT();

    res.status(201).send({
        success: true,
        message: "User created successfully",
        user,
        token,
    })

};


export const loginController = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ success: false, message: 'please provide email and password' })
    }

    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).send({ success: false, message: 'email id not found' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        return res.status(400).send({ success: false, message: 'Invalid password' })
    }

    const token = user.createJWT()

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user,
        token,
    })
}
