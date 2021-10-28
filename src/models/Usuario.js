const mongoose = require('mongoose');
const { Schema } = mongoose;

const AutorSchema = new Schema({
    RUT: { type: Number, required: true },
    nombre: {type: String, required: true},
    apellido1: {type: String, required: true},
    apellido2:{type: String, required: true}
}, {
    collection: 'usuario',
    versionKey: false
});

module.exports = mongoose.model('usuario', AutorSchema)