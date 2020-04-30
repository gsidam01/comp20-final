const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://gabman15:KVUSknDeCOb9@cluster0-amdd2.mongodb.net/test?retryWrites=true&w=majority";

function addPerson(email, name, callback) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
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
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
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
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
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
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
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
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
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
			 callback();
		     }
	    );
	});
    });
}

async function main()
{
    //addPerson("nuparu@gmail.com","Toa Nuparu", function() {});
    //removeAllPeople(function(){});
    //addPerson("tahu@gmail.com","Tahu Nuva",function() {});
    addFriend("tahu@gmail.com","test", function() {});
    //});
    //updatePerson("matoro@gmail.com","Karda Nui","15:30","16:30", function(){});
//	getFriendInfo("tahu@gmail.com",function(){});
    //});
}

main();
