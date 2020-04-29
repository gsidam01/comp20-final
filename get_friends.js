var returned_from_server = {
	"friends": [
		{
			"name": "Toa",
			"location": "Tooa's place",
			"time_start": "15:30",
			"time_end": "16:30"
		},
		{
			"name": "Miles",
			"location": "Kilometer",
			"time_start": "10:30",
			"time_end": "19:00"
		},
		{
			"name": "George",
			"location": "Whooooaoaa",
			"time_start": "00:00",
			"time_end": "20:00"
		}
	]
}

function insert_friends_data()
{
	var ret_obj = returned_from_server;
	// var ret_obj = JSON.parse(returned_from_server); my local variable is already json, otherwise it would need to be parsed
	var insert_data = "<tr><th>Friends</th><th>Location</th><th>Time Leaving</th></tr>";
	for (let i = 0; i < ret_obj.friends.length; i++) {
		insert_data += "<tr>" + "<td>" + ret_obj.friends[i].name + "</td>"
					+ "<td>" + ret_obj.friends[i].location + "</td>"
					+ "<td>" + ret_obj.friends[i].time_end + "</td>" + "</tr>";
	}
	document.getElementById("friends_pop_here").innerHTML = insert_data;
}
