const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EleveSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class', // This will reference the Class model created later
    required: false
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Parent', // Reference to the Parent model
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.models.Eleve || mongoose.model('Eleve', EleveSchema);
