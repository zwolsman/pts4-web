/**
 * Created by Marvin on 21-Sep-16.
 */
var htmlparser = require("htmlparser2");
var http = require("http");
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

http.get('http://www.112brabant.nl/', function(result) {
    var data = "";
    result.on('data', function(chunk) {
        data += chunk;
    });
    result.on('end', function(chunk) {
        data += chunk;
        var results = [];
        var obj = {};
        var parser = new htmlparser.Parser({
            onopentag: function(name, attribs){

                if(name === 'a' && attribs.href.lastIndexOf('news/') === 0) {
                    obj.href = 'http://www.112brabant.nl/' + attribs.href;
                }
                if(name === 'img' && attribs.src.lastIndexOf('data/news/') === 0) {
                    obj.src = 'http://www.112brabant.nl/' + attribs.src;
                }
            },
            onclosetag: function(tagname){
                if(tagname === "article"){
                    results.push(obj);
                    obj = {};
                }
            }
        }, {decodeEntities: true});
        parser.write(data);
        parser.end();


        for(var i = 0; i < results.length; i++) {
            if(results[i].href) {
                http.get(results[i].href, function(r) {

                    processPost(r);
                });
            }
        }

    });
}).on('error', function(e) {
    res.send({message: e.message});
});

function processPost(result) {
    var data = "";
    result.on('data', function(chunk) {
        data += chunk;
    });
    var pattr = /^[A-Z ]+\w?[-–].*/i
    result.on('end', function(chunk) {
        data += chunk;

        var isHeader = false;
        var post = {};
        post.img = '';
        var parser = new htmlparser.Parser({
            onopentag: function(name, attribs){

                if(name === 'h2') {
                    isHeader = true;
                }

                if(name === 'img' && attribs.src.lastIndexOf('data/news/') === 0) {
                    if(post.img == '')
                     post.img = 'http://www.112brabant.nl/' + attribs.src;
                }
            },
            ontext: function(text) {
                text = text.trim();
                if(isHeader) {
                    post.header = text;
                    isHeader = false;
                } else if(pattr.test(text)) {
                    post.desc = text;
                }
            }
        }, {decodeEntities: true});
        parser.write(data);
        parser.end();

        if(typeof(post.desc) === 'undefined')
            post.desc = 'NO DESCRIPTION';
        connection.query('INSERT INTO alert(lid, ipaddr, description) VALUES(?, ?, ?)', [1, '127.0.0.1', post.desc], function(err, result) {
            if(err)
                console.log(err);

            connection.query('INSERT INTO crisis(aid, oid, title, thumbnail) VALUES(?, ?, ?, ?)', [result.insertId, 1, post.header, post.img], function(err, result) {
                console.log('crsis aangemaakt, ', post.header);
            })

        });
    });

}