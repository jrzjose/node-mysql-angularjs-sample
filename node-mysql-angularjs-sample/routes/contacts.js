var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password :'root'
});

router.get('/', function (req, res) { //read all
    connection.query('SELECT * FROM demo.contacts;', function (err, results, fields) {
        if (err) throw err;
        res.send(results);
    });
})
.get('/:n', function (req, res) { //read
     
    var sql = 'SELECT * FROM demo.contacts WHERE id = ?';
    
    connection.query(sql, req.params.n, function (err, rows, fields) {
        if (err) throw err;
        res.send(rows[0]);
    });
})
.post('/', function (req, res) {//create
    var contact = req.body;
    connection.beginTransaction(function (err) {
        if (err) { throw err; }
        connection.query('INSERT INTO demo.contacts SET ?', contact, function (err, result) {
            if (err) {
                connection.rollback(function () {
                    throw err;
                });
            }
            
            var result = { id: result.insertId };
            res.json(result);
        });
    });    
})
.put('/:n', function (req, res) {//update
    var contact = req.body;
    var sql = 'UPDATE demo.contacts SET name = ?, title = ?, email_address = ? WHERE id = ?'

    connection.beginTransaction(function (err) {
        if (err) { throw err; }
               
        connection.query(sql, [ contact.name, contact.title, contact.email_address, contact.id ],
            function (err, result) {
                if (err) {
                    connection.rollback(function () {
                        throw err;
                    });
                }

                var result = { id: result.affectedRows  };
                res.json(result);
            });
    });

})
.delete('/:n', function (req, res) {//delete
    var contact = req.body;
    var sql = 'DELETE FROM demo.contacts WHERE id = ?'
    
    connection.beginTransaction(function (err) {
        if (err) { throw err; }
        
        connection.query(sql, [req.params.n],
            function (err, result) {
                if (err) {
                    connection.rollback(function () {
                        throw err;
                    });
                }
                
                var result = { id: result.affectedRows };
                res.json(result);
            });
    });
})

module.exports = router;