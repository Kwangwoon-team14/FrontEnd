var express = require('express');
var router = express.Router();

/* MySQL loading */
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '981223',
    database: 'vaccine_reservation_system',
    multipleStatements: true
});

/* GET for today's result */
router.get('/today', function(req, res, next) {
    var query = "SELECT (SELECT count(*) FROM reservation\
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
        connection.query(query, function(err, row){
            if (err) throw err;
            res.send(row);
            connection.release();
        }); 
    });
});

/* GET for result by date */
router.get('/date', function(req, res, next) {
    var query = "SELECT (date_format(Date, '%Y-%m')) as month, count(*) FROM reservation\
                group by month order by month;"
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        connection.query(query, function(err, row){
            if (err) throw err;
            res.send(row);
            connection.release();
        }); 
    });
});

/* GET for result by region */
router.get('/region', function(req, res, next) {
    // Create view
    var sql = "CREATE OR REPLACE VIEW region_count as\
               SELECT M.City, R.Date, count(*) as people\
               FROM member M join reservation R on M.Mno=R.Mno\
               GROUP BY M.City, R.Date\
               ORDER BY M.City, R.Date;";  
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        connection.query(sql, function(err, row){
            if (err) throw err;
            connection.release();
        }); 
    });
    // Select in view
    var query = "SELECT (SELECT sum(people) FROM region_count\
                        WHERE city like '서울%' AND Date=date_format(now(), '%Y-%m-%d')) as r1_cur,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '서울%' AND Date<=date_format(now(), '%Y-%m-%d')) as r1_before,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '서울%' AND Date>date_format(now(), '%Y-%m-%d')) as r1_after,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '경기%' AND Date=date_format(now(), '%Y-%m-%d')) as r2_cur,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '경기%' AND Date<=date_format(now(), '%Y-%m-%d')) as r2_before,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '경기%' AND Date>date_format(now(), '%Y-%m-%d')) as r2_after,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '강원%' AND Date=date_format(now(), '%Y-%m-%d')) as r3_cur,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '강원%' AND Date<=date_format(now(), '%Y-%m-%d')) as r3_before,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '강원%' AND Date>date_format(now(), '%Y-%m-%d')) as r3_after,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '경상%' AND Date=date_format(now(), '%Y-%m-%d')) as r4_cur,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '경상%' AND Date<=date_format(now(), '%Y-%m-%d')) as r4_before,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '경상%' AND Date>date_format(now(), '%Y-%m-%d')) as r4_after,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '충청%' AND Date=date_format(now(), '%Y-%m-%d')) as r5_cur,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '충청%' AND Date<=date_format(now(), '%Y-%m-%d')) as r5_before,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '충청%' AND Date>date_format(now(), '%Y-%m-%d')) as r5_after,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '전라%' AND Date=date_format(now(), '%Y-%m-%d')) as r6_cur,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '전라%' AND Date<=date_format(now(), '%Y-%m-%d')) as r6_before,\
                        (SELECT sum(people) FROM region_count\
                        WHERE city like '전라%' AND Date>date_format(now(), '%Y-%m-%d')) as r6_after;";    
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        connection.query(query, function(err, row){
            if (err) throw err;
            res.send(row);
            connection.release();
        }); 
    });
});

/* GET for result by age */
router.get('/age', function(req, res, next) {
    // Create view
    var sql = 'CREATE OR REPLACE VIEW age_count as\
                SELECT (case when M.Age <= 19 then 1\
                        when M.Age between 20 and 29 then 2\
                        when M.Age between 30 and 39 then 3\
                        when M.Age between 40 and 49 then 4\
                        when M.Age between 50 and 59 then 5\
                        when M.Age between 60 and 69 then 6\
                        when M.Age >= 70 then 7 END) as front_age, R.Date, count(*) as people\
                FROM member M join reservation R on M.Mno=R.Mno\
                GROUP BY front_age, R.Date\
                ORDER BY front_age, R.Date;'
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        connection.query(sql, function(err, row){
            if (err) throw err;
            connection.release();
        }); 
    });
     // Select in view
    var query = "SELECT (SELECT sum(people) FROM age_count\
                        WHERE front_age=1 AND Date=date_format(now(), '%Y-%m-%d')) as a1_cur,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=1 AND Date<=date_format(now(), '%Y-%m-%d')) as a1_before,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=1 AND Date>date_format(now(), '%Y-%m-%d')) as a1_after,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=2 AND Date=date_format(now(), '%Y-%m-%d')) as a2_cur,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=2 AND Date<=date_format(now(), '%Y-%m-%d')) as a2_before,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=2 AND Date>date_format(now(), '%Y-%m-%d')) as a2_after,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=3 AND Date=date_format(now(), '%Y-%m-%d')) as a3_cur,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=3 AND Date<=date_format(now(), '%Y-%m-%d')) as a3_before,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=3 AND Date>date_format(now(), '%Y-%m-%d')) as a3_after,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=4 AND Date=date_format(now(), '%Y-%m-%d')) as a4_cur,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=4 AND Date<=date_format(now(), '%Y-%m-%d')) as a4_before,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=4 AND Date>date_format(now(), '%Y-%m-%d')) as a4_after,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=5 AND Date=date_format(now(), '%Y-%m-%d')) as a5_cur,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=5 AND Date<=date_format(now(), '%Y-%m-%d')) as a5_before,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=5 AND Date>date_format(now(), '%Y-%m-%d')) as a5_after,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=6 AND Date=date_format(now(), '%Y-%m-%d')) as a6_cur,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=6 AND Date<=date_format(now(), '%Y-%m-%d')) as a6_before,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=6 AND Date>date_format(now(), '%Y-%m-%d')) as a6_after,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=7 AND Date=date_format(now(), '%Y-%m-%d')) as a7_cur,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=7 AND Date<=date_format(now(), '%Y-%m-%d')) as a7_before,\
                        (SELECT sum(people) FROM age_count\
                        WHERE front_age=7 AND Date>date_format(now(), '%Y-%m-%d')) as a7_after;";
    pool.getConnection(function(err, connection){
        // Fail to DB connection
        if (err) throw err;
        // Use DB connection
        connection.query(query, function(err, row){
            if (err) throw err;
            res.send(row);
            connection.release();
        }); 
    });
});

module.exports = router;
