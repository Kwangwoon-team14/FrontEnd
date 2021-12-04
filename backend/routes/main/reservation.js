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

/* GET for hospital data */
router.get('/hospital', function(req, res, next) {
  
});

/* GET for select hospital's schedule */
router.get('/:Hid', function(req, res, next) {
  
});

/* POST for reservertion */
router.post('/', function(req, res, next) {
  
});

module.exports = router;
