const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//BD
mongoose.connect('mongodb://localhost/crud-mongo', {
    useNewUrlParser: true
})
.then(db => console.log('BD conectado'))
.catch(err=>console.log(err));

//rutas
const indexRoutes =  require('./routes/index');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//rutas
app.use('/', indexRoutes);

//iniciando el servidor
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});