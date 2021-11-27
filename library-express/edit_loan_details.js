module.exports = function () {
    var express = require('express');
    var router = express.Router();

    /* Update a loan. */
    router.post('/', function (req, res) {
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "UPDATE LoanItems li SET li.loanStatus = ?, li.dueDate = ?, li.renewalCount = ? WHERE li.loanID = ? AND li.bookID = ?;";
        var inserts = [req.body.loanStatus, req.body.dueDate, req.body.renewalCount, req.body.loanID, req.body.bookID];
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