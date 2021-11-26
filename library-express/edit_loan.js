module.exports = function () {
    var express = require('express');
    var router = express.Router();

    /*Display loan details.*/
    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "SELECT loanID, bookID, loanStatus, dueDate, renewalCount FROM LoanItems WHERE LoanID = ? AND bookID = ?;"
        var inserts = [req.body.loanID, req.body.bookID];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.render('/edit_loan');
            }
        });
    });

    return router;
}();