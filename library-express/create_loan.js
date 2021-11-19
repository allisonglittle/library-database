module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /*Get loan information from database*/
    function getLoanDetails(res, mysql, context, complete){
        mysql.pool.query("SELECT l.loanID, CONCAT(p.firstName, ' ', p.lastName) as 'patronName', DATE_FORMAT(l.loanDate, '%m/%d/%Y') as loanDate, count(li.bookID) as 'bookCount' FROM Loans l INNER JOIN Patrons p ON l.memberID = p.memberID INNER JOIN LoanItems li on l.loanID = li.loanID GROUP BY l.loanID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.loans = results;
            complete();
        });
    }

    /* Get Patron info from database */
    

    /*Display all loans.*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getLoanDetails(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('create_loan', context);
            }
        }
    }); 

    /*Create a new loan.*/
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT into Loans (memberID, loanDate) VALUES (?, CURRENT_DATE())";
        var inserts = [req.body.patronID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
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