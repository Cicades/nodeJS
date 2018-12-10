var fs = require('fs')
var template = require('art-template')
var url = require('url')
var pathname = ''
var template =require('art-template')
var comments = [{
	name: 'cicades',
	message: 'hello node.js',
	dateTime: '2018年12月2日 17：08'
}]
require('http')
	.createServer(function (req, res) {//实例化服务器对象并绑定request事件的简单写法
		pathname = url.parse(req.url).pathname
		if (pathname === '/') {//默认请求首页
			fs.readFile('./view/index.html', function (erro, data) {
				if (erro) {
					return res.end('404 Not Found')
				}
				let htmlSource = template.render(data.toString(), {comments: comments})
				res.end(htmlSource)
			})
		} else if (pathname.startsWith('/public/')) {
			fs.readFile('.' + pathname, function (erro, data) {
				if (erro) {
					return res.end('404 Not Found')
				}
				return res.end(data)
			})
		} else if (pathname === '/post') {
			fs.readFile('./view/post.html', function (erro, data) {
				if (erro) {
					return res.end('404 Not Found')
				}
				return res.end(data)
			})
		} else if (pathname === '/comments') {
			let data = url.parse(req.url, true).query
			data.dateTime = Date.now()
			comments.unshift(data)
			res.statusCode = 302  //将响应的状态码设为302 重定向
			res.setHeader('Location', '/')  //设置响应头中Location的内容，表明要重定向到哪里
			res.end()
		} else{
			return res.end('404Not Found')
		}
	})
	.listen('3000', function () {
		console.log('服务器启动成功，通过localhost：3000来访问！')
	})