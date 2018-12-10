var http = require('http')

var server = http.createServer()
server.on('request', function (req, res) {
	let url = req.url;
	console.log('收到请求了，请求的路径是' + url)
	if (url === '/') {
		res.end(index page)
	}else if (url === '/hello') {
		res.end('hello node.js')
	} else {
		res.end('404 Not Found')
	}
})
server.listen(8080, function () {
	console.log('服务器启动成功了！')
})