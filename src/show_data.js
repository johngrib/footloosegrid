/**
 * 그리드 상의 데이터 뷰를 갱신한다
 * @returns {FGR}
 */
FGR.prototype.refresh = function(){
  this.render_data(this, this.current_top_line);
  return this;
};

/**
 * data cell 에 값을 입력하거나, 값을 가져온다
 * 예)
 *  Cell_value(3,2)     : 3 row, 2 col 의 값을 가져온다  (getter)
 *  Cell_value(3,2, 77) : 3 row, 2 col 에 77 을 입력한다 (setter)
 * @param row
 * @param col
 * @param value
 * @returns
 */
FGR.prototype.Cell_value = function(row, col, value){
  var $cell  = this.cell[row][col];
  var scheme = this.scheme[col];
  var func   = (value === undefined) ? scheme.getter : scheme.setter;
  return func($cell, value, row, col, this);
};

/**
 * data cell 에 값을 입력한다.
 * 예)
 *  Set_cell_value(3,2, 77) : 3 row, 2 col 에 77 을 입력한다 (setter)
 * @param row
 * @param col
 * @param value
 * @returns
 */
FGR.prototype.Set_cell_value = function(row, col, value){
  var $cell = this.cell[row][col];
  return this.scheme[col].setter($cell, value, row, col, this);
};

/**
 * 화면에 데이터를 보여주는 data render 펑션
 * 이 펑션은 일반적인 방법으로 호출되지 않으며, data_render 변수에 담겨 호출된다
 * @param _this
 * @param row_cnt : 렌더링할 데이터의 가장 윗 줄 index
 * @returns
 */
function _show_data(_this, row_cnt) {
  
  var len = _this.scheme.length;
  var rsh = _this.cfg.rows_show;
  var i, j;

  for(i = 0; i < rsh; ++i){
    var row     = row_cnt + i;
    var one_row = _this.data[row];

    if(one_row){
        if(one_row.bg_color === undefined) one_row.bg_color = 'transparent';

        _this.paint_one_row(i, one_row.bg_color);

        for(j = 0; j < len; ++j){
          _this.cell[i][j].attr('row', row);
          _this.Set_cell_value(i,j, one_row[j]);
        }
    }
  }
  _this.show_highlight_bar();
  return _this;
};

/**
 * 드릴 다운 기능이 설정되었을 경우 사용되는 data render 펑션
 * 이 펑션은 일반적인 방법으로 호출되지 않으며, data_render 변수에 담겨 호출된다
 * @param _this
 * @param row_cnt
 * @returns {FGR}
 */
function _show_drill_data(_this, row_cnt) {
  
  var len = _this.scheme.length;
  var rsh = _this.cfg.rows_show;
  var i, j;

  for(i = 0; i < rsh; ++i){
    var row     = row_cnt + i;
    var one_row = _this.data[row];

    if(one_row){

        for(j = 0; j < len; ++j){
          // 값 표현
          _this.cell[i][j].attr('row', row);
          _this.Set_cell_value(i,j, one_row[j]);
        }
        
        // gen_label 처리
        var gen_col  = _this.get_gen_col();
        var label_col= _this.get_gen_label_col();
        var gen      = one_row[gen_col];
        var next_row = ((row + 1) < _this.data.length) ? _this.data[row+1] : undefined;
        var next_gen = next_row ? next_row[gen_col] : -1;
        var btn      = _this.drill_btn[i];
        var indent   = _style.drill_indent * gen;

        btn.attr({ row: row, gen: gen });
        _this.drill_cell[i].css('padding-left', indent);
        _this.drill_cell[i].width(_this.scheme[label_col].width - indent - _style.input_padding);
        
        if (one_row.children) {
          // 현재 row 가 children 을 숨기고 있다면 + 버튼을 보여준다.
          btn.show();
          btn.text('+');
        } else if(gen < next_gen){
          // 현재 row 가 부모인 경우 - 버튼을 보여준다.
          btn.show();
          btn.text('-');
        } else {
          // 현재 row 가 부모가 아닌 경우 버튼을 숨긴다.
          btn.hide();
        }

        // 배경색 처리
        if(one_row.bg_color === undefined) 
          one_row.bg_color = 'transparent';
        _this.paint_one_row(i, one_row.bg_color);

    } else {
        _this.drill_btn[i].hide();
        _this.data[row] = _this.create_init_data(1)[0];
        _this.data[row].empty = true;
      
      for(j = 0; j < len; ++j){
        // 값 표현
        _this.cell[i][j].attr('row', row);
        _this.Set_cell_value(i,j, _this.data[row][j]);
      }
    }
  }
  _this.show_highlight_bar();
  return _this;
};

/**
 * cell 객체의 데이터 상의 좌표를 구한다
 * @param cell : (DOM element) input 이나 select 등 cell 역할을 하는 엘리먼트
 * @returns {row, col}
 */
FGR.prototype.get_loc = function(cell){
  return {row: _toInt(cell.getAttribute('row')), col: _toInt(cell.getAttribute('col'))};
};

/** highlight bar 를 표시하고 cursor focused 를 이동한다. */
FGR.prototype.show_highlight_bar = function(){

  if( ! this.highlight_refresh){
    this.highlight_refresh = true;
    return this;
  }

  if(this.highlight_row < 0) return this;

  if(this.pre_cell) this.pre_cell.attr('disabled', false);

  if(this.row_selected >= this.current_top_line && this.row_selected < this.current_top_line + this.rows.length){
      // selected row 가 화면 내에 있다면

      var editable = this.is_editable_cell(this.row_selected, this.col_selected);

      this.highlight_row = this.row_selected - this.current_top_line;
      this.paint_one_row(this.highlight_row, _style.row_selected);
      
      if(this.col_selected && ! editable)
        this.pre_cell = this.cell[this.highlight_row][this.col_selected].attr('disabled', true);
      else if(this.col_selected && editable) 
        this.cell[this.highlight_row][this.col_selected].focus();
  } else {
    // IE8 인 경우 $(':focus').blur() 를 사용하게 되면 IE8 자체 버그가 발생한다
    if(this.is_IE())
      this.div[0][1].focus();  
    else
      $(':focus').blur();
  }
  return this;
};

/**
 * 하나의 row 를 색칠한다
 * @param index : 화면상의 row index (data index 가 아님)
 * @param color
 * @returns {FGR}
 */
FGR.prototype.paint_one_row = function(index, color){
  for (var i = 0; i < 2; i++)
    this.rows[index][i].css('background-color', color);
  return this;
};

/**
 * 하나의 row 를 숨긴다
 * @param index
 * @param is_hide
 * @returns {FGR}
 */
FGR.prototype.hide_one_row = function(index, is_hide){
  for (var i = 0; i < 2; i++)
    this.rows[index][i][is_hide ? 'hide' : 'show']();
  return this;
};

/**
 * 수직 스크롤의 길이를 조절한다
 * @param row_count : (number || string) 스크롤의 길이 조절 참고용 row 의 숫자
 * @returns {FGR}
 */
function _adjust_scroll_v(_this, row_count){

  var scroll = (_this.data.length > _this.cfg.rows_show) ? 'scroll' : 'hidden';
  var cnt = (function() {
    if(row_count === 'visible')
      return _this.div.data_table.find('.' + _style.row + ':visible').length;
    else if(U.isNumber(row_count))
      return row_count;
  })();

  var scroll_height = cnt * _this.cfg.row_height;
  _this.scroll_v_inner.height(scroll_height);
  _this.div.scroll_v.css('overflow-y', scroll);

  return _this;
};

/**
 * row_label 과 data_table 의 홀수행과 짝수행의 배경색을 다르게 칠한다
 * @param _this
 */
FGR.prototype.paint_rows = function(_this){
  function paint (query, color) {
    for(var i = 0; i<2; ++i)
      _this.div[2][i].find('.' + _style.row + query).css('background-color',color);
  };

  paint(':odd', _style.row_color_odd);
  paint(':even', _style.row_color_even);
  return this;
};
