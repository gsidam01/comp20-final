const http = require('http');
const url = require("url");
const MongoClient = require('mongodb').MongoClient;
const mongo_url = "mongodb+srv://gabman15:KVUSknDeCOb9@cluster0-amdd2.mongodb.net/test?retryWrites=true&w=majority";

var httpServer = http.createServer(function (req, res) {
        console.log("Request url" + req.url);
        url_parts = url.parse(req.url, true);
        switch (req.method) {
            case "GET":
                if (url_parts.pathname == "/get_friend_data") {
                    usr_email = url_parts.query.usr_email;
                    usr_name = url_parts.query.usr_name;
                    console.log(usr_email);
                    addPerson(usr_email, usr_name, function () {
                        getFriendInfo(usr_email, function(friendInfo) {
                            response_string = JSON.stringify(friendInfo);
                            res.writeHead(200, {'Content-Type': 'text/html', 'Access-Control-Allow-Origin': '*'});
                            res.write("A get method was requested\n");
                            res.write(friendInfo);
                            res.end();
                        });
                    });
                } 
                break;
            case "POST":
                console.log("Request url" + req.url);
                break;
            default:
                break;
        }

});

httpServer.listen(8080); 

function addPerson(email, name, callback) {
    MongoClient.connect(mongo_url, { useUnifiedTopology: true }, function(err, db) {
    if(err) {
        return console.log(err);
    }

    var dbo = db.db("MonacoMap");
    var ppl = dbo.collection("People");
    ppl.find({"email":email},{}).toArray(function(err,res) {
        if(res.length > 0) {
        console.log("Person already in database");
        db.close();
        callback();
        return;
        } else {
        var newPerson = {"email": email, "name": name,
                 "location": null, "time_start": null,
                 "time_end": null, "friends": []};
        ppl.insertOne(newPerson, function(err, res) {
            if (err) {
            console.log ("Error: " + err);
            return;
            }
            console.log(name+ " was inserted into the database!");
            db.close();
            callback();
        });
        }
    }); 
    });
}

function addFriend(email, friendEmail, callback) {
    MongoClient.connect(mongo_url, { useUnifiedTopology: true }, function(err, db) {
    if(err) {
        return console.log(err);
    }

    var dbo = db.db("MonacoMap");
    var ppl = dbo.collection("People");
    ppl.findOne(
        {"email": friendEmail},
        function(err,result) {
        if(!result) {
            console.log("No one with that email");
            db.close();
            callback();
            return;
        }
        var friend = result;
        console.log(friend.email);
        ppl.updateOne(
            {
            "email":email
            },
            {
            $push: {
                "friends": friend.email
            }
            }
        ).then (function() {
            db.close();
            callback();
        });
        console.log("Succesfully added friend to " + email);
        }
    );
    });
}

async function removeAllPeople(callback) {
    MongoClient.connect(mongo_url, { useUnifiedTopology: true }, function(err, db) {
    if(err) {
        return console.log(err);
    }

    var dbo = db.db("MonacoMap");
    var ppl = dbo.collection("People");
    ppl.deleteMany({}, function(err, res) {
        if (err) {
        console.log ("Error: " + err);
        return;
        }
        console.log("All people were removed from the database!");
        db.close();
        callback();
    });
    });
}

function updatePerson(email, location, timeStart, timeEnd, callback) {
    MongoClient.connect(mongo_url, { useUnifiedTopology: true }, function(err, db) {
    if(err) {
        return console.log(err);
    }

    var dbo = db.db("MonacoMap");
    var ppl = dbo.collection("People");

    var query = {"email":email};
    var vals = {$set: {"location":location, "time_start":timeStart, "time_end":timeEnd}};
    ppl.updateOne(query, vals, function(err, res) {
        if (err) {
        console.log ("Error: " + err);
        return;
        }
        console.log("Successfully updated "+email+" to be at "+location);
        db.close();
        callback();
    });
    });
}

function getFriendInfo(email, callback) {
    MongoClient.connect(mongo_url, { useUnifiedTopology: true }, function(err, db) {
    if(err) {
        return console.log(err);
    }

    var dbo = db.db("MonacoMap");
    var ppl = dbo.collection("People");

    var query = {"email":email};

    ppl.findOne(query, function(err, res) {
        if (err) {
        console.log ("Error: " + err);
        return;
        }
        var friends = res.friends;
        var query = {$and: [ {"email": {$in : friends}}, {"location": {$ne: null}} ] }
        ppl.find(query,
             {projection:{"_id":0,"name":1,"location":1,"time_end":1}}).toArray(function(err,res) {
             if (err) {
                 console.log ("Error: " + err);
                 return;
             }
             var friendInfo = JSON.parse('{"friends" : []}');
             friendInfo.friends = res;
             console.log(friendInfo);
             db.close();
             callback(friendInfo);
             }
        );
    });
    });
}


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
