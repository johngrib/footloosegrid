/**
 * 정렬에 사용되는 펑션 모음
 * @param col
 * @returns {object}
 */
FGR.prototype.sort_func = function(col){
  return {
    number_asc: function (a,b) {
      if(a[col] === null) return 1;
      if(b[col] === null) return -1;
      return  a[col] - b[col];
    },
    number_desc: function (a,b) {
      if(a[col] === null) return 1;
      if(b[col] === null) return -1;
      return -a[col] + b[col];
    },
    str_asc: function (a,b) {
      if(a[col] === null || a[col] === '') return 1;
      if(b[col] === null || b[col] === '') return -1;
      return (a[col] < b[col]) ? -1 : 1;
    },
    str_desc: function (a,b) {
      if(a[col] === null || a[col] === '') return 1;
      if(b[col] === null || b[col] === '') return -1;
      return (a[col] > b[col]) ? -1 : 1;
    },
    revert: function (a,b) {
      return  a.index - b.index;
    },
  };
};