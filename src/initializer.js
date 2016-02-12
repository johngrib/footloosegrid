
/**
 * config 를 초기화하고, 값이 주어지지 않은 항목을 default 값으로 채운다.
 * @param cfg
 * @returns {object}
 */
function _config_initialize(cfg) {

  var col_length = this.scheme.length;

  // 0. 사용자가 정의하지 않은 기본 값을 입력한다.
  var ncfg = _insert_undefined_values(cfg, _default_config);

  // 1. fixed_header, cols_show 값을 계산한다.
  if(ncfg.cols_show === undefined){
    ncfg.fixed_header = (col_length > 1) ? 1 : 0;
    ncfg.cols_show    = (col_length > 1) ? col_length - ncfg.fixed_header : col_length;
  }

  // 2. drill_color 를 설정한다
  /*
    drill_color 는 gen 넘버에 따라 row 가 갖게되는 배경색.
    http://www.perbang.dk/rgbgradient/ 에서 제공하는 gradation color 생성기를 통해 생성한 컬러 스키마를 이용해 작성하였음.
    만약 인쇄시에도 가독성 있는 배경색을 사용할 필요가 있다면 다음 주소를 참고할 만함.
    --> http://colorbrewer2.org/ - 미국 지질연구소 지도 디자인 담당 교수가 만든 (흑백/컬러) 인쇄를 위한 지도 색깔 그라데이션 생성 서비스.
  */
  if(ncfg.drill_down && ncfg.drill_color === undefined)
    ncfg.drill_color = [ '#FFFFFF', '#FBF0F3', '#F7E3EB', '#F3D5E7', '#EFC8E8', '#EABBEB', '#DBAFE7', '#CBA3E3', '#B297DF', '#998CDC' ];

  // 3. date 설정
  ncfg.date = (ncfg.date) ? _insert_undefined_values(ncfg.date, _default_date_config)
    : _default_date_config;

  return ncfg; 
};

/**
 * scheme type 별 default 설정을 추가(사용자가 정의한 scheme 의 빈 값을 default 값으로 채운다) 하고, 초기 설정을 계산한다
 * @param _this
 * @param scheme
 * @returns {object}
 */
function _scheme_initialize(scheme){

  this.get_cell_define = _make_const_getter(_create_cell_define(this));  // cell 의 type 에 따른 특징과 기능을 보관한다

  var _this = this;
  var date_cfg = (this.cfg.date) ? _insert_undefined_values(this.cfg.date, _default_date_config)
      : _default_date_config;

  // 사용자가 정의하지 않은 컬럼 기본 설정을 복사한다.
  function _get_column (col) {
    if(! col.type) throw new Error('need column type.');
    var def  = _default_scheme[col.type];
    var defn = (_.isString(def)) ? _default_scheme[def] : def;
    return _insert_undefined_values(col, defn);
  }
  
  scheme.forEach(function(col){
    
    var column = _get_column(col);

    // 컬럼 초기 width 를 설정한다
    column.init_width = column.width;  

    // edit false 라면 읽기 전용 배경색을 지정해 준다
    if(!column.bg_color && column.edit === false)
      column.bg_color = _style.readonly;

    // cell 타입별 정의를 참조한다.
    var set = this.get_cell_define()[column.type];  
    
    column.element = set.element;

    // 사용자가 설정한 getter 우선
    column.getter  = column.getter || set.getter;  

    column.init_data = (column.init_data === undefined) ? set.init_data : column.init_data;
    column.width_adj = set.width_adj;
    
    column.focus_in = column.focus_in || set.focus_in;

    if(column.type === 'date'){
      column.date = (column.date) ? _insert_undefined_values(column.date, date_cfg) : date_cfg;
    }

    if(! column.format_regexp && column.size && _.isNumber(column.size)){
      column.format_regexp = new RegExp('(^.{0,' + _toInt(column.size) + '}).*$');
    } else if(column.format){
      var point_length = column.format.replace(/^(#+\.)/, '').length;
      column.format_regexp = new RegExp('(^[^\\.]+(?:\\.\\d{1,' + point_length + '})?).*$');
    }
    
    if(column.format_regexp){
      column.input_slicer  = (function (format) {
        return function (v) { return String(v).replace(format, '$1') }; 
      })(column.format_regexp);
    }

    // output functions
    column.setter           = column.setter           || set.setter;
    column.output_validator = column.output_validator || set.output_validator;
    column.output_formatter = column.output_formatter || set.output_formatter;
    column.output_css       = column.output_css       || set.output_css;
    column.init_data        = column.init_data        || set.init_data;

    /*
     * data 를 화면에 보여주는 setter function wrapping 작업
     * combined setter : validator + output_css + formatter + setter
     */
    column.setter = (function(column, set){
      //setter($cell, value, row, col, this);
      var out_css   = column.output_css;
      var validator = column.output_validator;
      var formatter = column.output_formatter;
      var init_data = column.init_data;
      var setter    = column.setter;
      var setter2   = (formatter) ? function($cell, v, row, col, _this){ return setter($cell, formatter(v), row, col, _this); } : setter;
      var setter3   = (out_css)   ? function($cell, v, row, col, _this){ return setter2($cell.css(out_css(v)), v, row, col, _this); } : setter2;
      var setter4   = (validator) ? function($cell, v, row, col, _this){ return setter3($cell, validator(v) ? v : init_data, row, col, _this); } : setter3; 
      return setter4;
    })(column, set);

    // input functions
    column.getter          = column.getter          || set.getter;
    column.input_validator = column.input_validator || set.input_validator;
    column.input_formatter = column.input_formatter || set.input_formatter;
    column.input_caster    = column.input_caster    || set.input_caster;

    column.data_push = (function data_push(){

      var getter    = column.getter;
      var validator = column.input_validator;
      var formatter = column.input_formatter || function(v){ return v };
      var slicer    = column.input_slicer    || function(v){ return v };
      var caster    = column.input_caster    || function(v){ return v };
      var out_css   = column.output_css;
      var after_input = column.after_input;
      
      function get_result (v_string, validator, loc) {
        if(! validator)
          return v_string;
        else if(validator(v_string))
          return caster( slicer(v_string));
        else
          return _this.data[loc.row][loc.col];
      }
    
      return function($cell, loc, value){

        var result = get_result(formatter(value), validator, loc);

        if($cell && out_css) $cell.css(out_css(result));
        
        if(after_input) after_input($cell, loc, result);

        return result;
      };
    })(); // end of data_push

    return column;
  }, this);

  return scheme;
};
