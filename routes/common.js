// 通用 相关路由
const express = require('express');
const router = express.Router();

const Topic = require('../models/topic.js');

router.get('/', async function(req, res) {
  let topic = [];
  try {
    topic = await Topic.find({});
  } catch (e) {
    console.log(e);
  }

  let target = topic.map(value => {
    value.created_time = new Date(value.created_time).toLocaleString();
    return {
      id: value.id,
      title: value.title,
      created_time: new Date(value.created_time).toLocaleString(),
    };
  })

  res.render('index.html', {
    user: req.session.user,
    topic: target,
  });
});

router.get('/personal', async function (req, res) {
  let topic = [];
  if (req.session.user) {
    try {
      topic = await Topic.find({ sponsor: req.session.user.email });
    } catch (e) {
      console.log(e);
    }
  }

  let target = topic.map(value => {
    value.created_time = new Date(value.created_time).toLocaleString();
    return {
      id: value.id,
      title: value.title,
    };
  })

  res.render('personal.html', {
    user: req.session.user,
    topic: target,
  });
});

module.exports = router;
