/**
 * row_label 과 data_table 에 row 를 추가한다
 *
 * Add_row()    : 하나의 row 를 추가한다
 * Add_row(30)  : 30 개의 row 를 추가한다
 * Add_row(2, 6): 2 개의 row 를 6 번 row 에 삽입한다. 기존 6 번 row 는 아래로 밀려 내려간다
 *
 * @param number   : (number) 추가할 row 의 수
 * @param row_index: (number) 삽입할 row 의 인덱스
 * @returns {FGR}
 */
FGR.prototype.Add_row = function(number, row_index){
  
  var num      = (number === undefined) ? 1 : number;
  var valid_in = _is_number(row_index);
  var arr_head = valid_in ? this.data.slice(0, row_index) : this.data;
  var arr_add  = this.create_init_data(num);
  var arr_tail = valid_in ? this.data.slice(row_index)    : [];

  this.data = arr_head.concat(arr_add, arr_tail);

  this.data.forEach(function(row, i){ row.index = i; });  // indexing for filter
  _adjust_scroll_v(this, this.data.length);
  this.refresh();
  return this;
};

/**
 * 데이터 로드
 * @param data
 * @param callback
 * @returns {FGR}
 */
FGR.prototype.Load_data = function(data, callback, filter, is_use_caster){

  var _this = this;
  
  // 0. 데이터 로드를 할 때마다 초기화해야 하는 변수들을 처리한다.
  _this.highlight_row     = -1;
  _this.row_selected      = -1;
  _this.col_selected      = false;
  _this.sorted            = false;
  _this.filtered          = false;
  _this.pre_filter_data   = undefined;
  _this.highlight_refresh = true;
  _this.clear_filter_condition(_this);
  _this.scroll_row(-_this.data.length * 2);  // 스크롤을 가장 위로 올린다
  
  _this.scheme.forEach(function(col){
    col.filter_icon.attr('class', _style.filter_btn);
  });
  
  // 1. this.data 변수에 데이터를 입력한다.
  (function(_this){

    var temp_data, i, j, row, value;

    // A. 2 dimention Array 의 경우
    if(Array.isArray(data) && Array.isArray(data[0])) {
      
      if(is_use_caster){
        temp_data = data.map(function(row) {
          return row.map(function(col, j) {
            var column = _this.scheme[j];
            return column.input_caster ? column.input_caster(col) : col;
          });
        });
      } else {
        temp_data = data;
      }

    // B. JSON Array 의 경우 (아마도 가장 일반적인 경우)
    } else if(Array.isArray(data) && _.isObject(data[0])){
      temp_data = [];

      for(i = 0; i < data.length; ++i){
        for(j = 0, row = []; j < _this.scheme.length; ++j){
          value  = data[i][_this.scheme[j].name];
          row[j] = (value === undefined) ? null : value;
        }
        temp_data[i] = row;
      }
    } else {
      //console.log('입력 데이터 형식이 2차원 배열 또는 JSON 배열이 아닙니다.');
      return false;
    }

    // 입력 데이터가 초기 데이터보다 row 수가 적은 경우를 처리한다
    if(_this.data.length > temp_data.length){
      for(i = 0; i < temp_data.length; ++i)
        for (j = 0; j < _this.data[i].length; ++j)
          _this.data[i][j] = temp_data[i][j];
    } else {
      _this.data = temp_data;
    }
    
    if(_.isFunction(filter)) _this.data = _this.data.filter(filter);

  })(this);

  // 2. 원본 데이터 보관 옵션이 true 라면 원본 데이터를 보관한다.
  if(this.cfg.save_original_data)
    this.original_data = this.data.map(function(v) { return v.slice(); });

  // 3. sort, filtering 복원 기능을 위한 인덱싱 작업을 한다
  for(var i = 0; i < this.data.length; ++i)
    this.data[i].index = i;

  // 4. 스크롤 바 처리
  this.div.scroll_v.css('overflow-y', this.data.length <= this.cfg.rows_show ? 'hidden' : 'scroll');
  _this.scroll_v_inner.height(this.data.length * _this.cfg.row_height);

  // 5. 데이터 표현
  if(this.cfg.paging) {  // 페이지 옵션이 지정되어 있다면
    //this.div[3][0].empty();  // TODO : 페이징 옵션에 대해 추가로 고민해 볼 것.
    //this.create_paging_buttons(this);
    //this.move_page(1);
    this.render_data(this, 0);
  } else if(this.cfg.drill_down){  // 드릴 다운 옵션이 있는 경우
    this.render_data(this, 0);
  } else {
    this.render_data(this, 0);
  }

  // 6. calc_cell 계산값 표현
  this.refresh_calc_cell();

  if(_.isFunction(callback)) callback();

  return this; };

/**
 * data_table 의 row 숫자를 리턴한다.
 * @returns
 */
FGR.prototype.Row_count = function(){
  return (this.data) ? this.data.length : this.div.data_table.find('.' + _style.row).length;
};

/**
 * row 를 삭제한다
 * @param row : (number) 삭제할 row 의 index 를 입력한다
 * @param col : (number) row 값으로 radio, check 등의 값을 입력할 경우 해당 컬럼의 인덱스
 * @returns {FGR}
 *
 * <p> 예제)
 * Delete_row(3);         -> 데이터 영역의 3번 row 를 삭제
 * Delete_row('all');     -> 데이터 영역의 모든 row 를 삭제
 * Delete_row([3, 1, 2]); -> 3, 1, 2 번 row 를 삭제한다
 *
 * Delete_row('check', 0); -> 0번 컬럼의 체크박스를 검사하여, 표시가 된 row 를 삭제한다
 * Delete_row('radio', 1); -> 1번 컬럼의 라디오 버튼을 검사하여, 표시가 된 row 를 삭제한다
 */
FGR.prototype.Delete_row = function(input_row, col){
  
  function is_check_type (row) {
    return /^(?:check|radio)$/i.test(row);
  };

  var _this = this;
  var row   = (input_row === undefined) ? this.data.length - 1 : input_row;

  // 1. 삭제할 target 수집
  var target_arr = (function(){
    if (is_check_type(row)) return _this.Get_checked(col);
    if (_is_number(row))    return [row];
    if (Array.isArray(row)) return row;
    if (/^all$/i.test(row)) return 'all';
    else                    return undefined;
  })();

  // 2. 삭제 작업 : deleted_data 에 백업 후 data 갱신
  if(target_arr === undefined) return this;

  if(target_arr === 'all'){
    this.deleted_data = this.deleted_data.concat(this.data);
    this.data         = this.create_init_data();
  } else {
    // 배열인 경우
    target_arr.forEach(function(v,i){ this.data[v].del = true; }, this);
    this.deleted_data = this.data.filter(function(row) { return  row.del });
    this.data         = this.data.filter(function(row) { return !row.del });
    this.deleted_data.forEach(function(row){ delete row.del; });
  }

  // 3. 삭제 후, 남아있는 row 가 페이지 상의 row 수보다 적은 경우를 처리한다.
  var empty_rows = this.rows.length - this.data.length;
  if(empty_rows > 0){
    // 빈 데이터 row 를 생성한 다음, this.data 에 이어 붙인다
    var empty_data = this.create_init_data(empty_rows);
    this.data        = this.data.concat(empty_data);
  }

  // 4. indexing
  this.data.forEach(function(row, i){ row.index = i; });

  this.refresh_calc_cell();
  // 5. rendering
  this.render_data(this, 0);
  _adjust_scroll_v(this, this.data.length);
  return this;
};

/**
 * 체크박스/라디오버튼이 있는 col 를 검사하여 체크 표시가 된 row 의 인덱스 넘버를 배열로 리턴한다
 * @param col
 * @returns {Array}
 *
 * ex)
 * Get_checked(0)    : 0 번 컬럼을 검사하여 체크 표시가 된 row 의 인덱스 넘버를 리턴한다
 * Get_checked('pk') : scheme 에서 name 을 pk 로 준 컬럼을 검사하여 체크 표시가 된 row 의 인덱스 넘버를 리턴한다
 */
FGR.prototype.Get_checked = function(column){
  
  var col     = (_.isString(col)) ? _.findIndex(this.scheme, {name: col}) : column;
  var checked = [];
  
  this.data.forEach(function(row, i){
    if(row[col] > 0) checked.push(i);
  });
  
  return checked;
};

/**
 * 컬럼 백그라운드 컬러링
 * 백그라운드 컬러를 투명하게 만들고 싶다면 color 값에 'transparent' 또는 '' 를 주면 된다
 * @param col_index
 * @param color
 * @returns {FGR}
 */
FGR.prototype.col_bg_color = function(col_index, color){
  if ( ! this.scheme[col_index])
    return this;
  this.scheme[col_index].bg_color = color;
  _create_col_style(this, col_index);
  return this;
};

/**
 * 컬럼 리사이징
 * size 를 0 로 주면 해당 컬럼이 사라지는 효과가 난다
 * size 를 음수 값으로 주면 사이즈가 초기값으로 복구된다
 *
 * @param col_index
 * @param size
 * @returns {FGR}
 */
FGR.prototype.col_resize = function(col_index, size){

  // cashing
  if( ! this.left_header_cells)  this.left_header_cells  = this.div.top_corner.find('.' + _style.cell);
  if( ! this.right_header_cells) this.right_header_cells = this.div.col_label.find('.' + _style.cell);

  var fence_col  = this.scheme[this.cfg.fixed_header - 1];
  var last_col   = this.scheme[this.scheme.length    - 1];
  var left_width = fence_col.left + fence_col.width;
  var   right_width= last_col.left  + last_col.width;
  var right_adj  = this.cfg.left_width - left_width;
  var right_rst  = this.cfg.right_width_show + right_adj + 1;

  // 1. 입력받은 size 를 해당 컬럼의 width 에 입력한다
  this.scheme[col_index].width = (size < 0) ? this.scheme[col_index].init_width : size;
  _set_cell_left_array.call(this);

  // 2. left/right 영역의  width 조정
  this.div.left.width(left_width + 2);
  this.div.top_corner.width(left_width);
  this.div.right.width(right_rst);
  this.div.scroll_h.width(right_rst);

  // 3. 만약 right 영역의 width 가 너무 작다면 마지막 컬럼의 width 를 증가시킨다
  if(right_width <= this.div.right.width()){
    last_col.width += (this.div.right.width() - right_width);
    right_width     = (last_col.left + last_col.width);
  }

  // 4. right 내부의 div width 를 조정한다 (col_label, calc_right, data_table)
  for (var i = 0; i < 3; i++)
    this.div[i][1].width(right_width);

  // 5. 수평 scroll 의 사이즈를 조정하고, show/hide 를 판단한다
  this.scroll_bar_h.width( right_width);
  this.div.bot_right.width(right_width);
  var is_scroll_bar_h_show = (this.div.right.width() <= this.div.data_table.width());

  // 6. 위에서 설정한 값들을 토대로 컬럼 리사이징 작업을 수행한다
  this.show_scroll_bar_h(is_scroll_bar_h_show);
  _create_col_style(this, col_index);

  _re_size_header(this, this.left_header_cells);
  _re_size_header(this, this.right_header_cells);
  
  // 7. width 를 0 으로 주면 hide 모드. 재귀적으로 숨김 처리를 수행한다.
  if(size === 0){
    var next;
    this.scheme.forEach(function(col, i){
      if(col.width > 0)
        next = {index: i, width: col.width};
    });
    if(next) this.col_resize(next.index, next.width);  // recursion
  }
  return this;
};

/**
 * 수평 스크롤 바를 보이거나 숨긴다
 * @param show
 * @returns {FGR}
 */
FGR.prototype.show_scroll_bar_h = function(show){
  this.div.scroll_h.closest('tr')[show ? 'show' : 'hide']();
  return this;
};

/**
 * header cell 의 width 사이즈와 left 값을 조정한다.
 * @param cells
 */
function _re_size_header(_this, cells){
  cells.each(function(){
    var v     = $(this);
    var col   = _toInt(v.attr('col'));
    var merge = _toInt(v.attr('col_merge'));
    var width   = 0;

    for (var i = 0; i < merge; i++)
      width += _this.scheme[col + i].width;

    v.css('left', _this.scheme[col].left);
    v.width(width);
  });
  return _this;
};

/**
 * ajax 방식으로 json 데이터를 전송한다.
 * @param url      : 요청을 보낼 url
 * @param callback : 데이터를 받은 서버가 응답을 보내오면 실행할 callback function
 * @param filter   : 데이터를 필터링할 function.
 *
 * filter 펑션의 parameter 는 data_row, data_index 순으로 들어간다
 * filter 펑션이 false 를 리턴하면 해당 row 는 서버로 전송되지 않는다
 *
 * 예) 0 번 컬럼이 checkbox 인 상황에서,
 *    checkbox 에 check 된 row 만 전송할 경우 다음과 같은 filter function 을 작성하면 된다.
 *
 *    -> function(row, i){ return row[0] > 0; }
 *
 * 예2) 7 번 컬럼의 값이 100 이상인 row 만 서버로 전송
 *
 *    -> function(row, i){ return row[7] >= 100; }
 */
FGR.prototype.save_ajax_json = function(url, parameters, callback, filter){

  var send_data = [],
    row, data;

  for(var i = 0; i < this.data.length; ++i){
    if(filter && ! filter(this.data[i], i))
      continue;

    row = {};
    for (var j = 0; j < this.scheme.length; ++j) {
      row[this.scheme[j].name] = this.data[i][j];
    }
    send_data.push(row);
  }

  var params = {
    data  : send_data,
    params: parameters || {}
  };

  data = JSON.stringify(params);

  $.ajax({
    url         : url,
    data        : data,
    dataType    : 'json',
    contentType : 'application/json',
    type        : 'POST',
    async       : true,
    success     : callback || function(){},
  });
};

/**
 * 데이터 조회 기능
 * 서버에 리퀘스트를 보내고, ajax 방식으로 받아온다
 * @param url
 * @param parameters
 * @param callback
 *
 * f.send_ajax_request('readTest.action', {test: 123, test2: 'asdf'}, function(res){alert(res.test);});
 */
FGR.prototype.send_ajax_request = function(url, parameters, callback){

  var params = { 
      params: parameters || {},
  };

  $.ajax({
    url         : url,
    data        : JSON.stringify(params),
    dataType    : 'json',
    contentType : 'application/json',
    type        : 'POST',
    async       : true,
    success     : callback || function(){},
  });
  return this;
};

/**
 * grid data 를 초기값으로 되돌린다
 */
FGR.prototype.clear = function(){
  this.data = this.create_init_data();
  this.data.forEach(function(row, i){ row.index = i; });  // indexing
  this.refresh();
  return this;
};

/**
 * row 스크롤을 담당하는 펑션
 * @param move : 스크롤할 row 의 수
 * @returns {FGR}
 */
FGR.prototype.scroll_row = function(move){
  
  if(! _.isNumber(move) || this.row_selected >= this.data.length)
    return this;
  
  var row_cnt = (function() {
    var cnt = this.current_top_line + move;

    if(cnt < 0) return 0;
    
    var remain_cnt = this.data.length - this.cfg.rows_show;

    return (cnt > remain_cnt) ? remain_cnt : cnt;
  }.bind(this))();

  this.scroll_mode      = false;  // scroll 이벤트 중복 방지
  this.current_top_line = row_cnt;
  this.render_data(this, row_cnt);
  this.div.scroll_v.scrollTop(this.cfg.row_height * row_cnt);  // scroll

  return this;
};

/**
 * 그리드 전체를 disabled 할 수 있다
 * @param (Boolean) disable : true - 그리드를 사용 불가하게 한다, false - 사용 가능하게 한다
 * @param (Number)  opacity : 0 ~ 1 사이의 숫자를 준다. (0 : 투명, 0.5 : 반투명, 1 : 불투명)
 * @param (String)  color   : grid 를 덮을 색깔을 지정한다. 지정하지 않을 경우 기본 색깔인 #B6B6B6 이 나타난다
 * @param (Number)  z       : z-index 값을 지정해 줄 수 있다
 * @returns {FGR}
 *
 * 예)
 * disable(true)                    : 기본 속성으로 disable cover 를 활성화 한다.
 * disable(false)                   : disable cover 를 비활성화 한다.
 * disable(true, 0.5, 'red')        : disable cover 를 0.5 의 투명도로 활성화한다. 색깔은 빨간색으로 한다.
 * disable(true, 0.5, '#FF0000')    : disable cover 를 0.5 의 투명도로 활성화한다. 색깔은 빨간색으로 한다.
 * disable(true, 0.5, undefined, 30): disable cover 를 0.5 의 투명도로 활성화한다. z-index 는 30 으로 한다.
 */
FGR.prototype.disable = function(disable, opacity, color, z){

  this.div.cover[disable ? 'show' : 'hide']();

  if(_.isNumber(opacity))  this.div.cover.css('opacity', opacity);
  if(color !== undefined) this.div.cover.css('background-color', color);
  if(z     !== undefined) this.div.cover.css('z-index', z);

  return this;
};

/**
 * 개별 row 의 background-color 를 정의한다
 * @param row
 * @param color
 * @returns {FGR}
 */
FGR.prototype.set_row_color = function(row, color){
  if(this.data[row] !== undefined)
    this.data[row].bg_color = color;
  return this;
};

/**
 * 하나의 cell 에 대하여 editable 속성을 정의해 준다
 * 이 펑션을 사용하여 column 의 edit 설정이 false 인 경우에도 editable 하게 변경할 수 있다
 * 
 * 예) grid.set_cell_editable(3,2, true);
 * @param row
 * @param col
 * @param edit
 * @returns {FGR}
 */
FGR.prototype.set_cell_editable = function(row, col, edit){
  if( ! this.data[row].editable)
    this.data[row].editable = {};
  this.data[row].editable[col] = edit;
  return this;
};

/**
 * 해당 셀의 edit 속성을 검사한다
 * @param row
 * @param col
 * @returns
 */
FGR.prototype.is_editable_cell = function(row, col){
  if(col === false)
    return false;
  if(this.data[row] === undefined)
    return true;
  var editable = this.data[row].editable;
  return (editable === undefined || editable[col] === undefined) ? this.scheme[col].edit : editable[col];
};

/**
 * 값이 바뀐 row 를 배열로 리턴한다
 */
FGR.prototype.get_modified_rows = function(){
  return this.data.filter(function(row) { return row.modified } );
};