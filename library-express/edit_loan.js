module.exports = function () {
    var express = require('express');
    var router = express.Router();

    /*Get loan statuses from database*/
    function getStatuses(res, mysql, context, complete){
        mysql.pool.query("SELECT statusID, statusDescription FROM LoanStatus;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.statuses = results;
            complete();
        });
    }

    /*Display loan details.*/
    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        var context = {};
        var sql = "SELECT li.loanID, l.memberID, li.bookID, CONCAT(p.firstName, ' ', p.lastName) as 'patronName', t.bookTitle, DATE_FORMAT(li.dueDate, '%Y-%m-%d') as 'dueDate', ls.statusDescription as 'currentStatusDescription', ls.statusID as 'currentStatusID', li.renewalCount FROM LoanItems li INNER JOIN LoanStatus ls ON li.loanStatus = ls.statusID INNER JOIN Loans l ON li.loanID = l.loanID INNER JOIN Patrons p ON l.memberID = p.memberID INNER JOIN Books b ON li.bookID = b.bookID INNER JOIN Titles t ON b.ISBN = t.ISBN WHERE li.loanID = ? AND li.bookID = ?;";
        var inserts = [req.body.loanID, req.body.bookID];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            } else {
                context.loanItems = results[0];
                getStatuses(res, mysql, context, complete);
                function complete() {
                    callbackCount++;
                    if (callbackCount >= 1) {
                        res.render('edit_loan', context);
                    }
                }
            }
        });
    });

    return router;
}();