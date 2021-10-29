// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 4402;                 // Set a port number at the top so it's easy to change in the future

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
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
