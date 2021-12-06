module.exports = function(){
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

    /*Display all loan statuses.*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getStatuses(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('loan_status', context);
            }
        }
    });

    /* Adds a loan status, redirects to the title page after adding */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO LoanStatus (statusDescription) VALUES (?);";
        var inserts = [req.body.statusDescription];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            } else{
                res.redirect('/loan_status');
            }
        });

    });

    return router;
}();