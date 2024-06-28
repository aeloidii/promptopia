import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error("MONGODB_URI environment variable is not defined");
      }

    try {
        await mongoose.connect(uri, {
            dbName:"share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log('MongoDB is connected');
    } catch (error) {
        console.log(error);
    }
}