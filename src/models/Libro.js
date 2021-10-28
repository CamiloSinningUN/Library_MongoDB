const mongoose = require('mongoose');
const { Schema } = mongoose;

const AutorSchema = new Schema({
    titulo: { type: String, required: true }
}, {
    collection: 'libro',
    versionKey: false
});

module.exports = mongoose.model('libro', AutorSchema)