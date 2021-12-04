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

/* GET for today's result */
router.get('/today', function(req, res, next) {
  
});

/* GET for result by date */
router.get('/date', function(req, res, next) {
  
});

/* GET for result by region */
router.get('/region', function(req, res, next) {
  
});

/* GET for result by age */
router.get('/age', function(req, res, next) {
  
});

module.exports = router;
