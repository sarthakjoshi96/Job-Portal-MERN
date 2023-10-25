import mongoose  from "mongoose";

const connecDB = async () => {
    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongoDB ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`MONGO ERROR ${error}`)
    }
};

export default connecDB;
