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

/* GET for hospital data(+ holiday, vaccine) */
router.get('/hospital', function(req, res, next) {
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        var query = "SELECT * FROM hospital ORDER BY Hno;\
                    SELECT * FROM dayoff ORDER BY Hno;\
                    SELECT H.Hno, P.Remains, V.Vno, V.Name\
                    FROM hospital H, possession P, vaccine V\
                    WHERE H.Hno=P.Hno AND P.Vno=V.Vno AND P.Remains > 0\
                    ORDER BY H.Hno;";
        connection.query(query, function(err, rows){
            if (err) throw err;
            res.send(rows);
            connection.release();
        }); 
    });
});

/* POST for reservertion */
router.post('/', function(req, res, next) {
    var mno = Number(req.body.Mno);
    var hno = Number(req.body.Hno);
    var date = req.body.Date;
    var time = Number((req.body.Time).split(':')[0]);
    var vacc = req.body.Vacc;
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Check if reservation with same hospital, date, time exist
        var query = "SELECT Hno FROM reservation WHERE Hno=? AND Date=? AND Time=?;"
        // Use DB connection
        connection.query(query, [hno, date, time], function(err, row){
            // reservation admit
            if (row[0] == undefined) {
                // Get Vno and Inoculation number
                var query = "SELECT Vno FROM vaccine WHERE Name=?;\
                            SELECT MAX(Inoculation) as max FROM reservation WHERE Mno=?;";
                connection.query(query, [vacc, mno], function(err, rows){
                    if (err) throw err;
                    var vno = rows[0][0].Vno;
                    var inoculation = Number(rows[1][0].max) + 1;
                    var sql = "INSERT INTO reservation values (?, ?, ?, ?, ?, ?);\
                                UPDATE possession SET Remains=Remains-1 WHERE Hno=? AND Vno=?";
                    connection.query(sql, [mno, hno, vno, date, time, inoculation, hno, vno], function(err, rows){
                        if (err) throw err;
                        res.json({
                            success: true,
                            message: '백신 접종 예약을 성공하였습니다.'
                        });
                    });
                });
            }
            // reservation denied
            else {
                res.json({
                    success: false,
                    message: '이미 예약된 시간입니다! 다른 시간을 선택해주세요.'
                });
            }
            connection.release();
        }); 
    });
});

module.exports = router;
