/**
 * 셀 클릭 이벤트를 처리한다. 각 이벤트 펑션은 this.click_event 에 배열로 지정되어 있다.
 * 이벤트는 배열에 등록된 순서대로 발생하며, 발생 직전 this.event_flag 를 검사하므로
 * 이벤트 발생을 방지하기 위해서는 event_flag 의 해당 값을 false 로 변경해주면 된다.
 *
 * 개별 이벤트 펑션에 입력되는 parameter 는 다음과 같다.
 * e  : event 객체
 * row: 이벤트가 발생한 cell 의 row index
 * col: 이벤트가 발생한 cell 의 col index
 * val: 이벤트가 발생한 cell 의 값
 * _this: grid 객체
 *
 * @param e
 * @param _this
 * @returns {FGR}
 */
function _click_event_processor(e, _this){
  if(_this.event_flag.click) {
    var loc = _this.get_loc(e.target);
    _this.click_event.forEach(function(v){
      v(e, loc.row, loc.col, _this.data[loc.row][loc.col], _this);
    });
  }
  return _this;
};

/**
 * 셀의 값을 변경할 때 발생하는 이벤트를 처리한다. 각 이벤트 펑션은 this.change_event 에 배열로 지정되어 있다.
 * 
 * e : event 객체
 * row : 이벤트가 발생한 cell 의 row index
 * col : 이벤트가 발생한 cell 의 col index
 * val : 이벤트가 발생한 cell 의 값
 * before : 이벤트가 발생하기 직전 cell 의 값
 * _this :  grid 객체
 *
 * @param e
 * @param _this
 * @returns {FGR}
 */
function _change_event_processor(e, _this, before, after){
  if(_this.event_flag.change) {
    var loc = _this.get_loc(e.target);
    _this.change_event.forEach(function(v){
      v(e, loc.row, loc.col, _this.data[loc.row][loc.col], before, _this);
    });
  }
  return _this;
};

/**
 * 셀 포커스 인 이벤트를 처리한다. 각 이벤트 펑션은 this.focusin_event 에 배열로 지정되어 있다.
 *
 * e : event 객체
 * row : 이벤트가 발생한 cell 의 row index
 * col : 이벤트가 발생한 cell 의 col index
 * val : 이벤트가 발생한 cell 의 값
 * _this :  grid 객체
 *
 * @param e
 * @param _this
 * @returns {FGR}
 */
function _focusin_event_processor(e, _this){
  if(_this.event_flag.focusin) {
    var loc = _this.get_loc(e.target);
    _this.focusin_event.forEach(function(v){
      v(e, loc.row, loc.col, _this.data[loc.row][loc.col], _this);
    });
  }
  return _this;
};

/**
 * 셀 포커스 아웃 이벤트를 처리한다. this.focusout_event 에 배열로 지정되어 있다.
 *
 * e : event 객체
 * row : 이벤트가 발생한 cell 의 row index
 * col : 이벤트가 발생한 cell 의 col index
 * val : 이벤트가 발생한 cell 의 값
 * _this :  grid 객체
 *
 * @param e
 * @param _this
 * @returns {FGR}
 */
function _focusout_event_processor(e, _this){
  if(_this.event_flag.focusout) {
    var loc = _this.get_loc(e.target);
    _this.focusout_event.forEach(function(v){
      v(e, loc.row, loc.col, _this.data[loc.row][loc.col], _this);
    });
  }
  return this; 
};

/**
 * header label 의 checkbox 에 전체선택/선택취소 이벤트를 부여한다
 * @param {FGR}
 */
function _attatch_evt_check(_this){
  
  // '전체 선택 체크박스'를 클릭하면 data 의 해당 컬럼의 모든 값을 '전체 선택 체크박스'와 같은 값으로 맞춘다
  function select_all (e) {
    var $this = $(this);
    var col   = _toInt($this.attr('col'));
    var div   = (col < _this.cfg.fixed_header) ? _this.div.row_label : _this.div.data_table;
    var nm    = $this.attr('name');
    var val   = $this.prop('checked') ? 1 : 0;

    div.find('input[name=' + nm + ']')
      .prop('checked', $this.prop('checked'));

    _this.data.forEach(function(row, i){ row[col] = val; });
    _this.render_data(_this, _this.current_top_line);
    return;
  };
  
  // '전체 선택 라디오' 를 클릭하면 해당 컬럼의 모든 값을 0 으로 맞춘다
  function select_radio (e) {
    var col = _toInt($(this).attr('col'));
    _this.data.forEach(function(row){ row[col] = 0; });
    _this.render_data(_this, _this.current_top_line);
    return;
  };

  [0, 1].forEach(function (i) {
    this[i].find('input[type=checkbox]').click(select_all);
    this[i].find('input[type=radio]'   ).click(select_radio);
  }, _this.div[0]);

  return _this;
};

/**
 * row_label 과 data_table 에 마우스 휠 이벤트를 부여한다
 * @param _this
 * @returns {FGR}
 */
function _attatch_evt_wheel(_this){
  function is_up_dir (e){
    return (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0);
  };
  _this.div.main.bind('mousewheel DOMMouseScroll', function wheel_evt (e){
      _this.scroll_row(is_up_dir(e)? -1:1); 
  });
  return _this;
};

/**
 * 엑셀 파일 drag & drop 이벤트를 부여한다.
 */
function _attatch_evt_excel(_this){

  if(window.XLSX === undefined || window.jszip === undefined) return;

  // 드래그 오버 이벤트 처리
  function handleDragover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  // data 교정
  function fixdata(data) {
    var o = "", l = 0, w = 10240;
    for( ; l < data.byteLength/w ; ++l ) {
      o += String.fromCharCode.apply(null,new Uint8Array(data.slice(l * w, l * w + w)));
    }
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
  }

  // excel sheet 데이터를 2차원 배열로 가공한다
  function sheet_to_array(sheet, scheme) {

    if(sheet == null || sheet["!ref"] == null) return [];

    var date_type_exist = U.some(scheme, function(col) { return ( col.type === 'date' ) });
    
    // 문제 있음 : 날짜 형식 체크 과정이 병목.
    var typefy;
    if(date_type_exist) {
      typefy = function(v, col){ 
        return (col.type === 'date' && typeof v === 'number') ? $.datepicker.formatDate(col.date.dateFormat, new Date((v - 25569) * 86400000)) : v;
      }
    } else {
      typefy = function(v){ return v; };
    }

    var range     = safe_decode_range(sheet["!ref"]);
    var start_col = range.s.c;
    var end_col   = range.e.c;
    var col_range = U.range(start_col, end_col + 1);
    var cols      = col_range.map( function(c) { return XLSX.utils.encode_col(c) });

    var C, txt, val, col_index;
    var data = U.range(range.s.r, range.e.r + 1).map(function(Row) {
      var one_row = [];
      var rr      = XLSX.utils.encode_row(Row);

      for( C = start_col; C <= end_col; ++C ) {
        val = sheet[cols[C] + rr];
        txt = (val !== undefined) ? val.v : null;

        col_index = C - start_col;
        txt = typefy(txt, scheme[col_index]);

        if(col_index < scheme.length) one_row.push(txt);
      }
      return one_row;
    });

    return data;
  } // end of sheet_to_array

  // excel worksheet 의 !ref 값을 범위로 파싱한다.
  function safe_decode_range(range) {
    var o   = {s:{c:0,r:0},e:{c:0,r:0}},
      idx = 0, i = 0, cc = 0,
      len = range.length;

    for(idx = 0; i < len; ++i) {
      if((cc=range.charCodeAt(i)-64) < 1 || cc > 26) break;
      idx = 26*idx + cc;
    }
    o.s.c = --idx;

    for(idx = 0; i < len; ++i) {
      if((cc=range.charCodeAt(i)-48) < 0 || cc > 9) break;
      idx = 10*idx + cc;
    }
    o.s.r = --idx;

    if(i === len || range.charCodeAt(++i) === 58) { o.e.c=o.s.c; o.e.r=o.s.r; return o; }

    for(idx = 0; i != len; ++i) {
      if((cc=range.charCodeAt(i)-64) < 1 || cc > 26) break;
      idx = 26*idx + cc;
    }
    o.e.c = --idx;

    for(idx = 0; i != len; ++i) {
      if((cc=range.charCodeAt(i)-48) < 0 || cc > 9) break;
      idx = 10*idx + cc;
    }
    o.e.r = --idx;
    return o; 
  } // end of safe_decode_range

  // drop 이벤트
  function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    var files = e.dataTransfer.files;
    var f     = files[0];
    var reader= new FileReader();
    var name  = f.name;

    reader.onload = function(e) {
      var data = e.target.result;
      var wb   = XLSX.read(btoa(fixdata(data)), {type: 'base64'});
      var w    = wb.Sheets[wb.SheetNames[0]];
      var res  = sheet_to_array(w, _this.scheme);
      //window.result = res;
      _this.clear();
      _this.Load_data(res);
    };
    reader.readAsArrayBuffer(f);
  }

  var drop = _this.div.main.get(0);
  if(drop.addEventListener) {
    drop.addEventListener('dragenter',handleDragover, false);
    drop.addEventListener('dragover', handleDragover, false);
    drop.addEventListener('drop',     handleDrop, false);
  }

  return _this;
}

/**
 * 포커스 위치를 상/하 방향으로 움직인다. 움직이는 단위는 1 row, 또는 1 page
 * 이 펑션은 키 입력을 받아 움직이도록 하고, 다른 용도로는 가급적이면 호출하지 않도록 한다
 * @return {Boolean} 네비게이션 키 입력을 받았다면 true 를 리턴하고, 그 외의 경우에는 false 를 리턴한다
 */
function _move_focus(e, _this) {

  // 고의로 움직임에 딜레이를 준다. 키를 계속 누르고 있을 경우, 
  // IE 처럼 처리 느린 웹 브라우저의 스크롤링 속도는 큰 변화가 없지만,
  // chrome 처럼 빠른 웹 브라우저에서는 너무 빨라서 잔상 비슷한 효과가 난다.
  if(_this.move_delay) return false;

  _this.move_delay = true;
  setTimeout(function(){ _this.move_delay = false;}, _this.scroll_delay_ms);

  if(e.keyCode === 13) e.preventDefault();

  // 13: Enter, 33: pgup, 34: pgdn, 38: ↑, 40: ↓
  var keys  = {
    13:  1,
    33: -_this.cfg.rows_show,
    34:  _this.cfg.rows_show,
    38: -1,
    40:  1, 
  }; 

  // keys 에 정의된 키 코드가 아니라면 return
  if( ! keys.hasOwnProperty(e.keyCode)) return false;

  var loc      = _this.get_loc(e.target);
  var row      = loc.row;
  var row_cnt  = keys[e.keyCode];  // 입력한 키에 따라 스크롤 할 row 의 수를 가져온다.
  var this_row = row - _this.current_top_line;
  var check    = {'-1': this_row === 0, 1: this_row >= _this.rows.length - 1};

  // 1. ↑, ↓ 입력이 들어온 경우
  if(check.hasOwnProperty(row_cnt)){

      // A. 현재 커서 위치가 최상단, 최하단이라면
      if(check[row_cnt]){
        _this.row_selected = row + row_cnt;

        if(_this.row_selected < 0) _this.row_selected = 0;

        _this.scroll_row(row_cnt);

      // B. 현재 커서 위치가 최상단, 최하단이 아니라면
      } else {
        var next_row = _this.cell[this_row + row_cnt];

        if(next_row) next_row[loc.col].mousedown().focus();
      }

  // 2. pgup, pgdn 입력이 들어온 경우
  } else {
    var top = _this.div.scroll_v.scrollTop();

    _this.row_selected = row + row_cnt;
    _this.div.scroll_v.scrollTop(top + _this.cfg.row_height * row_cnt);
    _this.scroll_row(row_cnt);
  }
  return true;
};

/**
 * paste event (control + v 키 이벤트)
 * 엑셀의 여러 셀을 선택해 복사해 온 값을 그리드 화면에 붙여넣는 기능이다. 현재 복사하기/잘라내기 기능은 구현하지 않았다.
 * 복사하기/잘라내기 기능은 그리드 자체에서 구현하기보다는 '엑셀 파일/csv 형식으로 다운로드' 기능을 사용하는 쪽이 합리적이다.
 */
function _attatch_evt_paste(_this){

  // https://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser
  function get_clipboard_text (e) {
    if(window.clipboardData)
      return window.clipboardData.getData('text'); // #forInternetExplorer
    return (e.originalEvent || e).clipboardData.getData('text/plain');
  }

  function paste (e) {

    e.preventDefault();
    
    function indexing (v, i) {
      return v.split('\t').map( function (vv, j) { return ({row: row + i, col: col + j, txt: vv }) } ); 
    };

    var $cell = $(e.target);
    var row   = _toInt($cell.attr('row'));
    var col   = _toInt($cell.attr('col'));

    $cell.val(null);

    // 값을 행, 열로 잘라 셀에 입력한다
    get_clipboard_text(e)
      .split(/\r\n|\r|\n/)
      .map(indexing)
      .every(function(line, i){
        if( ! _this.data[row + i]) return false;
      
        line.forEach(insert_one_row);
        return true;
      });
    _this.refresh();  // 화면을 갱신해 보여준다.
    return;
  } // end of function paste

  var isEmpty = (function(){
    var reg = /^\s*$/;
    return function(str) { return reg.test(str) }; 
  })();

  function insert_one_row (dt) {
    // 존재하지 않는 컬럼이라면 pass
    if(! _this.scheme[dt.col]) return true;
    // editable 셀이 아니라면 pass
    if( ! _this.is_editable_cell(dt.row, dt.col)) return true;

    _this.data[dt.row][dt.col] = _this.scheme[dt.col].data_push(undefined, dt, dt.txt);  // this.data 에 값을 입력한다.
  }

  for(var i = 0; i < 2; ++i)
    _this.div[2][i].bind('paste', paste);

  return _this; 
};

/**
 * 다음은 사용자 정의 이벤트 부여 펑션들이다.
 * attatch_click_event   : 클릭 이벤트 부여
 * attatch_change_event  : 값 변경 이벤트 부여
 * attatch_focusin_event : 포커스 인 이벤트 부여
 * attatch_focusout_event: 포커스 아웃 이벤트 부여
 * 
 * 이 펑션들을 호출하여 이벤트 콜백 펑션을 입력할 때마다 이벤트 보관 배열에 push 되며,
 * 이벤트가 발생한 이후 등록된 콜백 펑션들이 순차적으로 호출된다.
 * 
 * 각각의 이벤트 별 콜백 펑션이 보관되는 배열의 이름은 다음과 같다.
 * 
 * this.click_event
 * this.change_event
 * this.focusin_event
 * this.focusout_event
 * 
 * 다음과 같이 두 개의 콜백 펑션을 입력해 주면,
 * 셀을 click 했을 때 A_function 이 호출되고, 뒤이어 B_function 이 호출된다.
 * attatch_click_event( A_function );
 * attatch_click_event( B_function );
 * 
 * 배열을 돌며 펑션을 호출하므로, 만약 특정 이벤트의 발생을 중단하려면
 * 이벤트 보관 배열에서 해당 펑션을 제거하면 된다.
 * 
 * 또한, 특정 이벤트를 일시 중지하려면 this.event_flag 의 설정을 변경해주면 된다.
 * 다음은 this.event_flag 의 기본 설정이다.
 * this.event_flag = { click: true, change: true, focusin: true, focusout: true};
 * 
 * 콜백 펑션의 사용 예)
 * attatch_click_event( function(e, row, col, val, _this){} );
 * attatch_change_event( function(e, row, col, val, before, _this){} );
 * attatch_focusin_event( function(e, row, col, val, _this){} );
 * attatch_focusout_event( function(e, row, col, val, _this){} );
 *
 * ※ callback 펑션의 parameter 는 다음과 같다.
 * e     : 이벤트 객체
 * row   : 이벤트가 발생한 cell 의 row
 * col   : 이벤트가 발생한 cell 의 col
 * val   : 이벤트가 발생한 cell 의 data
 * before: (change 이벤트에서만 사용) change 이벤트 발생 이전의 data
 * _this : FGR 객체
 */
function _attatch_evt(event_arr, event_func){
  if(U.isFunction(event_func)){
    event_arr.push(event_func);
    return true;
  }
  return false;
};
FGR.prototype.attatch_click_event    = function(event_func){ return _attatch_evt(this.click_event,    event_func); };
FGR.prototype.attatch_change_event   = function(event_func){ return _attatch_evt(this.change_event,   event_func); };
FGR.prototype.attatch_focusin_event  = function(event_func){ return _attatch_evt(this.focusin_event,  event_func); };
FGR.prototype.attatch_focusout_event = function(event_func){ return _attatch_evt(this.focusout_event, event_func); };

/**
 * header cell 에 resize 기능을 입력한다
 * @dependent_on jquery-ui
 * @special_thanks : 이영서
 */
function _create_resizer() {

  var _this       = this;
  var resizer_css = {
    position : 'absolute',
    right    : 0,
    'z-index': 0,  // datepicker 의 z-index 가 1 이기 때문에 달력 위로 나타날 가능성을 제거해 준다
  };

  function stop_func (e, ui) {
    _this.col_resize(0, _this.scheme[0].width);
  }

  function resize_func (e, ui) {
    var col = _toInt($(this).attr('col'));
    _this.col_resize(col, ui.size.width);

    if(_this.get_gen_col() >= 0) _this.refresh();
  }
  
  this.scheme.forEach(function(column, i) {
    
    if( ! column.resize) return true;

    var cfg     = column.resize;
    var div     = (i < this.cfg.fixed_header) ? this.div.top_corner : this.div.col_label;
    var header  = div.find('div[col='+ i +']').last();
    var options = {
        maxHeight: header.height(),
        minHeight: header.height(),
        maxWidth : cfg.max || undefined,
        minWidth : cfg.min || 20,
        handles  : 'se',
        stop     : stop_func,
        resize   : resize_func,
    };
    
    resizer_css.top = header.height() - this.cfg.resize_icon_size;

    // resizable function 이 존재한다면 resize 아이콘을 생성한다
    if(header.resizable) header.resizable(options);

    header.css('position', 'absolute');
    this.resize_btn[i] = header.find('.ui-resizable-handle')
      .attr('title', _msg.header_resize)
      .css(resizer_css);
  }.bind(this));
  return this;
};
