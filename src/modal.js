"use strict";

/**
 * 메시지 출력용 모달을 제어한다. 사용법은 다음과 같다.
 * 
 * 예) var md = grid.modal('로딩중입니다', false);  // 로딩중임을 표현하고, 확인(닫기) 버튼은 나타나지 않는다.
 * 
 * md.button(false); // 확인 버튼을 숨긴다.
 * md.hide();        // 메시지 출력을 중지한다.
 * md.show(true);    // 메시지를 출력한다. true 옵션을 주면 grid cover 가 활성화된다.
 * md.text('saved'); // 메시지를 변경한다.
 * md.obj            // jQuery wrapped div 객체
 * 
 * @param text
 * @param button
 * @returns {___anonymous125732_126157}
 */
FGR.prototype.modal = function(text, button){

  var _this  = this;
  var modal  = this.div.modal;
  var body   = modal.find('div[role=body]');
  var cont   = modal.find('div[role=control]');
  var disable= function(d) { if(U.isBoolean(d)) _this.disable(d); };
  var func   = {
      obj : modal,
      show: function (d) { modal.show(); disable(d); },
      hide: function (d) { modal.hide(); disable(d); },
      text: function (m) { body.empty().append(m);   },
      button: function (v) { cont[v ? 'show' : 'hide'](); },
  };

  func.text(text);
  func.button(button);
  return func;
};

/**
 * 범용 모달을 생성한다
 * @returns {FGR}
 */
function _create_modal_div(){
  var  _this   = this;
  var div_attr = {'class': _style.modal_div, align: 'center'};
  var div      = $('<div>', div_attr).appendTo(this.div.main);
  var title    = $('<div>', {html: '', role: 'title', 'class': _style.modal_content});
  var body     = $('<div>', {html: '', role: 'body',  'class': _style.modal_content});
  var control  = $('<div>', {role: 'control', align: 'center', 'class': _style.modal_content});
  var okay_btn = $('<button>', {text: _msg.confirm});
  this.div.modal = div;

  div.position({my: 'center', at : 'center', of: this.div.main});
  div.append([title, body, control]);
  control.append(okay_btn);
  okay_btn.css({position: 'relative', right: 0}).click(function() { div.hide(); _this.disable(false);});

  title.hide();
  control.hide();
  return this;
};

// TODO : 빅 넘버 타입 추가할 것
// TODO : 평균, 합계에 format 입력할 것
// TODO : 필터 기능 적용시 체크박스와 라디오버튼 조건으로 true/false 선택하게 할 것.
// TODO : calc column 추가하고, 중간 sum 기능 추가할 것
// TODO : hide_empty_rows 옵션을 추가할 것.

