/** 사용자 정의 데이터 타입 */
FGR.prototype.custom_cell_define = {};

/**
 * 이벤트 핸들러 펑션
 */
FGR.prototype.event_handler = { };

/** change_val : 값을 편집할 수 있게 하는 최중요 펑션 */
FGR.prototype.event_handler.change_val = function(e, evt_process) {

  var loc      = this.get_loc(e.target);
  var before   = this.data[loc.row][loc.col];
  var editable = this.is_editable_cell(loc.row, loc.col);
  var cell     = this.event_handler.cell = { editable: editable, loc: loc, };

  if (editable) {
    var $cell = $(e.target);
    var column = this.scheme[loc.col];
    this.data[loc.row][loc.col] = column.data_push($cell, loc, column.getter($cell));
  } else {
    return this.refresh();
  }

  var after = this.data[loc.row][loc.col];

  if(before !== after && evt_process === undefined){
    this.data[loc.row].modified = true;
    _change_event_processor(e, this, before, after);
  }
};

/** focus_in 이벤트 핸들러 */
FGR.prototype.event_handler.focus_in = function(e) {

  var $target  = $(e.target);
  var loc      = this.get_loc(e.target);
  var temp_cell= this.event_handler.cell;
  var editable = this.is_editable_cell(loc.row, loc.col);

  // 중복 focus in 을 방지한다
  if(temp_cell && temp_cell.loc.row === loc.row && temp_cell.loc.col === loc.col)
    return;

  this.event_handler.cell = { loc: loc, editable: editable, };

  this.div.filter.hide();

  // 직전에 선택된 cell 의 disabled 속성을 풀어준다
  if(this.pre_cell) this.pre_cell.removeAttr('disabled');

  // 선택된 컬럼을 기록해 둔다
  this.col_selected = loc.col;

  // 편집 금지된 셀이라면 추후 발생할 이벤트를 방지한다
  if(!editable) e.preventDefault();

  var focus_in_after = this.scheme[loc.col].focus_in;

  if(focus_in_after) focus_in_after.bind(this)(e, $target, loc);

  // 편집 금지된 셀이라면 disabled 속성을 입력한다.
  $target.attr('disabled', ! editable);

  // 선택된 셀 객체를 보관한다.
  this.pre_cell = $target;

  if(editable) _focusin_event_processor(e, this);
  
  return e;
};

/** focus_out 이벤트 핸들러 */
FGR.prototype.event_handler.focus_out = function(e) {
  //change_val(e, false);
  // focus out 이벤트가 발생한 경우 사용자 정의 focusout 이벤트를 실행시킨다
  if(this.event_handler.cell.editable)
    _focusout_event_processor(e, this);
};

FGR.prototype.event_handler.focus_number = function(e) {
  // number 타입의 cell 에 focus 가 들어간 경우, 콤마 형식의 숫자가 아니라 원본 숫자 데이터를 보여준다.
  //focus_in(e);
  var $cell = this.event_handler.cell;
  
  if($cell.editable){
    var loc   = $cell.loc;
    var value = this.data[loc.row][loc.col]; // 편집 가능한 셀이라면 콤마를 제거한 원본 숫자를 보여준다
    this.event_handler.temp_number = value;
    $(e.target).val(value); 
  }
};

FGR.prototype.event_handler.focus_out_number = function (e){
  // number 타입의 cell 에서 focus 가 해제되면, 콤마 형식의 숫자로 변환하여 보여준다.
  var loc    = this.get_loc(e.target);
  var v      = this.data[loc.row][loc.col];
  var $this  = $(e.target);
  var is_null= (_.isNull(v) || /^\s*$/.test(v));

  if(is_null)
    $this.val(null);
  else
    $this.val(_to_comma_format(v));

  if(this.scheme[loc.col].calc_row && this.event_handler.temp_number !== v)
    this.refresh_calc_cell(loc.col);

  if(this.event_handler.cell.editable)
    _focusout_event_processor(e, this);
};

/**
 * 데이터 셀의 종류와 속성을 정의한다.
 *
 * element   : 사용할 html tag
 * type      : input tag 일 경우의 type
 * event     : 해당 element 에 부여할 이벤트 펑션 목록
 * data_push : 화면 상의 데이터를 this.data 에 입력할 때의 전처리 펑션 (예: 숫자 형식의 문자열에서 콤마를 제거하는 등)
 * setter    : Cell setter
 * getter    : Cell getter
 */
function _create_cell_define(_this){
  
  function _set_interceptor_2_(target, interceptor, secondArg){ 
    return function(e){ interceptor(e, secondArg); target(e); }; 
  }

  //setter($cell, value, row, col, this);
  var cell_def     = {};
  var std_setter   = function ($cell,v) { return $cell.val(v) };
  var std_getter   = function ($cell  ) { return $cell.val( ) };
  var text_setter  = function ($cell,v) { return $cell.text(v) };
  var text_getter  = function ($cell  ) { return $cell.text( ) };
  var check_setter = function ($cell,v) { return $cell.prop('checked', _.isNumber(v) && v > 0) };
  var check_getter = function ($cell  ) { return $cell.prop('checked') ? 1 : 0; };
  var key_down     = function (e) { _move_focus(e, _this); };      // key_down 시 cursor focused 를 이동한다.
  var change_val   = _this.event_handler.change_val.bind(_this);  // 값을 편집할 수 있게 하는 최중요 펑션
  var focus_in     = _this.event_handler.focus_in.bind(_this);
  var focus_out_num= _this.event_handler.focus_out_number.bind(_this);

  var tmp_focus_out= _this.event_handler.focus_out.bind(_this);
  var tmp_focus_num= _this.event_handler.focus_number.bind(_this);

  var focus_out = _set_interceptor_2_(tmp_focus_out, change_val, false);  // focus_out 실행전에는 change_val 이 먼저 실행된다
  var focus_num = _set_interceptor_2_(tmp_focus_num, focus_in, undefined);  // focus_num 실행전에는 focus_in 이 먼저 실행된다
  
  /*
   * data_push 는 화면 상의 문자열을 가공하여 data 배열에 입력할 값으로 변경해주는 함수이다.
   * 화면 상 셀의 값은 모두 문자이기 때문에 이 변경은 숫자 형식인 경우 특히 중요하다.
   * 
   * input_formatter : 화면상의 cell 에 담긴 String 을 데이터화하기 좋은 String 으로 재가공한다.
   * input_validator : 화면상의 cell 에 담긴 String 이 형식에 맞는지 검사한다.
   * input_slicer    : formatter 가 리턴한 문자열을 지정된 길이로 자른다.
   * input_caster    : formatter 가 리턴한 문자열을 해당 타입으로 캐스팅한다. (예: 문자열을 숫자 타입으로 변환)
   * output_css      : 값을 입력함과 동시에 cell 의 css 를 변경해준다.
   */

  // data types *********************************
  cell_def.str = {
    element   : 'input',
    type      : 'text',
    style     : _style.input,
    width_adj : -11,
    //output_css      : undefined,
    //output_validator: _.isString,
    //output_formatter: undefined,
    getter    : std_getter,
    setter    : std_setter,
    init_data : null,
    //input_validator: _.isString,
    //input_formatter: undefined,
    //input_caster   : String,
    event : {
      focusin : focus_in,
      focusout: focus_out,
      keydown : key_down,
      keyup   : change_val,
    },
  };

  cell_def.str_label = {  // 헤더에서 사용하는 셀 타입
    element   : 'input',
    type      : 'text',
    style     : _style.input,
    width_adj : -11,
    //output_css      : undefined,
    //output_validator: _.isString,
    //output_formatter: undefined,
    getter    : std_getter,
    setter    : std_setter,
    init_data : null,
    //input_validator: _.isString,
    //input_formatter: undefined,
    //input_caster   : String,
    event : {
      keydown : key_down,
      keyup   : change_val,
      focusin : focus_in,
      focusout: focus_out,
    },
  };

  cell_def.number = {
    element   : 'input',
    type      : 'text',
    style     : _style.input,
    width_adj : -11,
    output_css      : function (v) { return { color: (v < 0) ? 'red' : 'black' }; }, // return css style by number
    output_validator: _.isNumber,
    output_formatter: _to_comma_format, // return number comma format applied
    getter    : std_getter,
    setter    : std_setter,
    init_data : null,
    input_validator: _is_number_str,
    input_formatter: function (v) { return v.replace(/,/g, '') },
    input_caster   : Number,
    event : {
      keydown : key_down,
      keyup   : change_val,
      focusin : focus_num,
      focusout: focus_out_num,
    },
  };

  cell_def.check = {
    element   : 'input',
    type      : 'checkbox',
    style     : _style.check,
    width_adj : 0,
    //output_css      : undefined,
    //output_validator: undefined,
    //output_formatter: undefined,
    getter    : check_getter,
    setter    : check_setter,
    init_data : 0,
    input_validator: _.isNumber,
    //input_formatter: undefined,
    //input_caster   : undefined,
    event : { change : change_val, },
  };

  cell_def.radio = {
    element   : 'input',
    type      : 'radio',
    style     : _style.check,
    width_adj : 0,
    //output_css      : undefined,
    //output_validator: _.isNumber,
    //output_formatter: undefined,
    getter    : check_getter,
    setter    : check_setter,
    init_data : 0,
    //input_validator: _.isString,
    //input_formatter: undefined,
    //input_caster   : String,
    after_input: function($cell, loc, value){
      // 필터링 된 상태에서 라디오 버튼을클릭한다면, pre_filter_data 의 라디오 버튼 값을 청소해 주어야 한다
      // 필터를 풀었을 때, 라디오 버튼 값이 1 개를 초과할 일을 방지하기 위함.
      var data = (_this.pre_filter_data) ? _this.pre_filter_data : _this.data;
      data.forEach(function(v){ v[loc.col] = 0; });
    },
    event : {
      focusin : focus_in,
      change  : change_val,
    },
  };

  cell_def.select = {
    element   : 'select',
    style     : _style.select,
    width_adj : 0,
    //output_css      : undefined,
    //output_validator: undefined,
    //output_formatter: undefined,
    child     : 'option',  // child 는 select 의 하위에 들어갈 element name 이며,
    scheme    : 'option',  // scheme 은 사용자 설정에서 참고할 key 값이다.
    getter    : std_getter,
    setter    : std_setter,
    init_data : null,
    //input_validator: undefined,
    //input_formatter: undefined,
    //input_caster   : undefined,
    event : {
      focusin : focus_in,
      change  : change_val,
    },
  };

  cell_def.date = {
    element   : 'input',
    type      : 'text',
    style     : _style.input,
    width_adj : -11,
    //output_css      : undefined,
    //output_validator: undefined,
    //output_formatter: undefined,
    getter    : std_getter,
    setter    : std_setter,
    init_data : null,
    //input_validator: undefined,
    //input_formatter: undefined,
    //input_caster   : undefined,
    event : {
      focusin : focus_in,
      focusout: focus_out,
      keydown : key_down,
      change  : change_val,
      keyup   : change_val },
    focus_in : function(e, $cell, loc){ 
      // date 타입의 셀이라면 editable 속성을 따져 datepicker 를 생성하거나 제거한다
      var editable = this.is_editable_cell(loc.row, loc.col);
      $cell.datepicker(editable ? this.scheme[loc.col].date : 'destroy');
    },
  };

  cell_def.gen = {
    element   : 'div',
    type      : 'text',
    style     : _style.input,
    width_adj : -11,
    //output_css      : undefined,
    //output_validator: undefined,
    //output_formatter: undefined,
    getter    : text_getter,
    setter    : text_setter,
    //input_validator: undefined,
    //input_formatter: undefined,
    //input_caster   : undefined,
    init_data : '',
  };

  cell_def.gen_label = {
    element   : 'div',
    type      : 'text',
    style     : _style.input,
    width_adj : 0,
    //output_css      : undefined,
    //output_validator: undefined,
    //output_formatter: undefined,
    getter    : text_getter,
    setter    : text_setter,
    //input_validator: undefined,
    //input_formatter: undefined,
    //input_caster   : undefined,
    init_data : '',
  };

  cell_def.img = {
    element   : 'div',
    type      : '',
    style     : _style.img,
    width_adj : 0,
    //output_css      : undefined,
    //output_validator: undefined,
    //output_formatter: undefined,
    rule      : function (v) { return '' },
    getter    : text_getter,
    setter    : function($cell, v, row, col){ 
      var image = _this.scheme[col].rule(v);
      $cell.text((v === null) ? '' : v);
      $cell.css('background-image', image);
    },
    //input_validator: undefined,
    //input_formatter: undefined,
    //input_caster   : undefined,
    init_data : null,
  };

  cell_def.free = {
    element   : 'div',
    type      : '',
    style     : _style.input,
    width_adj : 0,
    init_data : null,
    event : {
      focusin : focus_in,
      focusout: focus_out,
      keydown : key_down,
      change  : change_val,
      keyup   : change_val,
    }
  };

  for(var key in _this.custom_cell_define){
    cell_def[key] = _this.custom_cell_define[key];
    if(cell_def[key].event === 'default'){
      cell_def[key].event = {
        focusin : focus_in,
        focusout: focus_out,
        keydown : key_down,
        change  : change_val,
        keyup   : change_val }
    }
  }
  return cell_def; 
};
