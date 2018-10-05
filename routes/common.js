// 通用 相关路由
const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
  console.log(req.session.user);
  res.render('index.html', {
    user: req.session.user
  });
});

module.exports = router;
