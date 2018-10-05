// 注册、登录、退出 相关路由
const express = require('express');
const router = express.Router();
const md5 = require('blueimp-md5');

const User = require('../models/user.js');

router.get('/login', function(req, res) {
  res.render('login.html');
});

router.post('/login', function (req, res) {
  console.log(req.body);
});

router.get('/register', function(req, res) {
  res.render('register.html');
});

router.post('/register', function(req, res) {
  var body = req.body;
  body.password = md5(md5(body.password));
  console.log(body);
  User.findOne({
    $or: [
      {
        email: body.email,
      }, {
        nickname: body.nickname,
      }
    ]
  }, function (err, data) {
    if (err) {
      return res.status(500).json({
        code: 500,
        err_code: 500,
        message: 'Server Error.',
      })
    }
    if (data) {
      return res.status(200).json({
        code: 200,
        err_code: 1,
        message: 'Email or Nickname already exists.',
      })
    }

    new User({
      ...body
    }).save(function (err, user) {
      if (err) {
        return res.status(500).json({
          code: 500,
          err_code: 500,
          message: 'Server Error.',
        })
      } else {
        // res.status(200).send(JSON.stringify({
        //   code: 200,
        //   status: 'ok',
        // }));
        // Express 提供一个响应方法：json
        // 自动把对象转成 JSON 格式发送
        res.status(200).json({
          code: 200,
          err_code: 0,
          message: 'Ok',
        });
      }
    });

  })
  // res.redirect('/login');
});

module.exports = router;
