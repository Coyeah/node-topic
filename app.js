const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const common = require('./routes/common');
const session = require('./routes/session');

const app = express();

app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, './public')));

app.use(common);
app.use(session);

app.use(function (req, res) {
  res.type('text/html');
  res.status(404);
  res.render('404.html');
});

app.listen(3000, function () {
  console.log('App is running at : http://127.0.0.1:3000');
});
