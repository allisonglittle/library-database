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

    /* Get Patron info from database*/
    function getPatrons(res, mysql, context, complete) {
        mysql.pool.query("SELECT p.memberID as 'patronID', p.firstName, p.lastName FROM Patrons p", function (error, results, fields) {
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
        var sqlLoan = "INSERT INTO Loans (memberID, loanDate) VALUES (?, CURRENT_DATE());";
        var sqlLoanItems1 = "INSERT INTO LoanItems (loanID, bookID, loanStatus, dueDate, renewalCount) VALUES ";
        var sqlLoanItems2 = "((SELECT loanID FROM Loans WHERE memberID = ";
        var sqlLoanItems3 = " and loanDate = CURRENT_DATE() order by loanID desc LIMIT 1), ";
        var sqlLoanItems4 = ", 1, DATE_ADD(CURRENT_DATE(), INTERVAL 14 DAY), 0)";
        var books = req.body.books;
        var memberID = req.body.patronID;
        books.forEach(function(item, index, array) {
            if (index > 0) {
                sqlLoanItems1 += ",";
            }
            sqlLoanItems1 = sqlLoanItems1 + sqlLoanItems2 + memberID + sqlLoanItems3 + item + sqlLoanItems4;
        })
        sqlLoanItems1 += ";";
        var inserts = [req.body.patronID];
        sqlLoan = mysql.pool.query(sqlLoan, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }
        });
        sqlLoanItems1 = mysql.pool.query(sqlLoanItems1,inserts,function(error, results, fields){
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