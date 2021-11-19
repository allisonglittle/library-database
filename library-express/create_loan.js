module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /*Get loan information from database*/
    function getLoanDetails(res, mysql, context, complete){
        mysql.pool.query("SELECT l.loanID as 'loanID', CONCAT(p.firstName, ' ', p.lastName) as 'patronName', b.bookID  as 'bookID', t.bookTitle as 'bookTitle', li.dueDate as 'dueDate', ls.statusID as 'currentID', ls.statusDescription as 'currentStatus', li.renewalCount as 'renewalCount' FROM Loans l, LoanItems li, Patrons p, Titles t, Books b, LoanStatus ls WHERE p.memberID = l.memberID AND l.loanID = li.loanID AND li.bookID = b.bookID AND b.ISBN = t.ISBN AND ls.statusID = li.loanStatus;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.loans = results;
            complete();
        });
    }

    /*Display all loans.*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getLoanDetails(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('books', context);
            }
        }
    }); 

    /*Create a new loan.*/
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Loans (memberID, loanDate) VALUES (?, CURRENT_DATE());";
        var sql1 = "INSERT INTO LoanItems (loanID, bookID, loanStatus, dueDate, renewalCount) VALUES (LAST_INSERT_ID(), ?, 1, DATE_ADD(CURRENT_DATE(), INTERVAL 14 DAY), 0);";
        var inserts = [req.body.patronID];
        var inserts1 = [req.body.bookID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/');
            }
        });
        sql1 = mysql.pool.query(sql1,inserts1,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/');
            }
        });
    });

    return router;
}();