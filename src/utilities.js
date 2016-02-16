// getter 생성기
function _make_const_getter(v) {
  return function() { return v };
}

// parseInt wrapped
function _toInt(num){
  return parseInt(num, 10);
}

function _is_number (value) {
  return typeof value === 'number' && isFinite(value);
}
/**
 * 숫자 형식의 문자열 판별
 * 정수와 실수는 true 를 리턴하며, 과학 표기법은 false 를 리턴한다
 * @returns {Boolean}
 */
var _is_number_str = (function () {
  var reg = /^\s*-?\d+(?:\.\d+)?\s*$/;
  return function (str) { return reg.test(str) };
})();

/**
 * 숫자에 콤마를 넣어 문자열로 리턴해 준다
 * @returns {String}
 */
var _to_comma_format = (function() {
  var reg = /\B(?=(\d{3})+(?!\d))/g;
  return function (num) {
    if(num == null)
      return num;

    var v   = num.toString();
    var dot = v.indexOf('.');

    if(dot >= 0){
      var tail = v.slice(dot);
      var head = v.slice(0, dot);
      return head.replace(reg, ",") + tail;
    } else {
      return v.replace(reg, ",");
    }
  };
})();
// UNIT TEST
QUnit.test("_to_comma_format", function( assert ) {
  var rs1 = _to_comma_format(123456789.1234567);
  assert.ok(rs1 === '123,456,789.1234567',"Passed!" );

  var rs2 = _to_comma_format(undefined);
  assert.ok(U.isUndefined(rs2),"Passed!" );
});

/** default_obj 에 존재하는 key/value 값이 target_obj 에 존재하지 않는다면 해당 key/value 값을 복사해 입력해 준다 */
function _insert_undefined_values(target_obj, default_obj) { 
  for(var key in default_obj)
    if(target_obj[key] === undefined)
      target_obj[key] = default_obj[key];
  return target_obj; };

/** event interceptor 를 부착해주는 function creator */
FGR.prototype.set_interceptor = function set_interceptor (target, interceptor, _this) {
  return function () {
    var args = [].slice.call(arguments);
    interceptor.apply(_this, args);
    return target.apply(_this, args); 
  };
};

/**
 * css 파일에 정의되지 않은 class 를 생성하여 삽입한다
 * @param id
 * @param rule
 * @link https://stackoverflow.com/posts/10147897/revisions
 *
 * 이 펑션의 존재 이유는 특정 DOM 의 사이즈나 색깔을 그룹 단위로 조절할 때의 퍼포먼스를 확보하기 위함이다
 * 모든 셀과 컬럼의 위치를 for 루프를 통해 조정하면 속도가 느려질 수 밖에 없다
 * 그러나 이 펑션에서 사용한 css injection 기법을 사용하면
 * web browser 의 native code 구동을 유도하기에 속도가 for 루프보다 훨씬 빠르다
 * 특히 대상 객체가 많을수록 차이가 더 커진다
 *
 * css injection 에 대해서는 같은 고민을 한 사람이 여럿 있는 것 같은데, 다음 링크는 확인해보지 못했지만 살펴볼 가치가 있을듯
 * https://github.com/kajic/jquery-injectCSS
 */
function _insert_new_styles(_this, id, rule) {
  $('#' + id).remove();
  $("<div>", { id: id, html: '<style>' + rule + '</style>' })
    .appendTo(['#', _this.get_id()].join(''));
  return _this; 
}

  
/**
 * Internet Explorer 버전 체크
 * ※ IE 11 버전부터는 cc_on 문이 작동하지 않으므로, ie 값이 false 가 된다.
 * @returns {Boolean}
 * @link https://msdn.microsoft.com/library/8ka90k2e(v=vs.94).aspx
 */
function _check_ie_version(){
  var version = -1;
/*@cc_on
  @if   (@_jscript_version == 10)
    version = 10;
  @elif (@_jscript_version == 9)
    version = 9;
  @elif (@_jscript_version == 5.8)
    version = 8;
  @end
@*/
  return version;
};

/**
 * 스크롤 바의 너비(width) 를 구한다
 * @returns {Number}
 * @link http://chris-spittles.co.uk/jquery-calculate-scrollbar-width/
 */
FGR.prototype.get_scroll_bar_width = function() {
  var div_inner = $('<div>', {html: 'scroll test', style: 'width:100%;height:200px;'});
  var div_outer = $('<div>', {style:'width:200px;height:150px;position:absolute;top:0;left:0;visibility:hidden;overflow:hidden;'}).append(div_inner);

  $('body').append(div_outer);
  var width1 = div_inner[0].offsetWidth;
  div_outer.css('overflow', 'scroll');
  var width2 = div_outer[0].clientWidth;
  div_outer.remove();
  return width1 - width2;
};
