/**
 * 검색창을 생성한다.
 */ 
function _create_search_div(){

  function create_table(blue_print){
      var $table = $('<table>');
      for(var i in blue_print){
        var tr = $('<tr>').appendTo($table);
        for(var j in blue_print[i])
          $('<td>').appendTo(tr).append(blue_print[i][j]);
      }
      return $table;
  }

  var _this = this;
  var _id   = this.get_id();
  var div   = $('<div>', {'class': _style.search_div, align: 'right'});
  var column_select = _create_filter_column_select(this, {id: _id + '_search_column_range'});

  this.div.search = div.appendTo(this.div.main).draggable({ containment: "parent" });
  column_select.find('option[type=radio], option[type=check]').remove();
  column_select.prepend($('<option>', {html: '전체', value: 'all'}));

  // 검색 fieldset
  var b_print = {
    column  : { title: $('<label>', {html: _msg.target}),   obj: column_select},
    search  : { title: $('<label>', {html: _msg.do_search}),obj: $('<input>') },
    replace : { title: $('<label>', {html: 'replace'}),     obj: $('<input>') },
  };

  // 방향 fieldset
  var d_print = {
    direction : {
      f_obj   : $('<input>', {type: 'radio', name : _id + '_search_dir', id: _id +'_search_f_dir', checked: true}), 
      f_title : $('<label>', {html: _msg.forward,'for': _id + '_search_f_dir'}), 
      b_obj   : $('<input>', {type: 'radio', name : _id +'_search_dir', id: _id +'_search_b_dir'}), 
      b_title : $('<label>', {html: _msg.reward, 'for': _id +'_search_b_dir'}),
    }
  };

  // 옵션 fieldset
  var options = {
    case_ignore : {  // 대소문자 무시
      obj   : $('<input>', {type: 'checkbox',     'id' :_id+'_search_case_ignore'}),
      title : $('<label>', {html: _msg.ig_case,   'for':_id+'_search_case_ignore'}) },
    whole_word  : {  // 일치하는 단어만 검색
      obj   : $('<input>', {type: 'checkbox',     'id' :_id+'_search_whole_word'}),
      title : $('<label>', {html: _msg.whole_word,'for':_id+'_search_whole_word'}) },
    wild_card   : {  // 와일드 카드 사용
      obj   : $('<input>', {type:'checkbox',      'id' :_id+'_search_wild_card'}),
      title : $('<label>', {html: _msg.wild_card, 'for':_id+'_search_wild_card'}) },
    reg_exp     : {  // 정규 표현식 사용
      obj :   $('<input>', {type:'checkbox',      'id' :_id+'_search_regular_expression'}),
      title : $('<label>', {html: _msg.reg_exp,   'for':_id+'_search_regular_expression'}) }
  };

  var field1   = $('<fieldset>', {align: 'left'});
  var field2   = $('<fieldset>', {align: 'left'});
  var field3   = $('<fieldset>', {align: 'left'});
  var title    = $('<legend>', {html: _msg.search   });
  var title2   = $('<legend>', {html: _msg.direction});
  var title3   = $('<legend>', {html: _msg.option   });
  var find_btn = $('<button>', {html: _msg.find_btn   });
  var repl_btn = $('<button>', {html: _msg.replace_btn});
  var close_btn= $('<button>', {html: _msg.close_btn  });

  // 조립
  div.append([field1, field2, field3, find_btn, repl_btn, close_btn]);
  field1.append([title,  create_table(b_print)]);
  field2.append([title2, create_table(d_print)]);
  field3.append([title3, create_table(options)]);

  // show, hide 처리
 ;[b_print.replace.obj, b_print.replace.title, repl_btn].forEach( function(obj) { obj[this.cfg.search_replace ? 'show':'hide']() }.bind(this));
 ;[options.reg_exp.obj, options.reg_exp.title].forEach( function(obj) { obj[this.cfg.search_by_reg_exp ? 'show':'hide']() }.bind(this));

  // 이벤트 처리
  column_select.keydown(function(e){
    if(e.keyCode === 9 && e.shiftKey){  // <S-Tab>
      close_btn.focus();
      e.preventDefault();
    } });

  b_print.search.obj.keydown(function(e){
    if(e.keyCode === 13)  // <ENTER>
      find_btn.click();
  });

  // regular_expression 옵션이 켜지면 whole_word, wild_card 옵션은 disabled 상태로 바뀐다.
  options.reg_exp.obj.click(function(e){
    var op      = options;
    var flag    = $(this).prop('checked');
    var disable = function (obj, flag) { return obj.attr('disabled', flag).css('opacity', flag ? 0.3 : 1) };
    [].concat( _.values(op.whole_word), _.values(op.wild_card) ).forEach( function(o) { disable(o, flag) });
  });

  // close 버튼 
  close_btn.click(function(e){ div.hide(); })
    .keydown(function(e){
      if(e.keyCode === 9 && !e.shiftKey){
        column_select.focus();
        e.preventDefault();
      } });

  // 검색 버튼
  find_btn.click(function(e){

    var direction  = d_print.direction.f_obj.prop('checked') ? 1 : -1;
    var whole_word = options.whole_word.obj.prop('checked');
    var ignore_case= options.case_ignore.obj.prop('checked');
    var wild_card  = options.wild_card.obj.prop('checked');
    var reg_exp    = options.reg_exp.obj.prop('checked');
    var query      = b_print.search.obj.val();
    var range      = column_select.val();
    var start_col = (range === 'all') ? 0 : _toInt(range);
    var end_col   = (range === 'all') ? _this.scheme.length : _toInt(range) + 1;
    // ※ is_match 펑션의 두 파라미터는 다음과 같다. d : 필터링 할 데이터, v : 사용자가 입력한 비교 값
    var is_match  = _this.create_search_reg_exp (query, reg_exp, whole_word, ignore_case, wild_card);
    var start_row = _this.row_selected + direction;
    var query_arr = [];  // query_arr, query_reg : select 타입인 경우 실제 데이터 값과 표시되는 값이 다르기 때문에
    var query_reg = [];  // 실제 데이터 값(text)과 비교하지 않고, text 값과 비교해야 한다. 따라서 검색의 기준이 되는 query 배열을 마련한다.

    // 검색 query 수집: 검색 속도를 위해 각 컬럼(타입)별로 정규식을 생성한다.
    _this.scheme.forEach(function(column, i){
      query_reg[i] = /$^/;

      if(column.type === 'select'){
        // select type 인 경우 option 을 검색해야 한다.
        loopK : for(var k = 0; k < column.option.length; ++k){
          if(is_match.test(column.option[k].text)){
            query_arr[i] = column.option[k].value; 
            query_reg[i] = this.create_search_reg_exp(query_arr[i], false, true, false, false);
            break loopK; 
          }
        }
      } else if(column.type === 'number'){
        query_arr[i] = query;
        query_reg[i] = this.create_search_reg_exp(query_arr[i], reg_exp, whole_word, ignore_case, wild_card);
      } else if(column.type.match(/check|radio/)){    // check, radio 는 검색하지 않는다
        query_arr[i] = 'not';
        query_reg[i] = /$^/;
      } else {
        query_arr[i] = query;
        query_reg[i] = this.create_search_reg_exp(query_arr[i], reg_exp, whole_word, ignore_case, wild_card);
      }
    }, _this);

    // 검색 ---------------------------------------------------------------------
    var success   = false;
    var cell;
    var set_focus = function set_focus () { 
        if(!cell) return;
        cell.closest('.' + _style.row).mousedown();
        cell.click().focus(); 
    };

    // 커서가 있는 라인부터 검색한다.
    loopI : for(var i = start_row, cnt = 0; cnt < _this.data.length; i+=direction, ++cnt){

      if(i >= _this.data.length)
        i -= _this.data.length;
      else if( i < 0 )
        i = _this.data.length - 1;

      for(var j = start_col; j < end_col; ++j){
        var v = _this.data[i][j];

        if(query_reg[j].test(v)){
          _this.scroll_row(-_this.data.length * 2).scroll_row(i);
          success = true;
          cell    = _this.cell[ i - _this.current_top_line][j];
          setTimeout(set_focus, 100);
          break loopI;
        }
      }
    } // enf of loopI

    if( ! success) alert(_msg.search_fail);
  });
  return this;
};

/**
 * 검색에 사용할 정규 표현식을 동적으로 생성한다
 * @param query
 * @param reg_exp
 * @param whole_word
 * @param ignore_case
 * @param wild_card
 * @returns
 */
FGR.prototype.create_search_reg_exp = function (query, reg_exp, whole_word, ignore_case, wild_card){

  if(query === undefined || query === null) return /$^/;

  // 정규식 옵션이 있다면 사용자가 입력한 정규식을 그대로 사용한다
  if(reg_exp) return new RegExp(exp, ignore_case ? 'i' : undefined);

  // 정규식 옵션이 없다면 사용자의 query 를 바탕으로 정규식을 생성한다
  var exp = query;

  // 1. 공백을 \s 로 치환한다
  exp = exp.replace(/\s/g, '\\s');

  // 2. 사용자가 입력한 특수문자 앞에 \ 를 붙여준다. 예) ? -> \?
  exp = exp.replace(/([\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\`\~\;\:\'\"\,<\.\>\/\?\\\|])/g, '\\$1');

  // 3. 와일드 카드를 사용한다면, \? 를 . 으로, \* 를 .* 로 치환한다.
  if(wild_card){
    exp = exp.replace(/\\\?/g, '.' );
    exp = exp.replace(/\\\*/g, '.*');
  }

  // 4. 일치 검색이라면 ^ $ 를 정규 표현식의 앞뒤에 붙여준다.
  if(whole_word) exp = '^' + exp + '$';

  // 5. 정규식을 생성한다. ignore_case 옵션이 있다면 i 를 추가한다
  return new RegExp(exp, ignore_case ? 'i' : undefined);
};

