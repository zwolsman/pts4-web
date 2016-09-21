/**
 * Created by Marvin on 21-Sep-16.
 */

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


var users = ['marvin', 'Wachtwoord1', 'goos', 'goos', 'jip', 'henk', 'cornee', 'henk'];

for(var i = 1; i < users.length; i+=2) {
    console.log('hashing: ' + users[i]);
    users[i] = hash(users[i]);
    connection.query('INSERT INTO operator VALUES (NULL, ?, ?, ?)', [users[i-1], users[i], users[i-1]], function(err, results, fields) {
       if(err) {
           console.log('Error: ', err);
       }
       console.log('executed querry');
    });
}

function hash(input) {
    var md5 = require('md5');
    for(var i = 0; i < 20; i++) {
        input = md5(input);
    }
    return input;
}
connection.end();