import mongoose from 'mongoose';
require('dotenv').config();

const dbUrl:string = process.env.DB_URL || '';

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data:any) => {
            console.log(`Database connected with ${data.connection.host}`)
        })
    } catch (error:any) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;