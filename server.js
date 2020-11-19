const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const nunjucks       = require('nunjucks');
const cookieParser = require('cookie-parser');

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    // TODO: Убрать noCache
    noCache: true
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const port = 8000;

// Все пути прописываются в этом файле
require('./app/routes')(app, {});

app.listen(port, () => {
    console.log('Сервер запущен на ' + port);
});