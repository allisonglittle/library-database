module.exports = function () {
    var express = require('express');
    var router = express.Router();

    /*Get loan information from database*/
    function getLoanDetails(res, mysql, context, complete) {
        mysql.pool.query("SELECT l.loanID, CONCAT(p.firstName, ' ', p.lastName) as 'patronName', DATE_FORMAT(l.loanDate, '%m/%d/%Y') as loanDate, count(li.bookID) as 'bookCount' FROM Loans l INNER JOIN Patrons p ON l.memberID = p.memberID INNER JOIN LoanItems li on l.loanID = li.loanID GROUP BY l.loanID", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.loans = results;
            complete();
        });
    }

    /* Get Patron info from database */
    function getPatrons(res, mysql, context, complete) {
        mysql.pool.query("SELECT p.memberID, p.firstName, p.lastName FROM Patrons p", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.patrons = results;
            complete();
        });
    }

    /*Get book data from database*/
    function getBooks(res, mysql, context, complete) {
        mysql.pool.query("SELECT b.bookID, b.ISBN, t.bookTitle FROM Books b INNER JOIN Titles t ON b.ISBN = t.ISBN WHERE b.isActive = TRUE AND b.bookID NOT IN (SELECT li.bookID FROM LoanItems li WHERE li.loanStatus <> 3)", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.books = results;
            complete();
        });
    }

    /*Display all loans.*/
    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getLoanDetails(res, mysql, context, complete);
        getPatrons(res, mysql, context, complete);
        getBooks(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('create_loan', context);
            }
        }
    });

    /*Create a new loan.*/
    router.post('/', function (req, res) {
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Loans (memberID, loanDate) VALUES (?, CURRENT_DATE());";
        var sql1 = "INSERT INTO LoanItems (loanID, bookID, loanStatus, dueDate, renewalCount) VALUES (LAST_INSERT_ID(), ?, 1, DATE_ADD(CURRENT_DATE(), INTERVAL 14 DAY), 0);";
        var inserts = [req.body.patronID];
        var inserts1 = [req.body.bookID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){

        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {

                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/create_loan');
            }
        });
        sql1 = mysql.pool.query(sql1,inserts1,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/create_loan');
            }
        });
    });

    return router;
}();