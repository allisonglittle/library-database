module.exports = function () {
    var express = require('express');
    var router = express.Router();

    /*Delete loan items from this loan.*/
    function deleteLoanItems(res, mysql, loanID, complete){
        var sql = "DELETE FROM LoanItems WHERE loanID = " + loanID + ";";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            complete();
        });
    }

    /*Delete the loan.*/
    function deleteLoan(res, mysql, loanID, complete){
        var sql = "DELETE FROM Loans WHERE loanID = " + loanID + ";";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            complete();
        });
    }

    /*Delete loan items and the loan itself loan.*/
    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        var loanID = req.body.loanID;
        deleteLoanItems(res, mysql, loanID, complete);
        deleteLoan(res, mysql, loanID, complete);        
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.redirect('/create_loan');
            }
        }
    });

    return router;
}();