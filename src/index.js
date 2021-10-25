const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

//Initiliazations
const app = express();
require('./database');

//settings
app.set ('port',process.env.PORT||3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs');

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

//Global variables

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/ALEC'));

//Static Files
app.use(express.static(path.join(__dirname,'public')));

//Server is listenning
app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'))
});
