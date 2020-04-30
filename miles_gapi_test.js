const http = require('http');
const url = require("url");


var httpServer = http.createServer(function (req, res) {
        switch (req.method) {
            case "GET":
                console.log("Request url" + req.url);
                res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write("A get method was requested");

                res.end("ended response.");
                break;
            case "POST":
                console.log("Request url" + req.url);
                break;
            default:
                break;
        }

});

httpServer.listen(8080); 




// const MongoClient = require('mongodb').MongoClient;
// const mongo_url = "mongodb+srv://MilesIzydorczak:ashenmoorliege99@cluster0-sx3lm.mongodb.net/test?retryWrites=true&w=majority";
// const url = require("url");
// const http = require("http");

// function write_stuff(res, item, call_back) {
//     res.write("The company is: " + item.Company + "<br>");
//     res.write("The ticker is: " + item.Ticker + "<br>");
//     call_back();
// }

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     var qobj = url.parse(req.url, true).query;
//     var request_type = qobj.request_type;
//     var searched_text = qobj.text_field;
//     console.log(searched_text);
//     MongoClient.connect(mongo_url, { useUnifiedTopology: true }, function(err, db) {  
//         if (err) { 
//             console.log ("Error: " + err); 
//             return; 
//         }   

//         var database_object = db.db("companies");
//         var collection = database_object.collection('companies');

//         if (request_type == "company") {
//             var result_obj = collection.find({Company : searched_text}, 
//                 {projection: {_id : 0, Ticker : 1, Company : 1}});
//             result_obj.on("data", function(item) {
//                 console.log(item.Ticker);
//                 console.log(item.Company);
//                 write_stuff(res, item, function() {
//                     res.end();
//                 });
//             });
//         } else {
//             var result_obj = collection.find({Ticker : searched_text}, 
//                             {projection: {_id : 0, Ticker : 1, Company : 1}});
//             result_obj.on("data", function(item) {
//                 console.log(item.Ticker);
//                 console.log(item.Company);
//                 write_stuff(res, item, function() {
//                     res.end();
//                 });
//             });
//         }
//     });
// }).listen(8080);
