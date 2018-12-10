var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true})
var conn = mongoose.connection
conn.on('erro', console.error.bind(console, 'connect erro'))
conn.once('open', () => console.log('sucessfully connect to mongoDB!'))

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	nickname: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	created_time: {
		type: Date,
		default: Date.now //这给一个方法，而不是方法的调用
	},
	last_modified_time: {
		type: Date,
		default: Date.now
	},
	avatar: {
		type: String,
		default: '/public/img/avatar-default.png'
	},
	bio: {//简介
		type: String,
		default: ''
	},
	gender:{
		type: Number,
		enum: [-1, 0, 1],
		default: -1
	},
	status: {
		type: Number,
		enum: [0, 1, 2],
		default: 0
	}
})

var User = mongoose.model('User', userSchema)

module.exports = User