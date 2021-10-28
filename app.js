// App.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './library-ui/src/App';
/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
const { default: App } = require('./library-ui/src/App');
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 4421;                 // Set a port number at the top so it's easy to change in the future

/*
    ROUTES
*/
app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
       // res.send("The server is running!")      // This function literally sends the string "The server is running!" to the computer
       res.send(App);
    });                                         // requesting the web site.

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
