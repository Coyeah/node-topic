# Node 综合 Web 实践

## 1. 目录结构

```txt
┝ controllers
┝ models                数据模型目录
┝ public                公共静态资源目录
┝ routes                路由分类目录
┝ views                 存储视图目录
┝ app.js
┝ package.json          包描述文件
┝ package-lock.json     第三方包版本锁定文件
┕ README.md             项目说明文档
```

## 2. 模版引擎

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

## 4. 模型设计

## 5. 功能实现
