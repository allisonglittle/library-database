// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
PORT = 4402;                 // Set a port number at the top so it's easy to change in the future
var mysql = require('./helpers/db-connector.js');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({
    defaultLayout: 'index',
});

var db = require('./helpers/db-connector');
/* 
    FUNCTIONS
*/
app.use('/static', express.static('public'))
app.use(express.static('public/css'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Handlebars setting
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('mysql', mysql);
/*
    ROUTES
*/
app.get('/', function (req, res) {
    res.render("main")
});

app.use('/titles', require('./titles.js'));
app.use('/books', require('./books.js'));
app.use('/patrons', require('./patrons.js'));
app.use('/loan_items', require('./loanitems.js'));
app.use('/renew_loan', require('./renew_loan.js'));
app.use('/return_book', require('./return_book.js'));
app.use('/delete_loan', require('./delete_loan.js'));
app.use('/delete_loan_item', require('./delete_loan_item'));
app.use('/edit_loan', require('./edit_loan.js'));
app.use('/edit_loan_details', require('./edit_loan_details'));
app.use('/create_loan', require('./create_loan.js'));
app.use('/loan_status', require('./loanstatus.js'));
app.use('/delete_loan_status', require('./delete_loan_status'));


/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
