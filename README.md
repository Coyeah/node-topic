# Node 综合 Web 实践

## 0. 准备

* node `v8.12.0`
* mongodb

## 1. 目录结构

```txt
┝ controllers
┝ models                数据模型目录
┝ public                公共静态资源目录
┝ routes                路由分类目录
┝ views                 存储视图目录
┝ app.js                项目的入口文件
┝ package.json          包描述文件
┝ package-lock.json     第三方包版本锁定文件
┕ README.md             项目说明文档
```

## 2. 模版引擎

[官网传送门](https://aui.github.io/art-template/zh-cn/docs)

[art-template 模板继承](https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E6%A8%A1%E6%9D%BF%E7%BB%A7%E6%89%BF)

[art-template 子模板](https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E5%AD%90%E6%A8%A1%E6%9D%BF)

## 3. 路由设计

| 路径 | 方法 | GET 参数 | POST 参数 | 是否需要权限 | 备注 |
| ---: | ---: | ---: | ---: | ---: | ---: |
| / | GET | 无 | 无 | 否 | 渲染首页 |
| /register | GET | 无 | 无 | 否 | 渲染注册页面 |
| /register | POST | 无 | email、nickname、password | 否 | 处理注册请求 |
| /login | GET | 无 | 无 | 否 | 渲染登录页面 |
| /login | POST | 无 | email、password | 否 | 处理登录请求 |
| /logout | GET | 无 | 无 | 是 | 处理退出请求 |
| /change | POST | 无 | nickname、bio、gender、avatar | 是 | 处理修改请求 |
| /topic/add | GET | 无 | 无 | 是 | 渲染话题添加页面 |
| /topic/add | POST | 无 | id、title、content、sponsor | 是 | 处理话题添加请求 |
| /topic/del | GET | id | 无 | 是 | 处理话题删除请求 |
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

## 4. 模型设计

## 5. 功能实现

* 用户模块
  * 登录
  * 注册
  * 退出
  * 修改
* 话题模块
  * 添加话题
  * 删除话题
  * 修改话题
  * 评论功能
    * 添加评论
    * 删除评论

## 6. 案例步骤

* 创建目录结构
* 整合静态页-模板页
* 设计用户登录、退出、注册的路由
* 用户注册
  * 处理客户端页面的内容（表单控件的name、手机表单数据、发起请求）
  * 服务端
    * 获取客户端表单请求数据
    * 操作数据库
    * 若报错，发送 500 到客户端
    * 根据业务发送不同的响应请求
* 用户登录
* 用户退出
