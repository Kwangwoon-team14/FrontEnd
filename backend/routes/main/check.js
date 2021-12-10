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
    database: 'vaccine_reservation_system',
    multipleStatements: true
});

/* GET for reservation record */
router.get('/:Mno', function(req, res, next) {
    var mno = req.params.Mno;
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        var query = "SELECT R.Hno, R.Vno, DATE_FORMAT(R.Date, '%Y-%m-%d') as Date, R.Time,\
                    R.Inoculation, H.Name as Hname, H.Phone, H.City, H.Gu, H.Dong, V.Name as Vname\
                    FROM reservation R, hospital H, vaccine V\
                    WHERE R.Hno=H.Hno AND R.Vno=V.Vno AND R.Mno=?\
                    ORDER BY R.Inoculation;";
        connection.query(query, [mno], function(err, rows){
            if (err) throw err;
            res.send(rows);
            connection.release();
        }); 
    });
});

/* DELETE for reservation cancellation */
router.delete('/:Mno/:Ino/:Hno/:Vno', function(req, res, next) {
    var mno = Number(req.params.Mno);
    var ino = Number(req.params.Ino);
    var hno = Number(req.params.Hno);
    var vno = Number(req.params.Vno);
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        var sql = "DELETE FROM reservation where Mno=? AND Inoculation=?;\
                    UPDATE possession SET Remains=Remains+1 WHERE Hno=? AND Vno=?;";
        connection.query(sql, [mno, ino, hno, vno], function(err, rows){
            if (err) throw err;
            res.json({
                success: true,
                message: '예약을 취소했습니다.'
            })
            connection.release();
        }); 
    });
});

module.exports = router;
