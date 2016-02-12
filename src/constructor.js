/**
 * Constructor
 * @param id    : (string) Grid 를 삽입할 div element 의 id
 * @param cfg   : (object) Grid 설정
 * @param scheme: (array)  컬럼 설정
 * @returns {FGR}
 */
function FGR(id, cfg, scheme) {
  
  this.cfg  = cfg;

  var _this           = this;

  // getter methods
  this.get_id              = _make_const_getter(id);
  this.get_original_cfg    = _make_const_getter($.extend(true, {}, cfg));
  this.get_original_scheme = _make_const_getter(scheme.map(_.clone));
  this.get_gen_col         = _make_const_getter(_.findIndex(scheme, { 'type': 'gen' }));        // gen 넘버 컬럼 인덱스
  this.get_gen_label_col   = _make_const_getter(_.findIndex(scheme, { 'type': 'gen_label' }));  // gen_label 넘버 컬럼 인덱스
  this.get_IE_version      = _make_const_getter(_check_ie_version());
  this.is_IE               = _make_const_getter(_check_ie_version() > 0);
  this.is_IE               = _make_const_getter(this.get_IE_version() > 0);

  this.page_index  = 1;     // 현재 페이지 인덱스 (paging 설정시 사용)
  this.cell        = [];    // cell 객체를 보관할 배열 선언 (논리상의 cell 이 아니라 화면 상의 cell)
  this.rows        = [];    // rows 객체를 보관할 배열 선언 (논리상의 row  가 아니라 화면 상의 row : div element)

  // drill down 기능을 위한 변수들
  this.drill_btn      = [];  // drill button  객체를 보관할 배열 선언 (화면 상의 button)
  this.gen_label      = [];  // gen_label div 객체를 보관할 배열 선언 (화면 상의 div)
  this.drill_cell     = [];

  // 화면에 데이터를 보여주는 펑션 : 빠른 처리 속도를 위해 일반적인 경우와 drill down 기능이 있는 경우 각기 다른 펑션을 이용한다
  this.render_data = (this.cfg.drill_down) ? _show_drill_data : _show_data;

  // cell 관련
  this.scheme        = _scheme_initialize.call(this, scheme);  // column scheme 을 초기화한다
  this.header_labels = _get_header_labels_array.call(this);    // header 컬럼 레이블의 문자열 배열
  this.header_cells  = this.header_labels.map(function(v) { return [] });      // header 컬럼 레이블이 입력될 cell 의 배열 (merge 작업 대비)

  this.cfg = _config_initialize.call(this, cfg);  // config 를 초기화한다

  // 사이즈, div, table 셋팅
  this.cfg = _size_setting.call(this);
  this.div = _div_setting.call(this);
  this.tbl = _tbl_setting.call(this);

  _set_cell_left_array.call(this);  // 각 컬럼별 x 좌표 계산
  _create_col_style(this, 0);       // 각 컬럼별 css 스타일 생성 (0 번 컬럼부터 시작)

  // sort / filter 관련
  this.cfg.sort      = _.findIndex(this.scheme, { sort: true }) >= 0;
  this.sorted_column = -1;
  this.filtered      = false;
  this.sorted        = false;

  // prototype row 생성 : grid 생성시 이 prototype row 를 복제하여 각 cell 과 row 를 나열하여 grid 를 만들어낸다.
  (function(start, fence, end) {

    this.proto          = {};
    this.proto.cell     = _create_proto_cell.call(this);
    this.calc_cell      = _create_proto_cell.call(this, 'input', 'calc_row');
    this.proto.row      = [];
    this.proto.row[0]   = _create_proto_row.call(this, start, fence, this.cfg.left_width);
    this.proto.row[1]   = _create_proto_row.call(this, fence, end,   this.cfg.right_width);
    this.proto.scroll_v = _create_proto_row.call(this, start, 1, 1).css('visibility', 'hidden').empty();

    var _this = this;
    var row_click_event = function (e){
      try{ _click_event_processor(e, _this); } catch (event){}  // 사용자가 정의한 이벤트를 실행한다 

      var $this = $(this);
      var row   = _toInt($this.attr('row'));  // 화면 상의 row

      _this.row_selected = _this.current_top_line + row; // data 상의 row

      // 현재 색칠된 상태인 row 의 색을 본래대로 되돌린다
      if(_this.highlight_row >= 0)
        _this.paint_one_row(_this.highlight_row, _this.before_highlight_color);

      _this.highlight_row = row;
      _this.render_data(_this, _this.current_top_line);
      return;
    };

    this.proto.row.forEach(function(v){ v.mousedown(row_click_event); });  // row click 이벤트 부여

  }).bind(this)(0, this.cfg.fixed_header, this.scheme.length);


  this.current_top_line       =  0;  // 화면상의 최상단 row 의 this.data 인덱스
  this.highlight_row          = -1;  // row 하이라이트 바의 위치 (-1 이면 선택한 row 없음)
  this.row_selected           = -1;
  this.col_selected           = false;
  this.highlight_refresh      = true;
  this.before_highlight_color = '';  // pre selected row 의 color

  this.buttons = _create_buttons(this);  // 버튼 생성 (드릴 다운, 페이징 등등의 용도)
  this.resize_btn = {};

  this.scroll_mode    = false;

  // 수직 스크롤 바 생성
  this.scroll_v_inner = $('<div>', {id : id + '_scroll_v_inner'})
    .width(1).height(0)
    .css('visibility', 'hidden');

  return this;
}

/**
 * 설정을 참고하여 Grid 를 조립한다.
 * @returns {FGR}
 */
FGR.prototype.Create_grid = function Create_grid() {

  var _this = this;
  var start = 0;
  var fence = this.cfg.fixed_header;
  var end   = this.scheme.length;

  function scroll_h_func (e) { 
    _this.div.right.scrollLeft($(this).scrollLeft());
  };

  function scroll_v_func (e) {
    if( ! _this.scroll_mode) return;

    var v_location = Math.ceil($(this).scrollTop());     // 현재 스크롤의 위치 (y 좌표)
    var remainder  = v_location % _this.cfg.wheel_move;  // y 좌표를 wheel 단위로 나눈 나머지 (불연속 스크롤 기능 구현)
    var row_cnt    = (v_location - remainder) / _this.cfg.row_height;

    _this.current_top_line = row_cnt;
    _this.render_data(_this, row_cnt);
  } // end of scroll_v_func

  // 1. 조립 전에 부품들을 생성해 둔다
  _div_size_adjust.call(this);                 // div 사이즈를 조정한다
  _create_header.call(this, 0, start, fence);  // 좌측 헤더를 완성한다
  _create_header.call(this, 1, fence, end);    // 우측 헤더를 완성한다
  _create_merge_v_header.call(this);           // 상단 레이블 텍스트를 merge 한다.
  _create_merge_h_header.call(this);           // 상단 레이블 텍스트를 수직 merge 한다
  _create_adjust_header_cell_v_loc(this);      // 헤더 셀 내부 수직 정렬
  _create_calc_row.call(this);     // 계산행을 생성한다
  _create_resizer.call(this);      // resizer 를 부착한다
  _create_filter_icon.call(this);  // filter icon 을 부착한다
  _create_search_div.call(this);   // 검색 modal 을 생성한다
  _create_modal_div.call(this);    // 상태 표시용 modal 을 생성한다

  // scroll_h 를 생성한다
  this.scroll_bar_h = $('<div>', {id: this.get_id() + '_scroll_bar_h'})
    .addClass(_style.scroll_h)
    .width(_this.cfg.right_width)
    .height(1)
    .appendTo(_this.div.scroll_h);

  if(this.cfg.cols_show >= this.scheme.length)
    this.div.scroll_h.closest('tr').hide();  // 컬럼 수에 따라 수평 스크롤 바를 숨기거나 보여준다

  // 1. 조립 설계도
  var objs = (function() {
    var left        = this.cfg.left_width;
    var right       = this.cfg.right_width;
    var right_show  = this.cfg.right_width_show;
    var calc_height = (this.cfg.calc_row) ? this.cfg.row_height : 0;
    var data_height = this.cfg.rows_show * this.cfg.row_height;
    var scr_width   = this.cfg.scroll_bar_width;

    var blue_print = [
       { div_name: 'left',      width : left + 2       },
       { div_name: 'right',     width : right_show + 1 },
       { div_name: 'top_corner'                        },
       { div_name: 'col_label', width : right          },
       { div_name: 'calc_left', height: calc_height    },
       { div_name: 'calc_right',height: calc_height,   width : right },
       { div_name: 'row_label', height: data_height                  },
       { div_name: 'data_table',height: data_height,   width : right },
       { div_name: 'scroll_h',  height: scr_width + 1, width : right_show + 2, scroll : scroll_h_func },
       { div_name: 'scroll_v',  height: this.cfg.scroll_v_height,
         width    : scr_width + 1,
         mouseover: function() { _this.scroll_mode = true;  },
         mouseout : function() { _this.scroll_mode = false; },
         scroll   : scroll_v_func,
         child    : this.scroll_v_inner }
    ];

    if(this.cfg.calc_row === 'bottom'){
      blue_print.push({ div_name: 'bot_empty', height: 0 });
      blue_print.push({ div_name: 'bot_right', height: 0, width: this.cfg.right_width });
    }
    return blue_print;
  }).bind(this)();

  // 2. 조립 실행
  objs.forEach(function(v){
    var div = _this.div[v.div_name];
    if(v.width    ) div.width( v.width );
    if(v.height   ) div.height(v.height);
    if(v.scroll   ) div.scroll(v.scroll);
    if(v.child    ) div.append(v.child );
    if(v.mouseout ) div.mouseout( v.mouseout);
    if(v.mouseover) div.mouseover(v.mouseover);
  });

  // 3. 이벤트 바인딩
  _attatch_evt_wheel(this);  // 마우스 휠 이벤트
  _attatch_evt_check(this);  // 체크박스 이벤트(전체선택, 선택취소)
  _attatch_evt_paste(this);  // ctrl+v 붙여넣기 이벤트
  _attatch_evt_excel(this);  // excel 파일 드래그 & 드랍 이벤트
  
  this.div.main.keydown( function search_evt (e) {
    if(e.ctrlKey && e.keyCode === 70){
      _this.div.search.show().find('input:first').focus();
      e.preventDefault();
    }
  });

  this.click_event   = [];
  this.change_event  = [];
  this.focusin_event = [];
  this.focusout_event= [];
  this.event_flag = {click: true, change: true, focusin: true, focusout: true};

  // 4. 보조 데이터 구성
  this.original_data = false;
  this.deleted_data  = [];
  this.data = this.create_init_data();
  this.data.forEach(function(row, i){ row.index = i; });  // indexing

  _create_rows(this, this.data);  // null data 로딩을 통해 row 를 생성한다
  this.refresh();

  return this;
}; // end of create grid

/**
 * 데이터 row view 생성
 * @param data
 * @param callback
 * @returns {FGR}
 */
function _create_rows(_this, data, callback){

  // 프로토타입 row 를 복제한다
  var temp_row = [
    _this.proto.row[0].clone(true, true),
    _this.proto.row[1].clone(true, true)
  ];
  
  var inputs = _this.scheme.map(function(column, i) {
    var div = (i < _this.cfg.fixed_header) ? 0 : 1;
    return temp_row[div].find(column.element + '[col='+i+']');
  });

  append_row(0, _this.cfg.rows_show, _this.scheme.length, temp_row, inputs, _this);
  
  _this.div.row_label.append(_this.div.under_line_left);
  _this.div.data_table.append(_this.div.under_line_right);

  // 수직 스크롤 바의 길이를 조절한다.
  _adjust_scroll_v(_this, _this.data.length);

  // 하나의 row 를 추가해 주는 function
  function append_row (from, to, end, temp_row, inputs, _this){
    
    // cell 에 id 를 입력한다
    function set_cell_id (i, j, _this) {
      var element= _this.scheme[j].element;
      var _div   = (j < _this.cfg.fixed_header) ? 0 : 1;
      var query  = element + '[col=' + j + ']';
      var id     = _this.get_id() + '_cell_' + i + '_' + j;
      _this.cell[i][j] = _this.rows[i][_div].find(query).attr({id: id, row: i});
    }
    
    // drill 모드일 경우 gen_label 을 셋팅한다
    function set_gen_label (i, k, _this) {
      if('gen_label' === _this.scheme[k].type){
        // drill_cell 과 drill_btn 할당
        _this.drill_cell[i] = _this.cell[i][k];
        _this.drill_btn[i]  = _this.buttons.drill_btn_minus.clone(true, true);

        // cell 에 드릴 버튼과  텍스트 입력용 span 을 append 한다.
        var $input = $('<span>');
        _this.cell[i][k].empty()
             .append(_this.drill_btn[i], $input);
        
        // getter, setter 가 제대로 작동하도록 cell 에 span 을 입력한다.
        _this.cell[i][k] = $input;
      }
    }
    
    // row 를 셋팅한다
    function set_row (i, m, _this) {
      _this.rows[i][m].get(0).setAttribute('id', _this.get_id()+'_row_'+m+'_'+i);
      _this.rows[i][m].get(0).setAttribute('row', i);
      _this.div[2][m].append(_this.rows[i][m]);
    };

    var scheme_length = _this.scheme.length;
    
    _.range(from, to).forEach( function(i) {

      _this.rows[i] = [ temp_row[0].clone(true, true), temp_row[1].clone(true, true)];
      _this.cell[i] = [];

      for(var j = 0; j < scheme_length; ++j)
        set_cell_id(i, j, _this);  // cell 에 id 를 부여한다

      // drill 모드라면 gen_label 을 설정해 준다
      if(_this.get_gen_col() >= 0)
        for(var k = 0; k < end; ++k)
          set_gen_label(i, k, _this);  

      set_row(i, 0, _this);
      set_row(i, 1, _this);
      
      return;
    }); // end of _.range.forEach

    _this.scroll_v_inner.height(to * _this.cfg.row_height);
    return; 
  } // end of append_row

  return _this; 
};
/**
 * header cell 을 생성한다
 * @param div_index
 * @param start
 * @param end
 * @returns {FGR}
 */
function _create_header(div_index, start, end){

  function blur_func () {
    this.blur();
  };
  
  var range = _.range(start, end);
  
  this.header_labels.forEach(function(v, row) {
    range.forEach(function(col) {

      var column = this.scheme[col];

      var cell   = $('<div>',{row:row, col:col, col_merge: 1, row_merge: 1, 'class': _style.cell})
        .height(this.cfg.row_height)
        .width(column.width)
        .css({ left: column.left, top: row * this.cfg.row_height })
        .appendTo(this.div[0][div_index]);

      var inner = _create_header_cell_inner.call(this, row, col, column, v[col])
        .attr('align', column.h_align)
        //.focus(blur_func)
        .focus(blur_func)
        .appendTo(cell);
    }.bind(this));
  }.bind(this));

  return this;
};
/**
 * header_cell_inner 를 생성한다
 * @param row
 * @param col
 * @param cell_scheme
 * @returns
 */
function _create_header_cell_inner(row, col, cell_scheme, label){

  var def  = this.get_cell_define()['str_label'];
  var attr = {
      row: row,
      col: col,
      type    : /^\&(checkbox|radio)$/.test(label) ? label.slice(1) : def.type,
      name    : cell_scheme.name,
      //readonly: ! (type.match(/check|radio/i)),
      readonly: true,
      'class' : _style.label,
  };

  var ret = $('<' + def.element + '>', attr)
      .val(label)
      .css('text-align', cell_scheme.h_align)
      .height(_style.row_height - 1);

  return ret; 
};

/**
 * 헤더 레이블을 2차원 배열로 생성해 리턴한다
 * @param _this
 * @returns {Array}
 */
function _get_header_labels_array(){

  var _this  = this;
  var temp   = this.scheme.map(function(col) { return col.label.split('||') });
  var range  = _.range(_.max(temp.map(function(v) { return v.length })));
  var labels = range.map(function(r) { return [] });
  
  // temp 배열을 pivot 하여 labels 배열을 완성한다.
  range.forEach(function(i) {
    _this.scheme.forEach(function(v, j) { 
      labels[i][j] = temp[j][i] 
    });
  });
  return labels;
};

/**
 * 헤더 레이블 cell 객체를 찾아 리턴해 준다
 * @param row
 * @param col
 * @returns
 */
FGR.prototype.get_header_cell = function (row, col){

  if(this.header_cells[row] && this.header_cells[row][col]) return this.header_cells[row][col];

  var _this = this;
  var div   = this.div[0][(col >= this.cfg.fixed_header) ? 1 : 0];
  var $cell = div.find('.' + _style.cell).filter(function(){
        var loc = _this.get_loc(this);
        return loc.row === row && loc.col === col;
      });

  this.header_cells[row][col] = ($cell.length === 1) ? $cell : null;
  return $cell;
};

/**
 * 헤더 레이블에 대하여 수직 merge 작업을 수행한다
 * @returns {FGR}
 */
function _create_merge_v_header(){

  var labels  = this.header_labels;
  var col_cnt = this.scheme.length;
  var row_cnt = this.header_labels.length;

  _.range(col_cnt).forEach(function(col) {
    for (var row = row_cnt - 1; row > 0; --row) {
      if(labels[row][col] === undefined){
        var upper_cell   = this.get_header_cell(row-1, col);
        var this_cell    = this.get_header_cell(row,   col);
        var upper_height = upper_cell.height();
        var this_height  = this_cell.height();

        if(upper_cell.width() === this_cell.width()){
          var this_merge_cnt  = _toInt( this_cell.attr('row_merge')),
            upper_merge_cnt = _toInt(upper_cell.attr('row_merge'));

          this_cell.remove();
          upper_cell.height(upper_height + this_height);
          upper_cell.attr('row_merge', this_merge_cnt + upper_merge_cnt);
        } // end of if upper_cell
      } // end of if labels 
    } // end of row loop 
  }.bind(this)); // end of col loops
  return this;
};

/**
 * 헤더 레이블에 대하여 수평 merge 작업을 수행한다
 * @returns {FGR}
 */
function _create_merge_h_header(){

  var labels    = this.header_labels;
  var row_range = _.range(this.header_labels.length);

  function merge_job (start_col, end_col) {
    
    row_range.forEach(function(row) {
      for(var col = end_col - 1; col > start_col; --col){
        var is_no_check = ! /radio|check/i.test(this.scheme[col].type);

        if(is_no_check && labels[row][col - 1] === labels[row][col]){
          var left_cell = this.get_header_cell(row, col-1);
          var this_cell = this.get_header_cell(row, col  );

          if(left_cell.height() === this_cell.height()){
            var this_merge_cnt = _toInt(this_cell.attr('col_merge'));
            var left_merge_cnt = _toInt(left_cell.attr('col_merge'));

            this_cell.attr('removed', true).remove();
            left_cell.width(left_cell.width() + this_cell.width());
            left_cell.attr('col_merge', this_merge_cnt + left_merge_cnt);
          }
        }
      }
    }.bind(this)); // end of row_range.forEach
  }

  var fence   = this.cfg.fixed_header;
  merge_job.call(this, 0, fence);
  merge_job.call(this, fence, this.scheme.length);
  return this;
};

/**
 * 헤더 셀 내부 수직 정렬을 조절한다
 */
function _create_adjust_header_cell_v_loc(_this){

  function adjust () {
    var $this = $(this);
    var $input= $this.find('input');
    var top   = ($this.height() - _this.cfg.row_height) / 2;

    $input.css('top', top);
    if(/checkbox|radio/.test($input.attr('type'))){
      $input.height(_this.cfg.checkbox_size)
            .width('100%');
    }
  } // end of function

  var query = '.' + _style.cell;
  _this.div[0][0].find(query).each(adjust);
  _this.div[0][1].find(query).each(adjust);
  return _this;
};

/**
 * 데이터 row 의 프로토타입을 생성한다
 * @param start
 * @param end
 * @param row_width
 * @returns
 */
function _create_proto_row(start, end, row_width){
  var row  = $('<div>').addClass(_style.row).height(this.cfg.row_height);
  _.range(start, end).forEach( function(i) {
    return this.proto.cell[i].clone(true, true).appendTo(row);
  }.bind(this));
  return row;
};

/**
 * 각 컬럼별 cell 의 프로토타입을 생성한다
 * @param element : 특정 tag 명을 지정해 줄 경우에만 사용
 * @returns {Array}
 */
function _create_proto_cell(element, mode){

  var cell_height = this.cfg.row_height;
  
  var cells = this.scheme.map(function(column, i) {
    var adj   = ('select' === column.type) ? 0 : 1;
    var $cell = _create_cell.call(this, column, element, i, cell_height - adj, mode)
                              .addClass(this.get_id() + '_col_' + i);
    return $cell;
  }.bind(this));
  return cells;
};

/**
 * 각 셀의 left 좌표를 계산한다
 * @returns {FGR}
 */
function _set_cell_left_array(){
  var len = this.scheme.length;
  for (var i = 0, left = 0; i < len; ++i) {
    if(i === this.cfg.fixed_header)
      left = 0;
    this.scheme[i].left = left;
    left += this.scheme[i].width;
  }
  return this;
};

/**
 * 데이터 셀을 생성한다.
 * @param _this
 * @param cell_scheme
 * @param element : element tag 를 고정할 때 사용한다
 * @returns
 */
function _create_cell(cell_scheme, element, index, height, mode){

  var set         = this.get_cell_define()[cell_scheme.type];
  var is_select   = (set.element === 'select');
  var is_calc_row = mode === 'calc_row';
  var is_checkbox = /check|radio/.test(cell_scheme.type);

  var evt_name, evt_function;

  // 1. cell attribute 설정
  var attr = {
    id     : this.get_id() + '_proto_col_' + index,
    name   : cell_scheme.name,
    col    : index,
    'class': (is_calc_row && is_checkbox) ? _style.idiv : set.style,
    type   : is_calc_row ? 'text' : set.type
  };
  
  if(_.isNumber(cell_scheme.size)) attr.maxlength = cell_scheme.size;

  // 2. 사용자 입력 cell 생성
  var cell = $('<' + (element || set.element) + '>', attr);

  // 2.1. select 인 경우 option 을 붙여준다.
  if(!element && is_select && set.child)
    cell_scheme[set.scheme].forEach(function(v) { return $('<' + set.child + '>', v).appendTo(cell) });

  // 3. 이벤트 bind
  if(!element && set.event) {
    _.map(set.event, function(func, evt_name) { return cell[evt_name](func) });
  }

  // checkbox, radio 인 경우의 처리
  if(!is_calc_row && is_checkbox){
    cell.height(this.cfg.checkbox_size).width('100%');
    var cell_outer = $('<div>', {'class': _style.idiv}).append(cell);
    cell_outer.css('padding-top', (this.cfg.row_height - this.cfg.checkbox_size) / 2);
    return cell_outer;
  } else {
    cell.height(height);
    return cell;
  }
};


/**
 * 컬럼별로 적용할 css class 를 생성한다
 * @param col_index
 * @returns {FGR}
 */
function _create_col_style(_this, col_index){

  _.range(col_index, _this.scheme.length).forEach(function(i) {

    var v       = _this.scheme[i];
    var set     = _this.get_cell_define()[v.type];
    var _width  = v.width + set.width_adj;
    var css_name= _this.get_id() + '_col_' + i;
    var is_hide = _width <= 0;

    var attr = {
      'text-align': v.align,
      'left'      : v.left + 'px',
      'width'     : (is_hide) ? (0 + 'px') : (_width + 'px'),
      'display'   : (is_hide) ? 'none'     : 'inline',
      'background-color': (v.bg_color) ? v.bg_color : 'transparent'
    };
    
    var exp_header = '.' + css_name + ' {';
    var exp_body   = _.reduce(attr, function(before, current, key) { return ( before + key + ':' + current + ';') }, '');
    var exp_tail   = '}';
    
    _insert_new_styles(_this, css_name, exp_header + exp_body + exp_tail);

  });
  return this;
};

/**
 * row 생성을 위한 초기 데이터를 생성한다
 * @returns {Array}
 */
FGR.prototype.create_init_data = function(row_count){
  var row_cnt = row_count || this.cfg.rows_show;
  var row     = this.scheme.map(function(col) { return col.init_data });
  return _.range(row_cnt).map(function() { return row.slice(0) });
};

/**
 * 버튼들의 프로토타입을 생성한다. clone 하여 사용하면 된다.
 * @returns {obejct}
 */
function _create_buttons(_this){
  return {
    drill_btn_minus: $('<button>').text('-')
      .click(drill)
      .dblclick(drill_straight)
      .addClass(_style.drill_btn)
  };
  
  function drill(event){

    var gen_col    = _this.get_gen_col();
    var row        = _toInt($(this).attr('row'));
    var parent_row = _this.data[row];
    var top_gen    = parent_row[gen_col];
    var flag       = {};

    flag[top_gen] = parent_row;

    if(! parent_row.children){
      // drill up
      
      // loop : makeTree
      for (var i = row + 1; i < _this.data.length; i++) {
        var this_row = _this.data[i];
        var gen      = this_row[gen_col];
        
        // drill 작업이 끝나면 break;
        if(gen <= top_gen) break;

        // drill up 은 하위 아이템을 숨기는 작업이기 때문에 각 아이템의 부모가 누구인지를 잘 지정해 줘야 한다.
        // flag 는 각 아이템의 부모가 될 아이템을 gen 넘버별로 모아놓는 곳이다.
        flag[gen] = this_row;

        // 1 단계 위 부모가 존재한다면 자식으로 등록하고, 숨김 대상으로 지정한다.
        if(flag[gen - 1]){
          if( ! flag[gen - 1].children){
            flag[gen - 1].children = [];
          }
          this_row.hide = true;
          flag[gen - 1].children.push(this_row);
        }
      } // end of loop : makeTree
      
      // 숨김 대상을 제외한 나머지 데이터만 보여준다.
      var temp_data = [];
      for (var i = 0; i < _this.data.length; i++) {
        var this_row = _this.data[i];
        if( ! this_row.hide)
          temp_data.push(this_row);
      }
      _this.data = temp_data;
      // end of drill up
    } else {
      // drill down

      remove_empty_rows();

      // 숨김 표시를 해제한다.
      var temp_row = parent_row.children.map(function(r){ r.hide = false; return r;});
      var head     = _this.data.slice(0, row + 1);
      var tail     = _this.data.slice(row + 1);
      
      _this.data = head.concat(temp_row, tail);
      parent_row.children = undefined;
      
    } // end of drill down

    if(_this.data.length < _this.rows.length){
      var last       = _this.rows.length - _this.data.length;
      var empty_rows = _this.create_init_data(last).map(function(row) { row.empty = true; return row; });
      _this.data = _this.data.concat(empty_rows);
    }
    
    _this.data.forEach(function(r, index){ r.index = index; });
    
    _adjust_scroll_v(_this, _this.data.length);  // scroll bar 조정
    _this.refresh();
    event.preventDefault();
    
    // end of drill down
  }

  // 더블클릭시에는 모든 자식 node 를 전부 열어 보여준다
  function drill_straight(event){

    var row        = _toInt($(this).attr('row'));
    var parent_row = _this.data[row];

    if( ! _.isArray(parent_row.children)) return;
    
    var temp_head = _this.data.slice(0, row + 1);
    var temp_body = parent_row.children;
    var temp_tail = _this.data.slice(row + 1);

    // children 이 딸린 tree 구조의 배열을 하나의 배열로 평탄화하는 함수 
    function platten (array) {
      
      var arr = array;

      for (var i = 0; i < arr.length; i++) {
        var _row = arr[i];
        if(_row.children){
          var head = arr.slice(0, i + 1);
          var body   = _row.children;
          var tail   = arr.slice(i + 1);
          _row.children = undefined;
          arr = head.concat(body, tail);
        }
      }
      return arr.map(function(r){ r.hide = undefined; return r; });
    }
    
    // start drill straight open
    parent_row.children = undefined;
    
    // 버튼을 누른 행의 자식을 평탄화하여 하나의 배열로 만드는 작업을 한다.
    _this.data = temp_head.concat( platten(temp_body), temp_tail );

    // empty rows 를 제거하고 화면을 refresh 한다.
    remove_empty_rows();
    _this.refresh();
    _adjust_scroll_v(_this, _this.data.length, true, true);   // scroll bar 조정
    
    event.preventDefault();
  }

  function remove_empty_rows(){
    for(var i = _this.data.length - 1; i >= 0; --i){
      if(_this.data[i].empty)
        _this.data.pop();
      else
        break;
    }
    return;
  }
};

// setting functions ---------------------------------------------------
/**
 * 헤더 div size 를 조정한다.
 * @returns {FGR}
 */
function _div_size_adjust(){
  this.div[0][1]
    .width(this.cfg.right_width)
    .height(this.header_labels.length * this.cfg.row_height);
  this.div[0][0]
    .width(this.cfg.left_width)
    .height(this.header_labels.length * this.cfg.row_height);
  return this;
};

/**
 * 사이즈 설정 초기화
 * @param _this
 * @returns {object}
 */
function _size_setting() {

  function _add_func (a, b) {
    return a + b;
  }

  var cfg        = this.cfg;
  var scheme     = this.scheme;
  var start      = 0;
  var fence      = cfg.fixed_header;
  var end        = scheme.length;
  var border     = cfg.border_size = 0;
  var is_cols    = _.isNumber(cfg.cols_show) && cfg.cols_show > 0;
  var is_rows    = _.isNumber(cfg.rows_show) && cfg.rows_show > 0;
  var show_width = _.chain(scheme).slice(fence, fence + cfg.cols_show).pluck('width').reduce(_add_func, 0);

  cfg.header_height    = this.header_labels.length * cfg.row_height + 1;
  
  cfg.left_width = _.chain(scheme).slice(start, fence).pluck('width').reduce(_add_func, 0); // row_label width : 왼쪽
  cfg.right_width = _.chain(scheme).slice(fence, end).pluck('width').reduce(_add_func, 0); // data_table width: 오른쪽
  
  cfg.right_width_show = is_cols ? show_width + (border * cfg.cols_show)  // cols_show 옵션이 있다면 width 를 계산한다
    : cfg.width - cfg.left_width;                                       // 옵션이 없다면 주어진 width 값을 사용한다

  if(is_rows)
    cfg.height = cfg.row_height * cfg.rows_show;  // rows_show 설정이 있는 경우 height 를 계산한다

  cfg.scroll_v_height = cfg.height;

  if(cfg.calc_row === 'top')
    cfg.height += cfg.row_height;

  cfg.wheel_move = cfg.row_height * cfg.wheel_move_row;  // 마우스 휠을 한 번 굴릴 때의 이동 거리

  cfg.scroll_bar_width = this.get_scroll_bar_width();
  return cfg;
};

/**
 * DIV 객체 초기화
 * @param _this
 * @returns {object}
 */
function _div_setting(){

  function create_div (_this, id) {
    return $('<div>', {id: _this.get_id() + id, 'class': id});
  }

  var div = { 
      0: [], 1: [], 2: [], 3: [], 4: [],
      main : $('#' + this.get_id()).addClass(_style.main_div),
  };
  var div_alias  = [  // div 알리아스 정의
      ['top_corner', 'col_label',  'top_empty'],
      ['calc_left',  'calc_right', 'calc_empty'],
      ['row_label',  'data_table', 'scroll_v'],
      ['bot_empty',  'scroll_h',   'bot_corner'],
      ['bot_paging'] ];

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 3; j++) {
      var div_id = '_fg_div_' + i + '' + j;
      var alias  = div_alias[i][j];
      div[i][j] = div[alias] = create_div(this, div_id);
    }
  }
  div[4][0] = div.bot_paging = create_div(this, '_fg_div_40');


  var left_height   = (this.cfg.header_height + this.cfg.height);
  var bottom_height = (this.cfg.calc_row === 'bottom') ? this.cfg.row_height : 0;
  var _height       = left_height + bottom_height;

  div.left      = create_div(this, '_fg_div_left').height(_height);
  div.right     = create_div(this, '_fg_div_right').height(_height);
  div.bot_left  = create_div(this, '_fg_div_bot_left').append(div.bot_empty);
  div.bot_right = create_div(this, '_fg_div_bot_right').appendTo(div.scroll_h);

  if(this.cfg.calc_row === 'bottom'){
    div.left .append(div[0][0], div[2][0], div[1][0]);
    div.right.append(div[0][1], div[2][1], div[1][1]);
  } else {
    div.left .append(div[0][0], div[1][0], div[2][0]);
    div.right.append(div[0][1], div[1][1], div[2][1]);
    div.bot_right.css('border-bottom', '0px');
    div[3][0].css('border-bottom', '0px');
  }

  div.cover = create_div(this, '_fg_div_cover').appendTo(div.main);
  div.under_line_left  = $('<div>', {style: 'border-top:' + _style.row_bot_line});
  div.under_line_right = $('<div>', {style: 'border-top:' + _style.row_bot_line});
  return div;
};

/**
 * 메인 테이블 생성, 각 td 에 div 셋팅
 * @param _this
 * @returns {object}
 */
function _tbl_setting(){

  function create_simple_table(_this, row, col, attribute) {

    function create_tr () { return $('<tr>'); };
    function create_td () { return $('<td>', {height: _this.cfg.row_height, valign: 'top'}); };

    var col_range = _.range(col);
    var $tbl      = $('<table>', attribute);
    
    _.range(row).forEach(function() {
      var $tr = create_tr().appendTo($tbl);
      col_range.forEach( function() { return create_td().appendTo($tr) });
    });
    return $tbl;
  };

  var attr = {
    id      : this.get_id() + '_fg_main_table',
     'class': '_fg_main_table',
     border : 0, cellspacing : 0, cellpadding : 0,
  };
  var tbl  = {
    main : create_simple_table(this, 3, 3, attr).appendTo(this.div.main)
  };
  var $tds = tbl.main.find('tr:eq(1) td');
  var $tr  = tbl.main.find('tr').eq(2).empty();  // bot_paging 영역 확보

  // main table 각각의 td 에 미리 생성해 둔 div 를 append 한다.
  tbl.main.find('tr:eq(0) td:eq(0)').append(this.div.left);
  tbl.main.find('tr:eq(0) td:eq(1)').append(this.div.right);
  tbl.main.find('tr:eq(0) td:eq(2)').append(this.div.scroll_v).attr({valign: 'bottom'})
          .css({'padding-bottom': (this.cfg.calc_row === 'bottom') ? this.cfg.row_height+1 : 0});

  ;['bot_empty', 'scroll_h', 'bot_corner'].forEach(function(v,i) { $tds.eq(i).append(this.div[v]) }.bind(this) );

  // paging 옵션이 설정되어 있다면 index button 이 들어갈 공간을 준비한다.
  if(this.cfg.paging){
    $('<td>', {colspan : 3})
      .append(this.div[4][0].attr({align: 'center'}))
      .appendTo($tr);
  } else {
    $tr.css('background-color','red').remove();
  }
  return tbl;
};
