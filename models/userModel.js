import mongoose from "mongoose";
import validator from "validator";
import JWT from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validator: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    location: {
        type: String,
        default: "INDIA"
    },
    appliedJobs: [
        { type: String, }
    ]
}, { timestamps: true })

userSchema.methods.createJWT = function () {
    return JWT.sign({
        userId: this._id
    }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

userSchema.methods.comparePassword = async function (password) {
    return password == this.password
}

export default mongoose.model('User', userSchema)

