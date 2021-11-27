module.exports = function () {
    var express = require('express');
    var router = express.Router();

    /*Delete loans with the status to be deleted.*/
    function deleteLoans(res, mysql, statusID, complete){
        var sql = "DELETE FROM LoanItems WHERE loanStatus = " + statusID + ";";
        mysql.pool.query(sql, function(error, results, fields){
            console.log(sql);
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            complete();
        });
    }

    /*Delete loan status.*/
    function deleteStatus(res, mysql, statusID, complete){
        var sql = "DELETE FROM LoanStatus WHERE statusID = " + statusID + ";";
        mysql.pool.query(sql, function(error, results, fields){
            console.log(sql);
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            complete();
        });
    }

    /*Delete loan status.*/
    router.post('/', function (req, res) {
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        console.log(req.body)
        var statusID = req.body.statusID;
        deleteLoans(res, mysql, statusID, complete);
        deleteStatus(res, mysql, statusID, complete);        
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.redirect('/loan_status');
            }
        }
    });

    return router;
}();