function time_start (msg){ return (time_start[msg] = new Date().getTime()); }

function time_end(msg){
  var result = new Date().getTime() - time_start[msg];
  console.log(msg + ' : ' + result);
  return result;
}

window.time_start = time_start;
window.time_end = time_end;