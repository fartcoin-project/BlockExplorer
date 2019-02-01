var express = require('express');
var httpsssl = express();
var fs = require('fs');
var key = fs.readFileSync('/etc/letsencrypt/live/fartcoin-project.com/privkey.pem');
var cert = fs.readFileSync( '/etc/letsencrypt/live/fartcoin-project.com/fullchain.pem' );
var ca = fs.readFileSync( '/etc/letsencrypt/live/fartcoin-project.com/fullchain.pem' );
var options = {
key: key,
cert: cert,
ca: ca
};
var https = require('https');
https.createServer(options, httpsssl).listen(443);

var http = require('http');
http.createServer(httpsssl).listen(80);
httpsssl.use(function(req, res, next) {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});


