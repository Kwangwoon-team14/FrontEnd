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

/* GET for today reservation result */
router.get('/', function(req, res, next) {
    var query1 = "SELECT (SELECT count(*) FROM reservation\
                         WHERE Inoculation=1 AND Date<=date_format(now(), '%Y-%m-%d')) as TodayAccum1,\
                        (SELECT count(*) FROM reservation\
                         WHERE Inoculation=2 AND Date<=date_format(now(), '%Y-%m-%d')) as TodayAccum2,\
                        (SELECT count(*) FROM reservation\
                         WHERE Date<=date_format(now(), '%Y-%m-%d')) as TodayAccum,\
                        (SELECT count(*) FROM reservation\
                         WHERE Inoculation=1 AND Date=date_format(now(), '%Y-%m-%d')) as Today1,\
                        (SELECT count(*) FROM reservation\
                         WHERE Inoculation=2 AND Date=date_format(now(), '%Y-%m-%d')) as Today2,\
                        (SELECT count(*) FROM reservation\
                         WHERE Date=date_format(now(), '%Y-%m-%d')) as Today,\
                        (SELECT count(*) FROM reservation\
                         WHERE Inoculation=1 AND Date<date_format(now(), '%Y-%m-%d')) as YestAccum1,\
                        (SELECT count(*) FROM reservation\
                         WHERE Inoculation=2 AND Date<date_format(now(), '%Y-%m-%d')) as YestAccum2,\
                        (SELECT count(*) FROM reservation\
                         WHERE Date<date_format(now(), '%Y-%m-%d')) as YestAccum;";   
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        connection.query(query1, function(err, rows){
            if (err) throw err;
            res.send(rows);
            connection.release();
        }); 
    });
});

/* GET for reservation result per month */
router.get('/month', function(req, res, next) {
    var query2 = "SELECT (date_format(Date, '%Y-%m')) as month, count(*) as count\
                  FROM reservation group by month order by month;"
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        connection.query(query2, function(err, rows){
            if (err) throw err;
            res.send(rows);
            connection.release();
        }); 
    });
});

/* GET for reservation result per region */
router.get('/region', function(req, res, next) {
    var sql3 = "CREATE OR REPLACE VIEW region_count as\
                SELECT M.City, count(*) as people\
                FROM member M join reservation R on M.Mno=R.Mno\
                WHERE R.Date <= date_format(now(), '%Y-%m-%d')\
                group by M.City ORDER BY M.City;"; 
    var query3 = "SELECT * FROM region_count;";  
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        connection.query(sql3+query3, function(err, rows){
            if (err) throw err;
            res.send(rows);
            connection.release();
        }); 
    });
});

/* GET for reservation result age */
router.get('/age', function(req, res, next) {
    var sql4 = "CREATE OR REPLACE VIEW age_count as\
                SELECT (case when M.Age <= 19 then '10대이하'\
                        when M.Age between 20 and 29 then '20대'\
                        when M.Age between 30 and 39 then '30대'\
                        when M.Age between 40 and 49 then '40대'\
                        when M.Age between 50 and 59 then '50대'\
                        when M.Age between 60 and 69 then '60대'\
                        when M.Age >= 70 then '70대이상' END) as front_age, count(*) as people\
                FROM member M join reservation R on M.Mno=R.Mno\
                WHERE R.Date <= date_format(now(), '%Y-%m-%d')\
                GROUP BY front_age ORDER BY front_age;";      
    var query4 = "SELECT * FROM age_count;";    
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        connection.query(sql4+query4, function(err, rows){
            if (err) throw err;
            res.send(rows);
            connection.release();
        }); 
    });
});
module.exports = router;
