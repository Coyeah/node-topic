// 注册、登录、退出 相关路由
const express = require('express');
const router = express.Router();
const md5 = require('blueimp-md5');

const User = require('../models/user.js');

router.get('/login', function(req, res) {
  res.render('login.html');
});

router.post('/login', async function (req, res) {
  let body = req.body;
  body.password = md5(md5(body.password));

  try {
    if (await User.findOne({ email: body.email, password: body.password })) {
      req.session.user = await User.findOne({ email: body.email, password: body.password });

      return res.status(200).json({
        code: 200,
        err_code: 0,
        message: 'Ok',
      })
    }

    if (await User.findOne({ email: body.email })) {
      return res.status(200).json({
        code: 200,
        err_code: 2,
        message: 'Password is incorrect.',
      })
    }

    return res.status(200).json({
      code: 200,
      err_code: 1,
      message: 'Email is not registered.',
    })
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      code: 500,
      err_code: 500,
      message: 'Server Error.',
    })
  }
});

router.get('/register', function(req, res) {
  res.render('register.html');
});

router.post('/register', async function (req, res) {
  let body = req.body;
  body.password = md5(md5(body.password));

  try {
    if (await User.findOne({ email: body.email })) {
      return res.status(200).json({
        code: 200,
        err_code: 1,
        message: 'Email already exists.',
      })
    }

    if (await User.findOne({ nickname: body.nickname })) {
      return res.status(200).json({
        code: 200,
        err_code: 2,
        message: 'Nickname already exists.',
      })
    }

    await new User(body).save();

    res.status(200).json({
      code: 200,
      err_code: 0,
      message: 'Ok',
    })
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      code: 500,
      err_code: 500,
      message: 'Server Error.',
    })
  }
});

router.get('/logout', async function (req, res) {
  // 清除登录状态
  // req.session.user = null;
  delete req.session.user;
  // 重定向到登陆页
  res.redirect('/login');
})

module.exports = router;
