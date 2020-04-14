function show_hide(visible, hidden)
{
	var hide_welcome = document.getElementById("welcome");

	var show_me = document.getElementById(visible);
	var hide_me = document.getElementById(hidden);

	hide_welcome.style.display = "none";
	show_me.style.display = "inline-block";
	hide_me.style.display = "none";
}