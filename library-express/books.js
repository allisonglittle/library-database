module.exports = function(){
    var express = require('express');
    var router = express.Router();
    /*Get title data from database*/
    function getTitles(res, mysql, context, complete){
        mysql.pool.query("SELECT ISBN, bookTitle FROM Titles", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.titles = results;
            complete();
        });
    }

    /*Get book data from database*/
    function getBooks(res, mysql, context, complete){
        mysql.pool.query("SELECT b.bookID, b.ISBN, t.bookTitle, DATE_FORMAT(b.purchaseDate, '%m/%d/%Y') as 'purchaseDate', b.isActive FROM Books b INNER JOIN Titles t ON b.ISBN = t.ISBN;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.books = results;
            complete();
        });
    }

    /*Display all books.*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getTitles(res, mysql, context, complete);
        getBooks(res, mysql, context, complete)
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                console.log(context);
                res.render('books', context);
            }
        }
    });

    /* Adds a book, redirects to the book page after adding */
    router.post('/', function(req, res){
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Books (ISBN, purchaseDate, isActive) VALUES (?, ?, ?);";
        var inserts = [req.body.ISBN, req.body.purchaseDate, 1];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            } else{
                res.redirect('/books');
            }
        });

    });

    /* Updates the active status of a book */
    router.post('/:id', function(req, res){
        console.log(req.body);
        console.log(req.params);
        var mysql = req.app.get('mysql');
        var sql = "UPDATE Books SET isActive = ? WHERE bookID = ?;";
        var inserts = [req.body.activeStatus, req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            } else{
                res.status(200);
                res.redirect('/books');
            }
        });
    });

    return router;
}();