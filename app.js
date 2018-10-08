const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')


const commonRoute = require('./routes/common');
const sessionRoute = require('./routes/session');
const topicRoute = require('./routes/topic');
const commentRoute = require('./routes/comment');

const app = express();

app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, './public')));

// 在 Express 中，默认不支持 Session 和 Cookie
// 通过第三方中间件 express-session 解决
// 在配置路由之前配置
// 当插件配置好之后，可以通过 req.session 来访问和设置 Session 成员
// 默认 Session 数据是内存存储的，服务器重启就会丢失。生产环境下会把 Session 进行持久化存储。
// 添加 Session 数据：req.session.foo = 'bar';
// 访问 Session 数据：req.session.foo
app.use(session({
  secret: 'topic',          // 配置加密字符串，它会在原有加密基础上和这个字符串拼起来一同加密，增加安全性防止恶意伪造
  resave: false,            //
  saveUninitialized: true,  // 无论是否使用 Session，都默认直接分配一把钥匙
}))

app.use(commonRoute);
app.use(sessionRoute);
app.use(topicRoute);
app.use(commentRoute);

app.use(function (req, res) {
  res.type('text/html');
  res.status(404);
  res.render('404.html');
});

app.listen(3000, function () {
  console.log('App is running at : http://127.0.0.1:3000');
});
