var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* connect routes file */
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var homeRouter = require('./routes/main/home');
var reservationRouter = require('./routes/main/reservation');
var checkRouter = require('./routes/main/check');
var personalRouter = require('./routes/main/personal');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* route url */
app.use('/', loginRouter);
app.use('/create', signupRouter);
app.use('/main/home', homeRouter);
app.use('/main/reservation', reservationRouter);
app.use('/main/check', checkRouter);
app.use('/main/personal', personalRouter);

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
