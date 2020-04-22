var http = require('http');
http.createServer(function (req, res) {
   res.writeHead(200, {'Content-Type': 'text/html'});
   res.write("<script src=\"https://apis.google.com/js/platform.js\" async defer></script>");
   res.write("<title> Google API test </title> <meta charset=\"utf-8\">");
   res.write("<meta name=\"google-signin-client_id\" content=\"626801578575-q0vuggp5r43sl9v79qhv7ksmhgo19p4u.apps.googleusercontent.com\">");
   res.write("<div class=\"g-signin2\" data-longtitle=\"true\" data-width=\"240\" data-height=\"50\"data-onsuccess=\"onSignIn\"></div>");

   res.end("hello!");
}).listen(8080); 