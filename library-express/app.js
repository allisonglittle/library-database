// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
PORT = 4402;                 // Set a port number at the top so it's easy to change in the future
const api_func = require('./helpers/api_helper');
var mysql = require('./helpers/db-connector.js');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({
    defaultLayout: 'index',
});

var db = require('./helpers/db-connector');
/* 
    FUNCTIONS
*/
// app.use(express.static(__dirname + "/public"));
app.use('/', express.static('public'));
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

app.use('/renew_loan', require('./renew_loan.js'));

app.use('/return_book', require('./return_book.js'));

app.use('/create_loan', require('./create_loan.js'));

app.use('/edit_loan', require('./loanitems.js'));
app.use('/loan_status', require('./loanstatus.js'));
/*  
Citation for the following function:
Date: 03NOV21
Adapted from: codehandbook.org
Source URL: https://codehandbook.org/how-to-make-rest-api-calls-in-express-web-app/ 
*/
app.post('/query_book_api', (req, res) => {
    let title, author, url;
    title = (req.body.title) ? 'title=' + req.body.title : '';
    author = (req.body.author) ? 'author=' + req.body.author : '';
    url = 'http://openlibrary.org/search.json?';

    if (title && author) { url = url + title + '&' + author }
    else if (title) { url = url + title }
    else if (author) { url = url + author }
    url = url + '&language:eng&limit=10'

    console.log('url = ' + url)
    api_func.make_API_call(url)
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.send(error)
        })
})

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
