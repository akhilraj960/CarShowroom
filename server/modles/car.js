const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    model: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    milage:Number,
    fueltype:String,
    cylinders:Number,
    power:Number,
    torque:Number,
    transmission:String,
    seatcapacity:Number,
    servicecost:Number,
    engine:String,
    airbag:String
});
  
module.exports = mongoose.model('Car', carSchema);

  
  
  