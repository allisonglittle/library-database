module.exports = function(){
    var express = require('express');
    var router = express.Router();
    /*Get loan item data from database*/
    function getLoanItems(res, mysql, context, complete){
        mysql.pool.query("SELECT li.loanID, l.memberID, li.bookID, CONCAT(p.firstName, ' ', p.lastName) as 'patronName', t.bookTitle, DATE_FORMAT(li.dueDate, '%m/%d/%Y') as 'dueDate', ls.statusDescription, li.renewalCount FROM LoanItems li INNER JOIN LoanStatus ls ON li.loanStatus = ls.statusID INNER JOIN Loans l ON li.loanID = l.loanID INNER JOIN Patrons p ON l.memberID = p.memberID INNER JOIN Books b ON li.bookID = b.bookID INNER JOIN Titles t ON b.ISBN = t.ISBN ORDER BY li.loanID;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.loanItems = results;
            complete();
        });
    }

    /*Display all loan items.*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ['renew_loan.js'];
        var mysql = req.app.get('mysql');
        getLoanItems(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('loan_items', context);
            }
        }
    });

    return router;
}();