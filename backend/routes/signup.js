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

/* POST for Sign up */
router.post('/', function(req, res, next) {
    var name = req.body.name;
    var gender = req.body.gender;
    var number = req.body.number;
    var email = req.body.email;
    var id = req.body.id;
    var passwd = req.body.passwd;
    var age = Number(req.body.age);
    var address = req.body.address;
    var City = address.split(' ')[0];
    var addr_details = address.substring(City.length+1);

    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        var query = "SELECT Id FROM member where ID = ?";
        connection.query(query, [id], function(err, row){
            // same id not exist
            if (row[0] == undefined) {
                var sql = "INSERT INTO member value (NULl, ?, ?, ?, ?, ? ,?, ?, ?, ?);";
                connection.query(sql, [name, gender, number, email, age, City, addr_details, id, passwd], function(err, row){
                    if (err) throw err;
                    connection.release();
                });
                res.json({
                    success: true,
                    message: '회원가입에 성공하였습니다.'
                });
            }
            // same id exist
            else 
                res.json({
                    success: false,
                    message: '동일한 아이디가 이미 존재합니다!'
                });
            connection.release();
        }); 
    });
});

module.exports = router;
