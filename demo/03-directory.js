var http = require('http')
var fs = require('fs')
var artTemplate = require('art-template')
var server = http.createServer()
var www = '../www/'
server.on('request', function (req,res) {
	if (req.url === '/') {
		fs.readFile(www + 'index.html', function (erro, date) {
			if (erro) {
				fs.readdir(www, function (erro, files) {
					if (erro) {
						res.end('cannot find the directory named www!')
						return
					}
					fs.readFile('../template.html', function (erro, date) {
						if (erro) {
							console.log('404 NOT FOUND')
							return
						}
						let html = artTemplate.render(date.toString(), {
							files: files
						})
						res.end(html)
					})
				})
			}
		})
	}
})
server.listen('3000', function () {
	console.log('服务器启动成功，通过localhost:3000访问！')
})