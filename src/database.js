const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/biblioteca')
    .then (db=>console.log('DB is connected'))
    .catch(err =>console.error(err));

