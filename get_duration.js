function get_end_time(duration_hours_string, duration_minutes_string, time_hours_string, time_minutes_string, am)
{
    let today = new Date();
    let current_hours = today.getHours();
    let current_minutes = today.getMinutes();

    if (duration_hours_string != "") {
        duration_hours = parseInt(duration_hours_string);
        duration_minutes = parseInt(duration_minutes_string);
        extra_hours = (current_minutes + duration_minutes) / 60;
        time_hours = (current_hours + duration_hours + extra_hours) % 24;
        time_minutes = (current_minutes + duration_minutes) % 60;
    } else {
        time_hours = parseInt(time_hours_string);
        time_minutes = parseInt(time_minutes_string);

        if (!am) {
          time_hours = (time_hours + 12) % 24 
        }
    }

    return (time_hours + ":" + time_minutes);
}

