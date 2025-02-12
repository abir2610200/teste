const mongoose = require('mongoose');

// Define the schema for the User model
const livraisonSchema = new mongoose.Schema({
       code:String,

       expediteur:String,
       code_expediteur:String,
       nom_client:String,
       rsoc:String,
        description:String,
        numtel1:String,
        numtel2:String,

        gouvernorat:String,
        code_gouvernorat:String,
        
        code_rue:String,
        rue:String,
        km:String,
        prixliv:Number,
        qte:Number,
        montant:Number,
        
        dateliv:String,
        dateenleve:String,
        typeliv:String,
        tentatif:Number,
        
  
  // other fields as needed
},
{ timestamps: true }
);

// Create the UserModel based on the schema
module.exports = mongoose.model("livraison", livraisonSchema);
