var http = require('http');
var mysql = require('mysql');
var express = require('express');
var fs = require('fs');
const { urlencoded } = require('body-parser');

var app = express();

console.log("Starting up!")
//set view engine to ejs
app.set('view engine','ejs')

//This has to be done in order to link materialize
app.use(express.static('public'))

app.get('/',function(req,resp){
  resp.sendFile('./public/index.html',{'root':__dirname});
});

app.listen(8000);
console.log('Server running at http://127.0.0.1:8000/');

/*
// All other get and put requests
*/
