function insert_friends_data(returned_from_server)
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
	document.getElementById("no_user_signed_in").innerHTML = "";
}
