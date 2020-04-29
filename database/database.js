const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://gabman15:KVUSknDeCOb9@cluster0-amdd2.mongodb.net/test?retryWrites=true&w=majority";

async function addPerson(email, name, callback) {
    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, db) {
	if(err) {
	    return console.log(err);
	}

	var dbo = db.db("MonacoMap");
	var ppl = dbo.collection("People");
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
    });
}

async function addFriend(email, friendEmail) {
    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, db) {
	if(err) {
	    return console.log(err);
	}

	var dbo = db.db("MonacoMap");
	var ppl = dbo.collection("People");
	ppl.findOne(
	    {"email": friendEmail},
	    function(err,result) {
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
		});
		console.log("Succesfully added friend to " + email);
	    }
	);
    });
}

async function removeAllPeople() {
    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, db) {
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
	});
    });
}

function updatePerson(email, location, timeStart, timeEnd) {
    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, db) {
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
	});
    });
}

function getFriendInfo(email) {
    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, db) {
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
	    ppl.find({"email": {$in : friends}},
		     {projection:{"_id":0,"name":1,"location":1,"time_end":1}}).toArray(function(err,res) {
			 if (err) {
			     console.log ("Error: " + err);
			     return;
			 }
			 //console.log(res);
			 //var friendInfoText = '{"friends" : []}';
			 var friendInfo = JSON.parse('{"friends" : []}');
			 friendInfo.friends = res;
			 console.log(friendInfo);
			 db.close();
		     }
	    );
	    /*var friendInfoText = "{'friends' : []}";
	      var friendInfo = JSON.parse(friendInfoText);*/
	    /*for (i=0;i < friends.length;i++) {
		console.log("Finding "+friends[i]);
		ppl.findOne({"email":friends[i]}, function(err, res) {
		    if (err) {
			console.log ("Error: " + err);
			return;
		    }
		    
		});
	    }*/
	    //console.log("Successfully updated "+email+" to be at "+location);
	    //console.log(friends);

	});
    });
}

async function main()
{
    //addPerson("matoro@gmail.com","Toa Matoro", function() {});
    //removeAllPeople();
    //addPerson("tahu@gmail.com","Tahu Nuva",function() {});
    //    addFriend("tahu@gmail.com","matoro@gmail.com");
    //});
    //updatePerson("matoro@gmail.com","Karda Nui","15:30","16:30");
    getFriendInfo("tahu@gmail.com");
}

main();
