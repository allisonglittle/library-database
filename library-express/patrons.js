module.exports = function () {
    var express = require('express');
    var router = express.Router();
    /*Get patron data from database*/
    function getPatrons(res, mysql, context, complete) {
        mysql.pool.query("SELECT p.memberID AS id, p.firstName, p.lastName, DATE_FORMAT(p.registerDate, '%m/%d/%Y') as 'registerDate', p.contactEmail, p.contactPhone, t.bookTitle FROM Patrons p LEFT JOIN Titles t ON p.favoriteTitle = t.ISBN;", function (error, results, fields) {
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
        mysql.pool.query("SELECT ISBN, bookTitle FROM Titles;", function (error, results, fields) {
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
        context.jsscripts = ["searchpatrons.js"];
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

    /* Find people whose fname starts with a given string in the req */
    function getPatronsWithNameLike(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
        var query = "SELECT p.memberID as id, p.firstName, p.lastName, DATE_FORMAT(p.registerDate, '%d/%m/%Y') as 'registerDate', p.contactEmail, p.contactPhone, t.bookTitle FROM Patrons p LEFT JOIN Titles t ON p.favoriteTitle = t.ISBN WHERE p.firstName LIKE " + mysql.pool.escape(req.params.s + '%');
        console.log(query)

        mysql.pool.query(query, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.patrons = results;
            complete();
        });
    }

    /* Display all patron information for a specified patron ID */
    function getPatron(res, mysql, context, id, complete) {
        var sql = "SELECT memberID as id, firstName, lastName, DATE_FORMAT(registerDate, '%Y-%m-%d') as 'registerDate', contactEmail, contactPhone, favoriteTitle FROM Patrons WHERE memberID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.patron = results[0];
            complete();
        });
    }

    /* Adds a patron, redirects to the patron page after adding */
    router.post('/', function (req, res) {
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Patrons (firstName, lastName, registerDate, contactEmail, contactPhone, favoriteTitle) VALUES (?, ?, ?, ?, ?, ?);";
        // checks if the favorite title was a null value
        var inserts = [];
        if (req.body.favoriteTitle == 'null') {
            inserts = [req.body.firstName, req.body.lastName, req.body.registerDate, req.body.contactEmail, req.body.contactPhone, null];
        } else {
            inserts = [req.body.firstName, req.body.lastName, req.body.registerDate, req.body.contactEmail, req.body.contactPhone, req.body.favoriteTitle];
        }
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.status(200);
                res.redirect('/patrons');
            }
        });

    });

    /*Display all patrons with first names like the given string */
    router.get('/search/:s', function (req, res) {
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getPatronsWithNameLike(req, res, mysql, context, complete);
        getTitles(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('patrons', context);
            }
        }
    });

    /* Display one patron for the specific purpose of updating people */

    router.get('/:id', function (req, res) {
        callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getPatron(res, mysql, context, req.params.id, complete);
        getTitles(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                console.log(context);
                res.render('update_patrons', context);
            }

        }
    });


    /* Update patron and redirect to patrons page. */
    router.post('/:id', function (req, res) {
        var mysql = req.app.get('mysql');
        console.log(req.body)
        var sql = "UPDATE Patrons SET firstName = ?, lastName = ?, registerDate = ?, contactEmail = ?, contactPhone = ?, favoriteTitle = ? WHERE memberID = ?;";
        // checks if the favorite title was a null value
        var inserts = [];
        if (req.body.favoriteTitle == 'null') {
            inserts = [req.body.firstName, req.body.lastName, req.body.registerDate, req.body.contactEmail, req.body.contactPhone, null, req.params.id];
        } else {
            inserts = [req.body.firstName, req.body.lastName, req.body.registerDate, req.body.contactEmail, req.body.contactPhone, req.body.favoriteTitle, req.params.id];
        }
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.status(200);
                res.redirect('/patrons');
            }
        });
    });

    return router;

}();

