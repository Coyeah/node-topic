// 新建话题、删除话题、修改话题、查看话题列表 相关路由
const express = require('express');
const router = express.Router();

const Topic = require('../models/topic.js');

router.get('/topic/add', function (req, res) {
    res.render('topic/topicAdd.html',{
      user: req.session.user
    });
});

router.post('/topic/add', async function (req, res) {
  if (req.session.user) {
    const body = req.body;
    try {
      if (await Topic.findOne({ title: body.title })) {
        return res.status(200).json({
          code: 200,
          err_code: 2,
          message: 'The topic already exists.',
        })
      }

      await new Topic({
        id: Date.now().toString(),
        title: body.title,
        content: body.content,
        sponsor: req.session.user.email,
      }).save();

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
  } else {
    return res.status(200).json({
      code: 200,
      err_code: 1,
      message: 'User is not logged in.',
    })
  }
});

router.get('/topic/del', async function (req, res) {
  if (!req.session.user) {
    return res.redirect('/404');
  }

  try {
    await Topic.findOneAndDelete({ id: req.query.id, sponsor: req.session.user.email });
  } catch (e) {
    console.log(e);
  }
  res.redirect('/personal');
});


module.exports = router;
