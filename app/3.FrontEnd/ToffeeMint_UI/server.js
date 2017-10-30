//require the express nodejs module
var express = require('express'),
    //set an instance of exress
    app = express(),
    //require the body-parser nodejs module
    bodyParser = require('body-parser'),
    //require the path nodejs module
    path = require("path");

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//tell express that www is the root of our public web folder
app.use(express.static(path.join(__dirname, 'public_html')));

//tell express what to do when the /form route is requested
app.post('/lc', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    //mimic a slow network connection
    setTimeout(function() {

        res.send(JSON.stringify({
            expiryDate: req.body.expiryDate || null,
            expiryPlace: req.body.expiryPlace || null,
            amount: req.body.amount || null,
            currency: req.body.currency || null
        }));

    }, 1000)

    //debugging output for the terminal
    //console.log('you posted: ExpiryDate: ' + req.body.expiryDate + ', ExpiryPlace: ' + req.body.expiryPlace);
});

//wait for a connection
app.listen(3000, function() {
    console.log('Server is running. Point your browser to: http://localhost:3000');
});