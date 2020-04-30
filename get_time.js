function get_time(){
  let today = new Date();
  let current_hours = today.getHours();
  let current_minutes = today.getMinutes();
  let duration_hours = getElementById(duration_hours);
  let duration_minutes = getElementById(duration_minutes);
  let time_hours = getElementById(time_hours);
  let time_minutes = getElementById(time_minutes);
  if ((duration_hours > 12) || (time_hours > 12)){
    console.log("Error, hours must be in am/pm format\n");
  //if (pm)
  time_hours += 12;
  // if duration_hours == undefined {
  if (current_hours > time_hours) {
    duration_hours = time_hours + 24 - current_hours;
  }
  else{
    duration_hours = time_hours - current_hours;
  }
  if (current_minutes > time_minutes) {
    duration_minutes = time_minutes + 60 - current_minutes;
  }
  else{
    duration_minutes = time_minutes - current_minutes;
  }
  //}
  // else{
    duration_hours += 12;
  //}
  return duration_hours;
  }
