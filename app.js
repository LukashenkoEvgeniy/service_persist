const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const app = express();
const config = require('./config/config');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');

app.use(logger('dev'));
const port = 8080;
app.use(bodyParser.json())

MongoClient.connect(config.DB_CONNECTION_URL, {useNewUrlParser: true}, (err, client) => {
    if (err) return console.log(err);
    require('./routes')(app, client);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

module.exports = app;

// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// app.use(cookieParser());