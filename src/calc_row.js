/**
 * 상단 계산 행을 추가한다
 * @returns {FGR}
 */
function _create_calc_row(){

  if( ! this.cfg.calc_row)
    return this;

  this.scheme.forEach(function(v,i) {
    var div  = (i < this.cfg.fixed_header) ? 'calc_left' : 'calc_right';
    var attr = {
      readonly : true,
      id       : this.get_id() + '_calc_cell_' + i,
      disabled : v.type.match(/check|radio/),  // check, radio 타입인 경우 계산셀이 disabled 상태로 만들어진다.
    };

    this.calc_cell[i].attr(attr).css('border-left', '1px solid transparent').appendTo(this.div[div]);

    if(attr.disabled)
      this.calc_cell[i].find('input').attr('disabled', true);

  }.bind(this));
  return this;
};

/**
 * 상단 계산 행에 들어갈 값을 계산한다
 * @param col_index
 */
FGR.prototype.calc_calc_cell = function(col_index){

  var col = this.scheme[col_index];

  if(col.calc_row === undefined)
    return '';

  // col.calc_row 의 값으로는 'sum', 'avg', 'max', 'min' 등, FGR.prototype.calc 에 정의된 값들이 들어간다.
  var calc_result = this.calc[col.calc_row](this, col_index);
  return col.calc_title + '' + calc_result;
};

/**
 * 계산 행에서 사용할 function 모음
 * sum : 총합을 계산한다
 * avg : 산술 평균을 계산한다
 * max : 최대값을 계산한다
 * min : 최소값을 계산한다
 */
FGR.prototype.calc = {
  sum: function (_this, col_index) {
    var value = _this.data.reduce(function(a,b) { return ( a + b[col_index]) }, 0);
    return _to_comma_format(value);
  },
  avg: function (_this, col_index) {
    
    var not_null = function(v  ) { return v[col_index] != null };
    var add      = function(a,b) { return a + b[col_index]; };
    var filtered = _this.data.filter(not_null);
    var result   = filtered.reduce(add, 0) / filtered.length;
    
    return (result).toLocaleString('en');
  },
  max: function (_this, col_index) {
    var max = Number.MIN_SAFE_INTEGER;

    _this.data.forEach(function(v,i){
      var val = v[col_index];
      if(val == null)
        return true;
      else if(val > max)
        max = val;
    });

    if(max <= Number.MIN_SAFE_INTEGER){
      return (max = '');
    } else {
      return _to_comma_format(max);
    }
  },
  min: function (_this, col_index) {
    var min = Number.MAX_SAFE_INTEGER;

    _this.data.forEach(function(v,i){
      var val = v[col_index];
      if(val == null)
        return true;
      else if(min > val)
        min = val;
    });

    if(min >= Number.MAX_SAFE_INTEGER){
      return (min = '');
    } else {
      return _to_comma_format(min);
    }
  }
};

/**
 * 상단 계산 행의 값을 갱신한다.
 * @returns {FGR}
 */
FGR.prototype.refresh_calc_cell = function(col_index){
  var _this = this;
  
  /// 계산 지정된 모든 컬럼을 게산한다.
  if(col_index === undefined) {
    this.scheme.forEach(function(v,i){
      if(v.calc_row)
        _this.calc_cell[i].val(_this.calc_calc_cell(i));
    });

  // col_index 로 지정된 컬럼만을 계산한다.
  } else if (_.isNumber(col_index)){
    if(_this.scheme[col_index].calc_row)
      _this.calc_cell[col_index].val(_this.calc_calc_cell(col_index));
  }
  return this;
};
