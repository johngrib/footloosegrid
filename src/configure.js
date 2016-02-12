// configure ---------------------------------------------------
/*
 * ※ monospace 지원 폰트로 볼 때 잘 보입니다.
 *
 * ┌────────┤ main div : user defined div┣─────┐  main div 는 html, jsp 에서 사용자가 정의한 div 를 사용한다
 * │   table : _fg_main_tbl                     │
 * │                                            │  _fg_div_left  는 top_corner 와 row_label  을 포함한다
 * │  _fg_div_left  _fg_div_right               │  _fg_div_right 는 col_label  과 data_table 을 포함한다
 * │ ┌────────────┬────────────┬───┐            │  top_empty, bot_empty, bot_corner 는 사용하지 않는 div
 * │ │ top_corner │ col_label  │   │ top_empty  │
 * │ │ _fg_div_00 │ _fg_div_01 │   │ _fg_div_02 │  corner, col_label, top_empty 등은 사용 편의를 위한 alias 이며
 * │ ├────────────┼────────────┼───┤            │  _fg 로 시작하는 이름들은 html element 의 id 이다
 * │ │ calc_left  │ calc_right │   │ calc_empty │
 * │ │ _fg_div10  │ _fg_div11  │   │ _fg_div_12 │
 * │ ├────────────┼────────────┼───┤            │  _fg 로 시작하는 이름들은 html element 의 id 이다
 * │ │            │            │ ^ │            │
 * │ │ row_label  │ data_table │ │ │ scroll_v   │
 * │ │ _fg_div_20 │ _fg_div_21 │ │ │ _fg_div_22 │
 * │ │            │            │ v │            │
 * │ ├────────────┼────────────┼───┤            │
 * │ │            │<---------> │   │            │
 * │ │ bot_empty  │ scroll_h   │   │ bot_corner │
 * │ │ _fg_div_30 │ _fg_div_31 │   │ _fg_div_32 │
 * │ ├────────────┴────────────┴───┤            │
 * │ │ bot_paging                  │            │
 * │ │ _fg_div_40                  │            │
 * │ └─────────────────────────────┘            │
 * └────────────────────────────────────────────┘
*/

// 기본 설정
var _default_config = {
  wheel_move_row : 1 ,  // 마우스 휠 한 번으로 스크롤할 row 의 수
  drill_down     : false,
  rows_show      : 20,  // 한 페이지에 보여줄 row 의 수 (테이블 전체 height 자동 조정)
  row_height     : 25,  // 한 row 의 height
  checkbox_size  : 20,  // checkbox 와 radio 버튼의 사이즈
  resize_icon_size     : 16,
  scroll_delay_ms      : 10,
  flexible_right_width : true,
  use_filter_div       : false,
  use_filter_panel     : false,
  use_sort_panel       : false,
  search_by_reg_exp    : false,
  search_replace       : false,
};

// datepicker 기본 설정
var _default_date_config = {
  dateFormat  : 'yy-mm-dd',
  changeYear  : true,
  changeMonth : true,
  weekHeader  : 'Wk',
  yearRange   : 'c-20:c+20',
  dayNamesMin :     ['일', '월', '화', '수', '목', '금', '토'],
  monthNames  :     ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  constrainInput     : true, // true: 숫자만 입력 가능, false: 다른 키도 입력 가능
  showMonthAfterYear : true,
};

// scheme type 별 디폴트 값 정의. 설정하지 않은 값들은 아래의 값으로 초기화된다.
var _default_scheme = {
  str       : {name:'', label:'', width: 100, h_align:'center', align:'left',   valign:'middle', edit: true, size: 2000},
  number    : {name:'', label:'', width: 100, h_align:'center', align:'right',  valign:'middle', edit: true, format: '#.############'},
  check     : {name:'', label:'', width: 30,  h_align:'center', align:'center', valign:'middle', edit: true},
  select    : {name:'', label:'', width: 100, h_align:'center', align:'center', valign:'middle', edit: true, option: []},
  gen       : 'check',  // check 와 같은 초기값을 갖는다.
  gen_label : 'check',
  radio     : 'check',
  date      : 'str'
};

// css class 스타일 이름 정의
var _style = {
  main_div : '_fg_main_div',
  row      : '_fg_row',
  cell     : '_fg_cell',
  label    : '_fg_label_text',
  input    : '_fg_input_text',
  check    : '_fg_input_check',
  select   : '_fg_input_select',
  img      : '_fg_input_img',
  calc     : '_fg_calc',
  idiv     : '_fg_input_div',
  scroll_h : '_fg_scroll_h',
  scroll_v : '_fg_scroll_v',
  readonly : '#F5EAB9',  // 읽기 전용 셀의 배경색

  row_color_odd  : '#FFFFFF' ,
  row_color_even : '#E8EEF5',
  row_selected   : '#E8EEF5',
  row_bot_line   : '1px solid #B6B6B6',
  input_padding  : 5,

  paging_button          : '_fg_paging_button',
  paging_button_selected : '_fg_paging_button_selected',

  sort_btn   : '_fg_sort_btn',
  search_div : '_fg_div_search',

  filter_btn          : '_fg_filter_icon',
  filter_btn_red      : '_fg_filter_icon_red',
  filter_div          : '_fg_div_filter',
  filter_cond         : '_fg_filter_cond',
  filter_inner_btn    : '_fg_filter_inner_btn',
  filter_sort_div     : '_fg_filter_sort_div',
  filter_search_div   : '_fg_filter_search_div',
  filter_sort_title   : '_fg_filter_sort_title',
  filter_search_title : '_fg_filter_search_title',
  filter_filter_title : '_fg_filter_filter_title',
  filter_check        : '_fg_filter_checkbox',
  filter_input        : '_fg_filter_input',
  filter_plus_btn     : '_fg_filter_plus_btn',
  filter_minus_btn    : '_fg_filter_minus_btn',

  drill_btn       : '_fg_drill_btn',
  drill_indent    : 13,
  drill_btn_width : 20,  // drill down 사용시의 label 인덴트와 버튼 사이즈(border, margin 포함)
  sort_btn_width  : 15,

  modal_div     : '_fg_div_modal',
  modal_content : '_fg_modal_content'
};

// message 설정
var _msg = {
  header_resize : '마우스로 드래그하여 너비를 조정할 수 있습니다',
  filter_run    : '적용',
  filter_close  : '닫기',
  filter_clear  : '조건 초기화',
  sort_asc      : '오름차순으로 정렬',
  sort_desc     : '내림차순으로 정렬',
  reg_exp       : 'Regular Expression',
  ig_case       : '대소문자 무시',
  find_btn      : '찾기',
  replace_btn   : '바꾸기',
  close_btn     : '닫기',
  whole_word    : '일치하는 단어만 찾기',
  wild_card     : '와일드카드(?, *) 사용',
  search_fail   : '검색 결과가 없습니다.',
  search        : '검색',
  direction     : '방향',
  option        : '옵션',
  target        : '대상',
  do_search     : '찾기',
  forward       : '정방향',
  reward        : '역방향',
  confirm       : '확인',
  filter_none   : '선택',
  filter_eq     : '= 일치',
  filter_ne     : '&ne; 불일치',
  filter_lt     : '< 작다',
  filter_gt     : '> 크다',
  filter_le     : '≤ 작거나 같다',
  filter_ge     : '≥ 크거나 같다',
  filter_begin  : '^= 시작 문자',
  filter_end    : '$= 끝 문자',
  filter_cont   : '*= 포함 문자',
  filter_ncont  : '*&ne; 제외 문자'
};

/**
 * Encoding 과 관계없이 표현가능한
 * Unicode HTML Entity (decimal) 집합
 */
FGR.prototype.sp_char = {
// 주요 그리스 문자
  g_gamma   : '&#915;',  // Γ  &Gamma;
  g_delta   : '&#916;',  // Δ  &Delta;
  g_lambda  : '&#923;',  // Λ  &Lambda;
  g_pi      : '&#928;',  // Π  &Pi;      - product 연산자, 중복순열
  g_sigma   : '&#931;',  // Σ  &Sigma;   - 순열의 합
  g_phi     : '&#934;',  // Φ  &Phi;     - 정규 분포
  g_gamma_l : '&#947;',  // γ  &gamma;
  g_delta_l : '&#948;',  // δ  &delta;
  g_lambda_l: '&#955;',  // λ  &lambda;  - 람다(선형대수학), 함수 표현식
  g_pi_l    : '&#960;',  // π  &pi;      - 원주율
  g_sigma_l : '&#963;',  // σ  &sigma;   - 표준편차, 약수함수
  g_phi_l   : '&#966;',  // φ  &phi;     - 원의 지름, 함수

// 수학, 논리학
  m_lt     : '&#60;'  ,  // <  &lt;
  m_gt     : '&#62;'  ,  // >  &gt;
  m_not    : '&#172;' ,  // ¬  &not;     - not (논리학)
  m_plusmn : '&#177;' ,  // ±  &plusmn;
  m_times  : '&#215;' ,  // ×  &times;
  m_divide : '&#247;' ,  // ÷  &divide;
  m_forall : '&#8704;',  // ∀  &forall;  - 모든(수학/논리학)
  m_exist  : '&#8707;',  // ∃  &exist;   - 존재(수학/논리학)
  m_radic  : '&#8730;',  // √  &radic;   - square root. 제곱근(수학)
  m_infin  : '&#8734;',  // ∞  &infin;   - 무한대
  m_int    : '&#8747;',  // ∫  &int;     - 인테그랄. 유니코드와 LaTeX 의 표기가 다르니 주의
  m_ne     : '&#8800;',  // ≠  &ne;
  m_le     : '&#8804;',  // ≤  &le;
  m_ge     : '&#8805;',  // ≥  &ge;
  m_less_oeq: '&#8806;',  // ≦  named entity 가 아님
  m_grt_oeq : '&#8807;',  // ≧  named entity 가 아님

// 단위 : 통화에 대해서는 다음 페이지를 참고할 것 http://www.xe.com/symbols.php
  u_per_mil    : '&#8240;' ,  // ‰  &permil;  - 천분율
  u_euro       : '&#8364;' ,  // €  &euro;    - 유로 : 영국, 스위스를 제외한 유럽
  u_celsius    : '&#8451;' ,  // ℃  no named  - 섭씨
  u_fahrenheit : '&#8457;' ,  // ℉  no named  - 화씨
  u_yuan       : '&#20803;',  // 元  no named  - 중국, ￥ 을 쓰는 경우도 있다
  u_cent       : '&#65504;',  // ￠  no named  - 미국
  u_pound      : '&#65505;',  // ￡  no named  - 영국
  u_yen        : '&#65509;',  // ￥  no named  - 일본
  u_won        : '&#65510;',  // ￦  no named  - 한국

// 공백
  c_nbsp : '&#160;'  // space &nbsp;  - 공백
};
