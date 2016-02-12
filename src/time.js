function time_start (msg){ return (time_start[msg] = new Date().getTime()); }

/** 퍼포먼스 테스트를 위한 time_end 펑션. console. timeEnd 와는 달리 카운트한 시간의 number 를 리턴한다 */
function time_end(msg){
  var result = new Date().getTime() - time_start[msg];
  console.log(msg + ' : ' + result);
  return result;
}