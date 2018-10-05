// 通用 相关路由
const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
  res.render('index.html');
});

module.exports = router;
