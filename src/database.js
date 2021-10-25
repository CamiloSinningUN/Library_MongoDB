const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/universidad')
    .then (db=>console.log('DB is connected'))
    .catch(err =>console.error(err));

