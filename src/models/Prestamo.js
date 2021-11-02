const mongoose = require('mongoose');
const { Schema } = mongoose;

const AutorSchema = new Schema({
    RUT: { type: Number, required: true },
    numero: { type: Number, required: true },
    ISBN: { type: Number, required: true },
    Fecha_Prestamo:{type: Date, required: true},
    Fecha_Devolucion:{type: Date, required: true}
    
}, {
    collection: 'prestamo',
    versionKey: false
});

module.exports = mongoose.model('prestamo', AutorSchema)