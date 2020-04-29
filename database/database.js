const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://gabman15:KVUSknDeCOb9@cluster0-amdd2.mongodb.net/test?retryWrites=true&w=majority";

async function addPerson(google_id, name, location, timeStart, timeEnd, callback) {
    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, db) {
	if(err) {
	    return console.log(err);
	}

	var dbo = db.db("MonacoMap");
	var ppl = dbo.collection("People");
	var newPerson = {"google_id": google_id, "name": name,
			 "location": location, "time_start": timeStart,
			 "time_end": timeEnd, "friends": []};
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

async function addFriend(google_id, friendName) {
    MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, db) {
	if(err) {
	    return console.log(err);
	}

	var dbo = db.db("MonacoMap");
	var ppl = dbo.collection("People");
	var s = ppl.find().stream();
	var s = ppl.find({},{projection: {"google_id":1, "name":1, "location":1, "time_start": 1,
					  "time_end": 1, "_id":0}}).stream();
	var friend;
	s.on("data", function(item) {
	    if(item.name == friendName) {
		console.log(item);
		friend = item;
	    }
	});
	s.on("end", function() {
	    console.log("end of data");
	    console.log("Friend: "+friend.name);

	    ppl.updateOne(
		{
		    "google_id":google_id
		},
		{
		    $push: {
			"friends": friend.google_id
		    }
		}
	    );
	    db.close();
	});
	console.log("after find");
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

async function main()
{
    //addPerson(1337,"Mata Nui", "Bara Aqua", "00:00", "23:59",function() {});
    //removeAllPeople();
    //addPerson(69,"Tahu Nuva", "Bara Aqua", "00:00", "23:59",function() {
        addFriend(69,"Mata Nui");
    //});

	
}
/*
addPerson(1337,"Mata Nui", "Bara Aqua", "00:00", "23:59");
addFriend(1337,"Great Being");
*/
main();
