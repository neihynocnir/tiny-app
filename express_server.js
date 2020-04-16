const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session')
const logger = require('morgan');

const urlsRoutes = require('./routes/urls');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['401C76B6-3ABC-43A6-A7EF-0879D7D7565A', '5A3F8878-2551-4ADF-87CE-71D991B5DD17']
}));

// routes
app.use('/', urlsRoutes);
app.use('/', loginRoutes);
app.use('/', registerRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) =>  {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
