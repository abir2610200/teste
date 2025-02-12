const mongoose = require('mongoose');

// Define the schema for the User model
const rueSchema = new mongoose.Schema({
   
  name	 : String,
   
  
  // other fields as needed
},
{ timestamps: true }
);

// Create the UserModel based on the schema
module.exports = mongoose.model("Rues", rueSchema);


