import mongoose from "mongoose";

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected");
    } catch (error) {
        console.log(error);
    }
}

export default dbConnection;