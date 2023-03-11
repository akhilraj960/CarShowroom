const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path:'config.env'})

const URI = process.env.URI;
mongoose.set('strictQuery', false);
async function connect() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connection established successfully');
  } catch (error) {
    console.log('An error occurred:', error);
  }
}

 
connect();

// vTThe3LGuG6xrLAs