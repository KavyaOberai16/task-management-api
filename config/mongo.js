const mongoose = require('mongoose');

//mongodb connected
const connectMongo = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
};
module.exports = connectMongo;