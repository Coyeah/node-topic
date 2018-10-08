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
| /topic/detail | GET | id | 无 | 否 | 渲染话题详情页面 |
| /comment/topic | GET | tid | 无 | 否 | 处理评论根据话题获取请求 |
| /comment/user | GET | reviewer | 无 | 否 | 处理评论根据评论者获取请求 |
| /comment/add | POST | id、tid、reviewer、content | 无 | 是 | 处理评论添加请求 |
| /comment/del | GET | id | 无 | 是 | 处理评论删除请求 |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

## 4. 模型设计

#### topic（话题）

| 字段名 | 中文名 | 字段类型 | 备注 |
| --- | --- | --- | --- |
| id | 唯一标识 | String | 默认生成 |
| title | 题目 | String | 必填 |
| content | 内容 | String | 必填 |
| sponsor | 发布者 | String | 必填 |
| views | 浏览数 | Number | 默认0 |
| created_time | 创建时间 | Date | 默认当前 |
| last_modified_time | 最后修改时间 | Date | 默认当前 |

#### comment（评论）

| 字段名 | 中文名 | 字段类型 | 备注 |
| --- | --- | --- | --- |
| id | 唯一标识 | String | 默认生成 |
| tid | 话题唯一标识 | String | 必填 |
| reviewer | 评论者 | String | 必填 |
| content | 内容 | String | 必填 ||
| created_time | 创建时间 | Date | 默认当前 |
| last_modified_time | 最后修改时间 | Date | 默认当前 |

#### user（用户）

| 字段名 | 中文名 | 字段类型 | 备注 |
| --- | --- | --- | --- |
| email | 电子邮箱 | String | 必填 |
| nickname | 昵称 | String | 必填 |
| password | 密码 | String | 必填 |
| created_time | 创建时间 | Date | 默认当前 |
| last_modified_time | 最后修改时间 | Date | 默认当前 |
| avatar | 头像 | String | 默认路径 |
| bio | 自我介绍 | String | 默认空 |
| gender | 性别 | Number | -1：保密；0：男；1：女；默认-1 |
| birthday | 生日 | Date | 默认空 |
| status | 权限 | Number | 0：没有权限限制；1：不可以评论；2：不可以登录；默认0 |


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

**[部分，重点于思路]**

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
