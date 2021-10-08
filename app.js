var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Middleware=require('./Middleware/middleware');
const db=require('./controller/connection');
var indexRouter = require('./routes/patientRoute');
var doctorRouter = require('./routes/doctorRoutes');
var staffRouter = require('./routes/hospitalStaffRoutes');
var adminRouter = require('./routes/adminRoute');
var loginRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
const middleware = require('./Middleware/middleware');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.sequelize.sync(); 
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.use('/patient',middleware.checkToken, indexRouter);
app.use('/doctor',middleware.checkToken, doctorRouter);
app.use('/staff',middleware.checkToken, staffRouter);
app.use('/admin', adminRouter);
app.use('/auth', loginRouter);
app.use('/users', usersRouter);

module.exports = app;
