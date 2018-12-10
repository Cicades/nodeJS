/**
 * 封装student的相关操作
 */
var dbjson = './db.json'
var fs = require('fs')

/**
 * 查询所有学生
 * @param  {Function} callback 回调函数
 * @return {[type]}            [description]
 */
exports.findAllStudents = function(callback) {
    fs.readFile(dbjson, 'utf-8', function(erro, data) {
        if (erro) {
            return callback(erro)
        }
        callback(null, JSON.parse(data).students)
    })
}

/**
 * 添加学生
 * @param {Function} callback 回调函数
 * @param {array}   student  学生
 */
exports.addStudent = function(callback, student) {
    fs.readFile(dbjson, function(erro, data) {
        if (erro) {
            return callback(erro)
            console.log('读文件错误')
        }
        let students = JSON.parse(data.toString()).students
        student.gender = parseInt(student.gender)
        student.id = students[students.length - 1].id + 1
        students.push(student)
        fs.writeFile(dbjson, JSON.stringify({ students: students }), function(erro) {
            if (erro) {
                return callback(erro)
                console.log('写文件错误')
            }
            callback(null)
        })
    })
}

/**
 * 查询学生
 * @param  {[type]}   id       学生id
 * @param  {Function} callback 回调函数
 */
exports.findStudentById = function(id, callback) {
    fs.readFile(dbjson, function(erro, data) {
        if (erro) {
            return callback(erro)
        }
        let students = JSON.parse(data.toString()).students
        let editingStu = students.find(function(item) {
            return item.id === parseInt(id)
        })
        callback(null, editingStu)
    })
}

/**
 * 跟新学生数据
 * @param  {array}   student  学生数据
 * @param  {Function} callback 回调函数
 */
exports.updateStudent = function(student, callback) {
    fs.readFile(dbjson, 'utf-8', function(erro, data) {
        if (erro) {
            return callback(erro)
        }
        let students = JSON.parse(data).students
        student.id = parseInt(student.id)
        let index = students.findIndex(function(item) {
            return item.id === parseInt(student.id)
        })
        let updateStu = students[index]
        for (let key in updateStu) {
            updateStu[key] = student[key]
        }
        fs.writeFile(dbjson, JSON.stringify({ students: students }), function(erro) {
            if (erro) {
                return callback(erro)
            }
            callback(null)
        })
    })
}

exports.deleteStudent = function(id, callback) {
    fs.readFile(dbjson, 'utf-8', function(erro, data) {
        if (erro) {
            return callback(erro)
        }
        let students = JSON.parse(data).students
        let index = students.findIndex(function(item) {
            return item.id === parseInt(id)
        })
        students.splice(index, 1);
        fs.writeFile(dbjson, JSON.stringify({ students: students }), function(erro) {
            if (erro) {
                return callback(erro)
            }
            callback(null)
        })
    })
}