const mongoose = require('mongoose');
const { Schema } = mongoose;

const AutorSchema = new Schema({
    ISBN: { type: Number, required: true },
    titulo: { type: String, required: true },
    año: { type: Number, required: true },
    idioma:{type: String, required: true}
}, {
    collection: 'edicion',
    versionKey: false
});

module.exports = mongoose.model('edicion', AutorSchema)