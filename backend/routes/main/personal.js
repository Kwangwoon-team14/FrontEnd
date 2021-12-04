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

/* GET for personal info */
router.get('/:Mid', function(req, res, next) {
  
});

/* PATCH for reservation change */
router.patch('/:Mid', function(req, res, next) {
  
});

module.exports = router;
