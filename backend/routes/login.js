var express = require('express');
var router = express.Router();

/* MySQL loading */
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '981223',
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
        var query = "SELECT Id, Pwd FROM MEMBER WHERE Id=?;";
        connection.query(query, [id], function(err, row){
            // id not exist
            if (err) 
                res.json({
                    success: false,
                    message: '존재하지 않는 아아디 입니다!'
                });
            // id exist
            else {
                // right password 
                if (row[0].Pwd == pwd) 
                    res.json({
                        success: true,
                        message: '로그인에 성공하였습니다'
                    });
                // wrong password
                else 
                    res.json({
                        success: false,
                        message: '비밀번호가 일치하지 않습니다!'
                    });
            }
            connection.release();
        }); 
    });
});

module.exports = router;
