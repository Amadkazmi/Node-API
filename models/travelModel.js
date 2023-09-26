const mongoose = require('mongoose');

const travelSchema = mongoose.Schema(

{
   country:{
    type: String,
    required: [true, "please enter country name"]
   },
   
   title:{
    type: String,
    required: [true, "please enter title"]
   },
   link:{
    type: String,
    required: false,
   },
   Image:{
    type: String,
    required: false,
   },
   description:{
    type: String,
    required: false,
   }
},
{

  timestamps:true

}
)
const travel = mongoose.model('travel',travelSchema );

module.exports = travel;