module.exports = function () {
    var express = require('express');
    var router = express.Router();
    /*Get patron data from database*/
    function getPatrons(res, mysql, context, complete) {
        mysql.pool.query("SELECT p.firstName, p.lastName, p.registerDate, p.contactEmail, p.contactPhone, t.bookTitle FROM Patrons p LEFT JOIN Titles t ON p.favoriteTitle = t.ISBN", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.patrons = results;
            complete();
        });
    }

    /*Get title data from database*/
    function getTitles(res, mysql, context, complete) {
        mysql.pool.query("SELECT ISBN, bookTitle FROM Titles", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.titles = results;
            complete();
        });
    }
    /*Display all patrons.*/
    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getPatrons(res, mysql, context, complete);
        getTitles(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('patrons', context);
            }
        }
    });

    /* Adds a patron, redirects to the patron page after adding */
    router.post('/', function (req, res) {
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Patrons (firstName, lastName, registerDate, contactEmail, contactPhone, favoriteTitle) VALUES (?, ?, ?, ?, ?, ?)";
        var inserts = [req.body.firstName, req.body.lastName, req.body.registerDate, req.body.contactEmail, req.body.contactPhone, req.body.favoriteTitle];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/patrons');
            }
        });

    });

    return router;
}();