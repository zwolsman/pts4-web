var express = require('express');
var router = express.Router();

var mysql = require('mysql');


var connection = mysql.createConnection({
    host     : 'lensert.com',
    user     : 'marvin',
    password : 'Wachtwoord2',
    database : 'pts4'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

/* GET home page. */
router.get('/', function(req, res, next) {

    connection.query('SELECT thumbnail, title, description FROM alert, crisis WHERE alert.id=crisis.aid', function(err, rows, field) {
        res.render('index', { title: 'Index', posts: rows });
    });


});

module.exports = router;
