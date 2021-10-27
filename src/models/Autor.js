const mongoose = require('mongoose');
const { Schema } = mongoose;

const AutorSchema = new Schema({
    nombre: { type: String, required: true },
    apellido1: { type: String, required: true },
    apellido2: { type: String, required: true },
}, {
    collection: 'autor',
    versionKey: false
});

module.exports = mongoose.model('autor', AutorSchema)