var mongoose = require('mongoose')
// 连接数据库，不管students数据库在不在，不在则创立
mongoose.connect('mongodb://localhost/students', { useNewUrlParser: true })
var conn = mongoose.connection

//监听连接情况
conn.on('erro', console.error.bind(console, 'connection error:'))
conn.once('open', function () {
    console.log('successfully connect to mongodb/students')
})

//创建schema
var studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1], //枚举类型
        required: true //非空
    },
    hobbies: String
})
//schema 也可以添加方法，通过schema生成的文档实例会获得相关的方法，类似于为构造函数添加原型方法
//例如：下面为student实例添加introduce（）方法
studentSchema.methods.introduce = function () {
    let greeting = `I'm ${this.name}, ${this.age} years old, and I like ${this.hobbies}`
    console.log(greeting)
}

//创建集合, 'Student' => 集合名，实际创建时会将集合名全部小写，并实用复数，也就是 ‘students’
var Student = mongoose.model('Student', studentSchema)

//创建文档, 只有当文档创建时，集合才会生成，并且集合中会自动包含'_id',用作唯一标识
// var student = new Student({
//     name: 'hyf',
//     age: 20,
//     gender: 0,
//     hobbies: 'code,lol'
// })

// //保存到数据库
// student.save(function (erro, student) {
//     if(erro) return console.error(erro)
//     student.introduce()
// })

module.exports = Student