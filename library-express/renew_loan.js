module.exports = function () {
    var express = require('express');
    var router = express.Router();

    /* Renew a loan. */
    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "UPDATE LoanItems li SET li.loanStatus = 2, li.dueDate = (DATE_ADD((SELECT li2.dueDate FROM LoanItems li2 WHERE li2.loanID = li.loanID AND li2.bookID = li.bookID), INTERVAL 14 DAY)), li.renewalCount = ((SELECT li3.renewalCount FROM LoanItems li3 WHERE li3.loanID = li.loanID AND li3.bookID = li.bookID) + 1) WHERE li.loanID = ? AND li.bookID = ?;";
        var inserts = [req.body.loanID, req.body.bookID];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/loan_items');
            }
        });
    });
    return router;
}();