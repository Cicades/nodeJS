var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
var path = require('path')
var router = require('./router.js')
//配置中间件
//开放静态资源
app.use('/public', express.static(path.join(__dirname, './public/')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')))

//使用模板引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/')) // 默认就是 ./views 目录

//解析请求体
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//配置使用session
app.use(session({
  // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'itcast',
  resave: false,
  saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))

app.use(router)

//统一错误处理
app.use(function (erro, req, res, next) {
	return res.status(500).send('Server erro:' + erro.message)
})

app.use(function (req, res) {
	res.render('404.html')
})

app.listen(3000, function () {
	console.log('server is running...')
})