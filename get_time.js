  
function get_time(){
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  return (hours + ":" + ("0" + minutes).slice(-2));
}
