/**
 * column header 에 필터 아이콘을 입력한다
 * @returns {FGR}
 */
function _create_filter_icon(){

  var _this     = this;
  this.div.filter = _create_filter_div.call(this);

  function f_toggle (e){
    if( ! _this.cfg.use_filter_div || _this.div.filter.is(':visible'))
      return _this.div.filter.hide();

    _this.div.filter.slideDown();
  }

  this.scheme.forEach(function(column, col) {
    var div    = (col < this.cfg.fixed_header) ? this.div.top_corner : this.div.col_label;
    var header = div.find('div[col=' + col + ']');
    var attr   = { 'class': _style.filter_btn, col: col};

    if( ! /&checkbox|&radio/.test(column.label))
      header.css('cursor', 'pointer')
        .click(f_toggle);

    // 각 header title 에 filter icon 을 부착한다.
    column.filter_icon = $('<div>', attr).appendTo(header.last());
  }.bind(this));
  return this;
};

/**
 * filter 시 사용할 펑션들
 */
var _filter_functions = {
  // d : 필터링 할 데이터, v : 사용자가 입력한 비교 값

  // string, number filter functions
  equal       : function (d,v) { return (d === v) },
  not_equal   : function (d,v) { return (d !== v) },
  begins_with : function (d,v) { return String(d).startsWith(v) },
  ends_with   : function (d,v) { return String(d).endsWith(v) },
  contains    : function (d,v) { return (String(d).indexOf(v) >= 0) },
  not_contain : function (d,v) { return (String(d).indexof(v) <  0) },

  // number filter functions
  less_than     : function (d,v) { return (d < v) },
  greater_than  : function (d,v) { return (d > v) },
  less_equal    : function (d,v) { return (d <= v) },
  greater_equal : function (d,v) { return (d >= v) },

  // check filter functions
  //is_true_check  : function (d,v){return d !== null && d !== undefined && d > 0;},
  //is_false_check : function (d,v){return d === null || d === undefined || d === 0;}
};

/**
 * filter div 내부에서 사용할 select (column selector) 를 생성한다
 * @param type
 * @returns
 */
function _create_filter_column_select(_this, attribute){

  var selector = $('<select>', attribute);

  _this.scheme.forEach(function(column, i) {
    // column 의 width 가 2 이하라면 ( 숨겨진 상태라면 ) 필터링 대상에서 제외한다
    if(column.width > 2){
      var label = column.label
        .replace(/\&checkbox|&radio/g, '')
        .replace(/\|\|/g, ',')
        .replace(/^,|,$/g, '');
      $('<option>', {text: label, value: i, type: column.type}).appendTo(selector);
    }
  });
  return selector;
};

/**
 * filter div 의 상단부 정렬 영역을 생성한다.
 * div 는 다음과 같은 형태로 구성된다.
 * ┌────────┬───────────────┬────────────────┬─────────────┬──────────────┐
 * │ select │ checkbox(asc) │ checkbox(desc) │ plus button │ minus button │
 * └────────┴───────────────┴────────────────┴─────────────┴──────────────┘
 * select   : 적용할 컬럼을 선택한다 - name: {id}_filter_sort_column
 * chk(asc) : 오름차순으로 정렬 옵션 - name: {id}_filter_sort_asc
 * chk(desc): 내림차순으로 정렬 옵션 - name: {id}_filter_sort_desc
 * + button : 조건 추가 버튼
 * - button : 조건 삭제 버튼
 * @returns
 */
function _create_filter_sort_div(_this){

  // 체크박스 클릭 이벤트 펑션
  function click_sort () {
    var $this = $(this);
    if( ! $this.prop('checked')) return;
    $this.closest('div').find('input[type=checkbox]').prop('checked', false);
    $this.prop('checked', true);
  };

  // +, - 버튼 클릭 이벤트 펑션
  function click_plus_minus () {
    var $this      = $(this);
    var parent_div = $this.closest('div');
    if('plus' === $this.attr('func')){
      // + 버튼을 클릭하면 정렬 정보 입력 div 를 추가한다
      var s_div = parent_div.clone(true, true);
      s_div.find('button').css('visibility', '');
      s_div.insertAfter(parent_div);
    } else {
      // - 버튼을 클릭하면 정렬 정보 입력 div 를 제거한다
      parent_div.remove();
    }
  };

  var attr = {
    sort_area  : {'class': _style.filter_sort_div, style: 'padding-left: 78px;'},
    sort_title : {'class': _style.filter_sort_title},
    sort_div   : { },
    s_select   : { 'class': _style.filter_check, type: 'sort', func: 'column',
                   name   : _this.get_id() + '_filter_sort_column', },
    sort_asc   : { 'class': _style.filter_check, type:'checkbox', order: 'sort_asc' },
    check_asc  : { 'class': _style.filter_check, type:'checkbox', order: 'sort_asc' },
    check_desc : { 'class': _style.filter_check, type:'checkbox', order: 'sort_dessc' },
    plus_btn   : {'class': _style.filter_plus_btn,  func: 'plus' },
    minus_btn  : {'class': _style.filter_minus_btn, func: 'minus'},
  };

  var sort_area      = $('<div>', attr.sort_area );
    var sort_title   = $('<label>', attr.sort_title);
    var sort_div     = $('<div>', attr.sort_div);
      var s_select   = _create_filter_column_select(_this, attr.s_select);
      var sort_asc   = $('<label>', attr.sort_asc);
        var chk_asc  = $('<input>', attr.check_asc).change(click_sort);
        var msg_asc  = _msg.sort_asc;
      var sort_desc  = $('<label>', attr.check_desc);
        var chk_desc = $('<input>', attr.check_desc).change(click_sort);
        var msg_desc = _msg.sort_desc;
      var plus_btn   = $('<button>', attr.plus_btn).click(click_plus_minus);
      var minus_btn  = $('<button>', attr.minus_btn).click(click_plus_minus).css('visibility', 'hidden');
  
  sort_area.append(sort_title, sort_div);
    sort_div.append(s_select, sort_asc, sort_desc, plus_btn, minus_btn);
    sort_asc.append(chk_asc, msg_asc)
    sort_desc.append(chk_desc, msg_desc);

  if( ! _this.cfg.use_sort_panel) sort_area.hide();

  return sort_area;
};

/**
 * filter div 의 중단부 필터 조건 영역을 생성한다.
 * div 는 다음과 같은 형태로 구성된다.
 * ┌─────────┬─────────┬─────────┬───────┐
 * │ select1 │ select2 │ select3 │ input │
 * └─────────┴─────────┴─────────┴───────┘
 * select1 - name : {id}_filter_cond_operator
 * select2 - name : {id}_filter_cond_column
 * select3 - name : {id}_filter_cond_condition
 * input   - name : {id}_filter_cond_value
 *
 * @returns
 */
function _create_filter_condition_div(_this){

  // +, - 버튼으로 정렬 정보 입력 div 를 추가, 삭제한다
  function click_plus_minus () {
    var $this       = $(this);
    var $parent_div = $this.closest('div');
    if('plus' === $this.attr('func')){
      $parent_div.clone(true, true).insertAfter($parent_div)
        .css('border-top', '1px solid transparent')
        .find('button, select').css('visibility', '');
    } else {
      $parent_div.remove();
    }
  }
  
  // 필터 연산자 변경
  function operator_change () {
    var $this  = $(this);
    var border = ('AND' === $this.val()) ? '1px solid transparent' : '1px solid red';
    $this.closest('div').css('border-top', border);
  }
  
  // 필터 대상 컬럼 변경
  function column_change () {
    var $this       = $(this);
    var condition   = $this.closest('div').find('select[func=condition]');
    var selector    = (function() {
      var type = _this.scheme[$this.val()].type;
      if(type.match(/check|radio/)) return 'check'; 
      if(type === 'number')         return 'number';
      else                          return 'str';
    })();

    if(_this.is_IE()){
      condition.find('option').attr('disabled', true);
      condition.find('option[d_type*=' + selector + ']').attr('disabled', false);
    } else {
      condition.find('option').hide();
      condition.find('option[d_type*=' + selector + ']').show();
    }
  }

  var _id = _this.get_id();

  var div             = $('<div>',    {'class': _style.filter_sort_div});
    var sort_title    = $('<label>',  {'class': _style.filter_filter_title});
    var cond_div      = $('<div>',    {'class': _style.filter_cond});
      var f_operator  = $('<select>', { func: 'operator',  name: _id +'_filter_cond_operator'}).change(operator_change);
        var opt_and   = $('<option>', {text: 'AND', value: 'AND' });
        var opt_or    = $('<option>', {text: 'OR',  value: 'OR'  });
      var f_column    = _create_filter_column_select(_this, {func: 'column', type: 'cond', name: _id +'_filter_cond_column'}).change(column_change);
      var f_condition = $('<select>', { func: 'condition', name: _id +'_filter_cond_condition'});
        //var options
      var f_value     = $('<input>',  { func: 'value',     name: _id +'_filter_cond_value'});
      var plus_btn    = $('<button>',{'class': _style.filter_plus_btn,  func: 'plus' }).click(click_plus_minus);
      var minus_btn   = $('<button>',{'class': _style.filter_minus_btn, func: 'minus'}).click(click_plus_minus);

  // options of f_condition
  f_condition.append([
    {html: _msg.filter_none, value: 'none',         d_type: 'number,str,check'},
    {html: _msg.filter_eq,   value: 'equal',        d_type: 'number,str'},
    {html: _msg.filter_ne,   value: 'not_equal',    d_type: 'number,str'},

    {html: _msg.filter_lt,   value: 'less_than',    d_type: 'number'},
    {html: _msg.filter_gt,   value: 'greater_than', d_type: 'number'},
    {html: _msg.filter_le,   value: 'less_equal',   d_type: 'number'},
    {html: _msg.filter_ge,   value: 'greater_equal',d_type: 'number'},

    {html: _msg.filter_begin,value: 'begins_with',  d_type: 'number,str'},
    {html: _msg.filter_end,  value: 'ends_with',    d_type: 'number,str'},
    {html: _msg.filter_cont, value: 'contains',     d_type: 'number,str'},
    {html: _msg.filter_ncont,value: 'not_contain',  d_type: 'number,str'}
    //{html: 'True 값 있음', value: 'is_true_check', d_type: 'check'},
    //{html: 'False 값 없음',value: 'is_false_check',d_type: 'check'}
  ].map( function (attr) { return $('<option>', attr) } ));

  // assemble
  div.append(sort_title, cond_div);
  cond_div.append(f_operator, f_column, f_condition, f_value, plus_btn, minus_btn);
  f_operator.append( opt_and, opt_or );

  // 후처리
  cond_div.find('select').change();
  div.find('select[func=operator]').eq(0).val('OR').css('visibility', 'hidden');
  div.find('button[func=minus]').eq(0).css('visibility', 'hidden');
  
  if( ! _this.cfg.use_filter_panel) div.hide();

  return div;
};

/**
 * 정렬/필터 panel 의 설정을 되돌린다
 * @returns {FGR}
 */
FGR.prototype.clear_filter_condition = function(_this) {
  var that = _this || this;

  that.div.filter.find('.' + _style.filter_minus_btn).each(function(){
      var $this = $(this);
      if($this.css('visibility') !== 'hidden') $this.click();
  });

  that.div.filter.find('input[type=checkbox]').prop('checked', false);
  
  var filter_div = that.div.filter.find('.' + _style.filter_sort_div);

  filter_div.find('select').each(function(){
    var $this = $(this);
    var value = $this.find('option').first().val();
    $this.val(value).change();
  });
  filter_div.find('input').val('');
  return this;
};

/**
 * filter 설정용 div 를 생성한다
 * @param col
 * @returns
 */
function _create_filter_div(){
  var _this = this;
  var attr  = {
      div   : { 'id': this.get_id() +'_filter_div', 'class': _style.filter_div },
      run   : { 'text' : _msg.filter_run,   'class': _style.filter_inner_btn },
      clear : { 'text' : _msg.filter_clear, 'class': _style.filter_inner_btn },
      close : { 'text' : _msg.filter_close, 'class': _style.filter_inner_btn },
  };
  var div          = $('<div>', attr.div);
    var sort_div   = _create_filter_sort_div(this);       // 정렬 설정 입력칸을 생성한다
    var filter_div = _create_filter_condition_div(this);  // 필터 설정 입력칸을생성한다
    var btn_run    = $('<button>', attr.run).click(  function() { return _this.run_filter(_this) } );
    var btn_clear  = $('<button>', attr.clear).click(  function() { return _this.clear_filter_condition(_this) } );
    var btn_close  = $('<button>', attr.close).click(  function() { return div.hide() } );
  
  // assemble
  this.div.main.append(div);
  div.append(sort_div, filter_div, btn_run, btn_clear, btn_close);
  div.draggable({ containment: "parent" });

  return div;
};

/**
 * filter div 에서 '적용' 버튼을 입력하면 호출되는 필터링 펑션
 */
FGR.prototype.run_filter = function(_this){

  var functions = _this.collect_filter_functions(); // 필터링 조건을 참고하여 연산자별 필터링 펑션을 수집한다

  // # target_row 가 필터링 조건에 맞는지 검사하는 펑션
  function is_matched_data (target_row) {
      var d_validate;
      loopJ : for(var j = 0; j < functions.length; ++j){
        d_validate = false;
        var _and;
        loopK : for(var k = 0; k < functions[j].length; ++k){
          var _filter= functions[j][k];
          if(_filter.func === undefined) continue loopK;
          _and = _filter.func(target_row[_filter.col], _filter.value);
          if( ! _and) break loopK;
        }
        if(_and){
          d_validate = true;
          break loopJ;
        }
      }
      return d_validate;
  }; // #

  // ## 필터링된 데이터를 정렬한다
  function sort_filtered_data (_this) {
      var s_div       = _this.div.filter.find('._fg_filter_sort_div');
      var $columns    = s_div.find('select[name=' + _this.get_id() + '_filter_sort_column]');
      var check_asc   = s_div.find('input[order=sort_asc]');
      var check_desc  = s_div.find('input[order=sort_desc]');
      var sort_driver = [];  // 정렬시 이용할 자료의 배열
      
      $columns.each(function(i, column){
        var col         = _toInt($(this).val());
        var order_asc   = check_asc.eq(i).prop('checked');
        var order_desc  = check_desc.eq(i).prop('checked');
        var is_number   = _this.scheme[col].type === 'number';
        var not_checked = !order_asc && !order_desc;

        if(not_checked) return true;  // 선택된 체크박스가 없다면 건너뛴다

        var sort_func = _this.sort_func(col);  // 정렬 function 을 가져온다
        var func      = sort_func[(is_number ? 'number_' : 'str_') + (order_asc ? 'asc' : 'desc')];
        sort_driver.push({ col:col, func:func });
      });

      // sort parameter function
      function sort_f (a,b) {
        for(var i = 0; i < sort_driver.length; ++i){
          var col = sort_driver[i].col;
          if(a[col] !== b[col]) return sort_driver[i].func(a,b);
        }
        return 0;
      };

      if(sort_driver.length > 0){
        // 정렬 조건이 입력된 상태라면 조건에 따라 정렬을 한다
        _this.data.sort(sort_f);
        _this.sorted = true;
      } else if (_this.sorted){
        // 정렬 조건이 입력되지 않았는데, 정렬된 상태라면 정렬을 revert 한다.
        _this.data.sort( _this.sort_func(0).revert );
        _this.sorted = false;
      } else {
        // 정렬 조건이 입력되지 않았고, 정렬된 상태가 아니라면 정렬하지 않는다.
      }
  }; // ##

  // 1. 필터 작업
  if( ! _this.validate_filter_options()) return alert('잘못된 입력입니다');

  _this.div.filter.hide(); // filter 설정창을 닫는다

  if(_this.pre_filter_data) _this.data = _this.pre_filter_data;

  // 필터링 복원을 위해 기존의 data array 를 pre_filter_data 에 보관한다
  _this.pre_filter_data = _this.data;

  var post_filter_data = []; // 필터링 결과를 담을 배열을 선언한다
  // 필터링 작업을 수행한다
  if(functions.length > 0){
    post_filter_data = _this.data.filter(is_matched_data);
    _this.filtered   = true;
  } else {
    post_filter_data = _this.data;
    _this.filtered   = false;
  }
  _this.data = post_filter_data;

  // 2. 정렬 작업
  sort_filtered_data(_this);
  _this.refresh_calc_cell();

  // 3. 화면 렌더링 -----------------------------------------------------
  // 공백 row 처리
  if(_this.data.length < _this.rows.length){
    var last       = _this.rows.length - _this.data.length;
    var empty_rows = _this.create_init_data(last);
    _this.data = _this.data.concat(empty_rows);
  }

  _this.scroll_row(-_this.data.length * 2);          // 스크롤을 가장 위로 올린다
  _this.render_data(_this, _this.current_top_line);  // 데이터를 보여준다
  _this.scroll_v_inner.height(_this.data.length * _this.cfg.row_height);

  // 필터링 된 컬럼의 깔대기 아이콘의 색깔을 바꿔준다
  _this.scheme.forEach(function(col){
    col.filter_icon.attr('class', _style.filter_btn);
  });
  
  for(var i = 0; i < functions.length; ++i){
    for(var j = 0; j < functions[i].length; ++j){
      var filtered_column = (functions[i][j].col);
      _this.scheme[filtered_column].filter_icon.attr('class', _style.filter_btn_red);
    }
  }
  return;
};

/**
 * 필터링 옵션을 검사한다
 */
FGR.prototype.validate_filter_options = function(){
  var _id = this.get_id();
  var col  = this.div.filter.find('select[name=' + _id + '_filter_cond_column]');
  var val  = this.div.filter.find('input[name=' + _id + '_filter_cond_value]');

  for(var i = 0; i < col.length; ++i){
    var column     = col.eq(i).val();
    var type       = this.scheme[column].type;
    var number_str = _is_number_str(val.eq(i).val());
    
    if(type === 'number' && ! number_str){
      val.eq(i).focus();
      return false;
    }
  }
  return true;
};

/**
 * filter 작업시 사용할 function 을 수집한다
 */
FGR.prototype.collect_filter_functions = function(){

  var _id       = this.get_id();
  var div       = this.div.filter;
  var op        = div.find('select[name='+_id+'_filter_cond_operator]');
  var col       = div.find('select[name='+_id+'_filter_cond_column]');
  var cond      = div.find('select[name='+_id+'_filter_cond_condition]');
  var val       = div.find('input[name='+_id+'_filter_cond_value]');
  var functions = [];

  U.range(op.length).forEach( function(i) {
      var is_empty_value = /^\s*$/.test(val.eq(i).val());

      if(is_empty_value) return;

      // OR operation 이라면 새로운 array 를 추가하고
      // AND operation 이라면 기존의 마지막 array 에 추가한다. (단, 마지막 array 가 존재하지 않는다면 새로운 array 를 추가한다.
      var and_array = ('OR' === op.eq(i).val()) ? [] : (functions.pop() || []);
      var f_name    = cond.eq(i).val();
      var f_data    = {
          col  : _toInt(col.eq(i).val()),
          func : _filter_functions[f_name],
          value: val.eq(i).val(),
      };
      if(this.scheme[f_data.col].type === 'number'){
        if(_is_number_str(f_data.value))
          f_data.value = Number(f_data.value);
      }
      and_array.push(f_data);
      functions.push(and_array);
  }.bind(this));
  return functions;
};

/**
 * data 필터링 작업을 수행한다.
 * 
 * @param is_matched_data : filter 펑션
 * @param target_column   : 필터링 작업이 끝난 후, 필터 아이콘을 표시할 컬럼 넘버의 배열
 * @returns {FGR}
 * 
 * 예)
 * grid.data_filter(function( row ){ return row[4] > 5000;  }, [4]);     // 4 번 컬럼의 값이 5000 초과인 행을 필터링한다. 이후 4번 컬럼에 필터 아이콘을 표시한다.
 * grid.data_filter(undefined, []);                                      // 필터링을 원상태로 복구하고, 필터 아이콘을 전부 숨긴다.
 */
FGR.prototype.data_filter = function(is_matched_data, target_column){

  var _this = this;

  // 이미 사전에 필터링 되어 있는 상태라면 필터링 상태를 복원한다.
  if(_this.pre_filter_data) _this.data = _this.pre_filter_data;

  // 필터링 복원을 위해 기존의 data array 를 pre_filter_data 에 보관한다
  _this.pre_filter_data = _this.data;
  
  // 필터링 작업을 수행한다
  var do_filter = U.isFunction(is_matched_data);

  // 필터링 결과를 담을 배열을 선언한다. 추후 이 배열이 this.data 에 입력된다.
  _this.data = do_filter ? _this.data.filter(is_matched_data) : _this.data;

  // 필터링 된 상태인지를 표시한다.
  _this.filtered = do_filter;

  // calc_row 를 갱신한다.
  _this.refresh_calc_cell();

  // 공백 row 처리
  if(_this.data.length < _this.rows.length){
    var empty_rows = _this.create_init_data(_this.rows.length - _this.data.length);
    _this.data       = _this.data.concat(empty_rows);
  }

  _this.scroll_row(-_this.data.length * 2);          // 스크롤을 가장 위로 올린다
  _this.render_data(_this, _this.current_top_line);  // 데이터를 보여준다

  // 스크롤 바 사이즈를 조절한다
  _this.scroll_v_inner.height(_this.data.length * _this.cfg.row_height);

  // 필터링 된 컬럼의 깔대기 아이콘의 색깔을 바꿔준다
  _this.scheme.forEach(function(col){
    col.filter_icon.attr('class', _style.filter_btn);
  });
  
  target_column.forEach( function(column) {
    _this.scheme[column].filter_icon.attr('class', _style.filter_btn_red);
  });
  return this;
};
