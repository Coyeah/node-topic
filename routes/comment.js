// 新建评论、删除删除、查看评论列表 相关路由
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Topic = require('../models/topic.js');
const Comment = require('../models/comment.js');

router.get('/comment/topic', async function (req, res) {
  let list = [];
  try {
    list = await Comment.find({ tid: req.query.tid});

    {
      let temp = [];
      for (let i = 0; i < list.length; i++) {
        user = await User.findOne({ email: list[i].reviewer });
        temp.push({
          id: list[i].id,
          content: list[i].content,
          reviewer: user ? user.nickname : null,
          created_time: new Date(list[i].created_time).toLocaleString(),
        })
      }
      list = temp;
    }

    return res.status(200).json({
      code: 200,
      err_code: 0,
      message: 'Ok',
      data: list,
    })
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      code: 500,
      err_code: 500,
      message: 'Server Error.',
      data: null,
    })
  }
});

router.get('/comment/user', async function (req, res) {
  let list = [];
  try {
    list = await Comment.find({ reviewer: req.session.user.email });

    {
      let temp = [];
      for (let i = 0; i < list.length; i++) {
        topic = await Topic.findOne({ id: list[i].tid });
        temp.push({
          id: list[i].id,
          content: list[i].content,
          created_time: new Date(list[i].created_time).toLocaleString(),
          topic_title: topic ? topic.title : null,
          topic_id: topic ? topic.id : null,
        });
      }
      list = temp;
    }

    return res.status(200).json({
      code: 200,
      err_code: 0,
      message: 'Ok',
      data: list,
    })
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      code: 500,
      err_code: 500,
      message: 'Server Error.',
      data: null,
    })
  }
});

router.post('/comment/add', async function (req, res) {
  if (req.session.user) {
    try {
      await new Comment({
        id: Date.now().toString(),
        ...req.body,
        reviewer: req.session.user.email,
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
  }
});

router.get('/comment/del', async function (req, res) {
  if (!req.session.user) {
    return res.redirect('/404');
  }

  try {
    await Comment.findOneAndDelete({ id: req.query.id, reviewer: req.session.user.email });
  } catch (e) {
    console.log(e);
  }
  res.redirect('/personal');
});

module.exports = router;
