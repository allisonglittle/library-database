// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 4402;                 // Set a port number at the top so it's easy to change in the future
const api_func = require('./helpers/api_helper');

/* 
    FUNCTIONS
*/

app.use(express.urlencoded({
    extended: true
}));



/*
    ROUTES
*/
app.get('/', function(req, res)                 
    {
        res.sendFile(__dirname + "/public/pages/homepage.html")      
    });                                         

app.get('/title_management', function(req, res)                 
    {
        res.sendFile(__dirname + "/public/pages/title_management.html")      
    });                                         

app.get('/books', function(req, res)                 
    {
        res.sendFile(__dirname + "/public/pages/book_management.html")      
    });     

app.get('/add_patron', function(req, res)                 
    {
        res.sendFile(__dirname + "/public/pages/add_patron.html")      
    });      

app.get('/create_loan', function(req, res)                 
    {
        res.sendFile(__dirname + "/public/pages/create_loan.html")      
    }); 

app.get('/edit_loan', function(req, res)                 
    {
        res.sendFile(__dirname + "/public/pages/edit_loan.html")      
    });   
    
    
app.get('/loan_status', function(req, res)
    {
        res.sendFile(__dirname + "/public/pages/loan_status.html")
    });

app.get('/add_title', function(req, res)
    {
        res.sendFile(__dirname + "/public/pages/add_title.html")
    });

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
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
