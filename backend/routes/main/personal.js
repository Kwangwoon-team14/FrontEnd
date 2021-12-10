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

/* GET for personal info */
router.get('/:mno', function(req, res, next) {
    var mno = req.params.mno;
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        var query = "SELECT Name, Sex, Phone, Email, Age, concat(City, ' ', Addr_details) as Address, Id, Pwd\
                    FROM member where Mno=?;";
        connection.query(query, [mno], function(err, row){
            if (err) throw err;
            res.send(row[0]);
            connection.release();
        }); 
    });
});

/* PATCH for reservation change */
router.patch('/:mno', function(req, res, next) {
    var mno = Number(req.params.mno);
    var phone = req.body.Phone;
    var email = req.body.Email;
    var age = Number(req.body.Age);
    var address = req.body.Address;
    var city = address.split(' ')[0];
    var addr_details = address.substring(city.length+1);
    var sex = req.body.Sex;
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        var query = "UPDATE member SET Sex=?, Phone=?, Email=?, Age=?, City=?, Addr_details=? WHERE Mno=?;";
        connection.query(query, [sex, phone, email, age, city, addr_details, mno], function(err, row){
            if (err) throw err;
            res.json({
                success: true,
                message: '변경되었습니다.'
            });
            connection.release();
        }); 
      });
});

module.exports = router;
