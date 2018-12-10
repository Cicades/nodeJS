var express = require('express')
var router = express.Router()
var User = require('./model/user.js')
var md5 = require('blueimp-md5')

router.get('/', function (req, res, next) {
	if (!req.session.user) {
		return res.render('login.html')
	}
	res.render('index.html', { user: req.session.user })
})

router.get('/login', function(req, res, next) {
	res.render('login.html')
})

router.post('/login', function (req, res, next) {
	let formdata = req.body
	User.findOne({email:formdata.email}, function (erro, user) {
		if (!user || user.password !== md5(formdata.password)) {
			return res.json({
				errocode: 0,
				message: '邮箱或密码错误！'
			})
		}
		req.session.user = user
		return res.json({
			errocode: 1,
			message: '登录成功'
		})
	})
})

router.get('/register', function (req, res ,next) {
	res.render('register.html')
})

router.post('/register', function (req, res, next) {
	let formdata = req.body
	User.findOne({email: formdata.email}, function (erro, user) {
		if (erro) {
			return next(erro)
		}
		if (user) {
			return res.json({
				errocode: 0,
				message: '邮箱已被注册，请重试！'
			})
		}
		formdata.password = md5(formdata.password)
		new User(formdata).save(function (erro, user) {
			if (erro) {
				return next(erro)
			}
			req.session.user = user;
			res.json({
				errocode: 1,
				message: 'ok'
			})
		})
	})
})

router.get('/logout', function (req, res, next) {
	delete req.session.user
	res.redirect('/login')
})
module.exports = router