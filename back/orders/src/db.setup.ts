import mongoose from 'mongoose';

const mongoDBURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}`;
console.log(`Connecting...`);
mongoose.connect(mongoDBURI).then(() => {
    console.log("Connected to MongoDB ✨");
});

export default mongoose;
