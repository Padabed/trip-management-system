var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');

const clientRouter = require('./routes/clientRoute')
const clientTripRouter =  require('./routes/clientTripRoute')
const tripRouter = require('./routes/tripRoute')
const clientApiRouter = require('./routes/api/ClientApiRoute')
const tripApiRouter = require('./routes/api/TripApiRoute')
const clientTripApiRouter = require('./routes/api/ClientTripApiRoute')
const authUtils = require('./util/authUtils')
const sequelizeInit = require('./config/sequelize/init')
sequelizeInit()
    .catch(err => {
        console.log(err)
    })

var app = express();

const session = require ('express-session')
app.use(session({
    secret: 'my_secret_password',
    resave: false
}))

const cors = require('cors');
app.use(cors());

const i18n = require('i18n');
i18n.configure({
    locales: ['pl', 'en'], // languages available in the application. Create a separate dictionary for each of them
    directory: path.join(__dirname, 'locales'), // path to the directory where the dictionaries are located
    objectNotation: true, // enables the use of nested keys in object notation
    cookie: 'acme-hr-lang', //the name of the cookie that our application will use to store information about the language currently selected by the user
});
app.use(i18n.init);
app.use(cookieParser('secret'));

app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser
    res.locals.loggedUser= loggedUser
    if (!res.locals.logginError) {
        res.locals.loginError = undefined
    }
    next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/clients', authUtils.permitAuthenticatedUser, clientRouter)
app.use('/cts', authUtils.permitAuthenticatedUser, clientTripRouter)
app.use('/trips', authUtils.permitAuthenticatedUser, tripRouter)
app.use('/', indexRouter);
app.use('/api/clients',clientApiRouter)
app.use('/api/trips', tripApiRouter)
app.use('/api/cts', clientTripApiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
