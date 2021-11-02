const mongoose = require('mongoose');
const { Schema } = mongoose;

const AutorSchema = new Schema({
    nombre: { type: String, required: true },
    apellido1: { type: String, required: true },
    apellido2: { type: String, required: true },
    titulo: { type: String, required: true }
}, {
    collection: 'autorea',
    versionKey: false
});

module.exports = mongoose.model('autorea', AutorSchema)