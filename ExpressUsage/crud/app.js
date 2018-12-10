var express = require('express')
var router = require('./router') //抽离路由配置模块
var bodyParser = require('body-parser') //express的一个中间件，用来解析post请求体中的数据
var app = express()
app.use('/node_modules/', express.static('../node_modules/'))//开放node——modules文件夹下的资源
app.use('/public/', express.static('./public/'))
app.engine('html', require('express-art-template')) //配置模板引擎
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//模板引擎的配置一定要在路由的挂载之前完成
app.use(router)
app.listen(3000, function () {
	console.log('server is running...')
})