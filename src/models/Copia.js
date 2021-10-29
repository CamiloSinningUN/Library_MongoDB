const mongoose = require('mongoose');
const { Schema } = mongoose;

const AutorSchema = new Schema({
    ISBN: { type: Number, required: true },
    numero: { type: String, required: true }
}, {
    collection: 'copia',
    versionKey: false
});

module.exports = mongoose.model('copia', AutorSchema)