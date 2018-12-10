var express = require('express')
var router = express.Router()
var student = require('./student.js')
//渲染首页
router.get('/students', function(req, res) {
    student.findAllStudents(function(erro, data) {
        if (erro) {
            res.status(500).send('server erro 500')
        }
        res.render('students.html', { students: data })
    })
})

//渲染添加学生页面
router.get('/students/new', function(req, res) {
    let id = req.query.id;
    if (id) {
        student.findStudentById(id, function(erro, data) {
            res.render('addStudent.html', { student: data })
        })
    } else {
        res.render('addStudent.html', { student: {} })
    }
})

//处理添加学生请求
router.post('/students/new', function(req, res) {
    let id = req.body.id
    if (id) {
        //更新数据
        student.updateStudent(req.body, function(erro) {
            if (erro) {
                res.status(500).send('server erro 500！')
            } else {
                res.redirect('/students')
            }
        })

    } else {
        //添加数据
        student.addStudent(function(erro) {
            if (erro) {
                return res.status(500).send('server erro')
            }
            res.redirect('/students')
        }, req.body)
    }
})


//处理删除请求
router.get('/students/delete', function(req, res) {
    student.deleteStudent(req.query.id, function(erro) {
        if (erro) {
            res.status(500).send('server erro 500！')
        }
        res.redirect('/students')
    })
})



module.exports = router