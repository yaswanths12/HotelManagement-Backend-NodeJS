const mongoose=require('mongoose');

//Define MongoDB connection URL 
const mongoURL=process.env.MONGODB_URL_LOCAL //uh can change the myselfdb according to the requirement

//set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewURLParser: true,
    useUnifiedTopology: true
})

//Get default connection
//Mongoose maintains a default connection object representing the MongoDB connection
const db=mongoose.connection;

//Define event listners for database connection

db.on('connected',()=>{
    console.log('connected to MongoDB server');
})


db.on('error',(err)=>{
    console.error('MongoDB connection error',err);
})


db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

//Export the database connection
module.exports=db;