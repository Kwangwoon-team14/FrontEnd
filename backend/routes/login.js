var express = require('express');
var router = express.Router();

/* MySQL loading */
var mysql = require('mysql');
var pool = mysql.createPool({
    // please change to your db info
    host: 'localhost',
    user: 'root',
    password: '981223',
    port: 3333,
    database: 'vaccine_reservation_system'
});

/* POST for Login */
router.post('/', function(req, res, next) {
    var id = req.body.id;
    var pwd = req.body.pwd;
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        var query = "SELECT Id, Pwd, Mno, Name FROM MEMBER WHERE Id=?;";
        connection.query(query, [id], function(err, row){
            if (err) throw err;
            // wrong id
            if (row[0] == undefined) 
                res.json({
                    success: false,
                    message: '존재하지 않는 아이디 입니다!'
                });
            // right id & password 
            else if (row[0].Pwd == pwd)
                res.json({
                    success: true,
                    message: '로그인에 성공하였습니다',
                    mno: row[0].Mno,
                    name: row[0].Name
                });
            // wrong password
            else 
                res.json({
                    success: false,
                    message: '비밀번호가 일치하지 않습니다!'
                });
            connection.release();
        }); 
    });
});

module.exports = router;
