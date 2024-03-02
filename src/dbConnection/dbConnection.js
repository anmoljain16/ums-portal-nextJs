import mongoose from "mongoose";
import dotenv from "dotenv";


export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("connected to the database");
        });

        connection.on('error', (err) => {
            console.log("error connecting to the database. Error: ", err);
            process.exit();
        })
    }catch (e){
        console.log("something went wrong while connecting to the database. Error: ", e);
    }
}
