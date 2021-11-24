module.exports = function(){
    var express = require('express');
    var router = express.Router();
    /*Get title data from database*/
    function getTitles(res, mysql, context, complete){
        mysql.pool.query("SELECT ISBN, bookTitle, author, publisher, DATE_FORMAT(datePublished, \"%d/%m/%Y\") as 'datePublished' FROM Titles", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.titles = results;
            complete();
        });
    }

    /*Display all titles.*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getTitles(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('titles', context);
            }
        }
    });

    /* Adds a title, redirects to the title page after adding */
    router.post('/', function(req, res){
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Titles (ISBN, bookTitle, author, publisher, datePublished) VALUES (?, ?, ?, ?, ?)";
        var inserts = [req.body.ISBN, req.body.bookTitle, req.body.author, req.body.publisher, req.body.datePublished];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            } else{
                res.redirect('/titles');
            }
        });
    });

    return router;
}();