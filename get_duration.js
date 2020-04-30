function get_duration(duration_hours_string, duration_minutes_string, time_hours_string, time_minutes_string, am){
  let duration_hours = parseInt(duration_hours_string);
  let duration_minutes = parseInt(duration_minutes_string);
  let time_hours = parseInt(time_hours_string);
  let time_minutes = parseInt(time_minutes_string);
  let today = new Date();
  let current_hours = today.getHours();
  let current_minutes = today.getMinutes();
  if (time_hours > 12){
    console.log("Error, hours must be in am/pm format\n");
  if (!am){
  time_hours += 12;
  }
  if (duration_hours == "") {
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
  }
  else{
    if (!am){
      duration_hours += 12;
    }
  }


  return (duration_hours + ":" + duration_minutes);
}

