module.exports = function () {
    var express = require('express');
    var router = express.Router();

    /* Delete a loan. */
    router.post('/', function (req, res) {
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM LoanItems WHERE loanID = ? AND bookID = ?;";
        var inserts = [req.body.loanID, req.body.bookID];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/edit_loan');
            }
        });
    });
    return router;
}();