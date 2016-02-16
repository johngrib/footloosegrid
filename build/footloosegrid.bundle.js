/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*! footloosegrid 2016-02-16 */
	function time_start(a){return time_start[a]=(new Date).getTime()}function time_end(a){var b=(new Date).getTime()-time_start[a];return console.log(a+" : "+b),b}window.time_start=time_start,window.time_end=time_end;var U=__webpack_require__(1);window.footloosegrid=function(a){function b(a){return function(){return a}}function c(a){return parseInt(a,10)}function d(a){return"number"==typeof a&&isFinite(a)}function e(a,b){for(var c in b)void 0===a[c]&&(a[c]=b[c]);return a}function f(b,c,d){return a("#"+c).remove(),a("<div>",{id:c,html:"<style>"+d+"</style>"}).appendTo(["#",b.get_id()].join("")),b}function g(){var a=-1;return a}function h(a){var b=this.scheme.length,c=e(a,aa);return void 0===c.cols_show&&(c.fixed_header=b>1?1:0,c.cols_show=b>1?b-c.fixed_header:b),c.drill_down&&void 0===c.drill_color&&(c.drill_color=["#FFFFFF","#FBF0F3","#F7E3EB","#F3D5E7","#EFC8E8","#EABBEB","#DBAFE7","#CBA3E3","#B297DF","#998CDC"]),c.date=c.date?e(c.date,ba):ba,c}function i(a){function d(a){if(!a.type)throw new Error("need column type.");var b=ca[a.type],c=U.isString(b)?ca[b]:b;return e(a,c)}this.get_cell_define=b(j(this));var f=this,g=this.cfg.date?e(this.cfg.date,ba):ba;return a.forEach(function(a){var b=d(a);b.init_width=b.width,b.bg_color||b.edit!==!1||(b.bg_color=da.readonly);var h=this.get_cell_define()[b.type];if(b.element=h.element,b.getter=b.getter||h.getter,b.init_data=void 0===b.init_data?h.init_data:b.init_data,b.width_adj=h.width_adj,b.focus_in=b.focus_in||h.focus_in,"date"===b.type&&(b.date=b.date?e(b.date,g):g),!b.format_regexp&&b.size&&U.isNumber(b.size))b.format_regexp=new RegExp("(^.{0,"+c(b.size)+"}).*$");else if(b.format){var i=b.format.replace(/^(#+\.)/,"").length;b.format_regexp=new RegExp("(^[^\\.]+(?:\\.\\d{1,"+i+"})?).*$")}return b.format_regexp&&(b.input_slicer=function(a){return function(b){return String(b).replace(a,"$1")}}(b.format_regexp)),b.setter=b.setter||h.setter,b.output_validator=b.output_validator||h.output_validator,b.output_formatter=b.output_formatter||h.output_formatter,b.output_css=b.output_css||h.output_css,b.init_data=b.init_data||h.init_data,b.setter=function(a,b){var c=a.output_css,d=a.output_validator,e=a.output_formatter,f=a.init_data,g=a.setter,h=e?function(a,b,c,d,f){return g(a,e(b),c,d,f)}:g,i=c?function(a,b,d,e,f){return h(a.css(c(b)),b,d,e,f)}:h,j=d?function(a,b,c,e,g){return i(a,d(b)?b:f,c,e,g)}:i;return j}(b,h),b.getter=b.getter||h.getter,b.input_validator=b.input_validator||h.input_validator,b.input_formatter=b.input_formatter||h.input_formatter,b.input_caster=b.input_caster||h.input_caster,b.data_push=function(){function a(a,b,c){return b?b(a)?g(e(a)):f.data[c.row][c.col]:a}var c=(b.getter,b.input_validator),d=b.input_formatter||function(a){return a},e=b.input_slicer||function(a){return a},g=b.input_caster||function(a){return a},h=b.output_css,i=b.after_input;return function(b,e,f){var g=a(d(f),c,e);return b&&h&&b.css(h(g)),i&&i(b,e,g),g}}(),b},this),a}function j(a){function b(a,b,c){return function(d){b(d,c),a(d)}}var c={},d=function(a,b){return a.val(b)},e=function(a){return a.val()},f=function(a,b){return a.text(b)},g=function(a){return a.text()},h=function(a,b){return a.prop("checked",U.isNumber(b)&&b>0)},i=function(a){return a.prop("checked")?1:0},j=function(b){J(b,a)},k=a.event_handler.change_val.bind(a),l=a.event_handler.focus_in.bind(a),m=a.event_handler.focus_out_number.bind(a),n=a.event_handler.focus_out.bind(a),o=a.event_handler.focus_number.bind(a),p=b(n,k,!1),q=b(o,l,void 0);c.str={element:"input",type:"text",style:da.input,width_adj:-11,getter:e,setter:d,init_data:null,event:{focusin:l,focusout:p,keydown:j,keyup:k}},c.str_label={element:"input",type:"text",style:da.input,width_adj:-11,getter:e,setter:d,init_data:null,event:{keydown:j,keyup:k,focusin:l,focusout:p}},c.number={element:"input",type:"text",style:da.input,width_adj:-11,output_css:function(a){return{color:0>a?"red":"black"}},output_validator:U.isNumber,output_formatter:_,getter:e,setter:d,init_data:null,input_validator:function(a){return/^\s*$/.test(a)||$(a)},input_formatter:function(a){return a.replace(/,/g,"")},input_caster:function(a){return/^\s*$/.test(a)?null:Number(a)},event:{keydown:j,keyup:k,focusin:q,focusout:m}},c.check={element:"input",type:"checkbox",style:da.check,width_adj:0,getter:i,setter:h,init_data:0,input_validator:U.isNumber,event:{change:k}},c.radio={element:"input",type:"radio",style:da.check,width_adj:0,getter:i,setter:h,init_data:0,after_input:function(b,c,d){var e=a.pre_filter_data?a.pre_filter_data:a.data;e.forEach(function(a){a[c.col]=0})},event:{focusin:l,change:k}},c.select={element:"select",style:da.select,width_adj:0,child:"option",scheme:"option",getter:e,setter:d,init_data:null,event:{focusin:l,change:k}},c.date={element:"input",type:"text",style:da.input,width_adj:-11,getter:e,setter:d,init_data:null,event:{focusin:l,focusout:p,keydown:j,change:k,keyup:k},focus_in:function(a,b,c){var d=this.is_editable_cell(c.row,c.col);b.datepicker(d?this.scheme[c.col].date:"destroy")}},c.gen={element:"div",type:"text",style:da.input,width_adj:-11,getter:g,setter:f,init_data:""},c.gen_label={element:"div",type:"text",style:da.input,width_adj:0,getter:g,setter:f,init_data:""},c.img={element:"div",type:"",style:da.img,width_adj:0,rule:function(a){return""},getter:g,setter:function(b,c,d,e){var f=a.scheme[e].rule(c);b.text(null===c?"":c),b.css("background-image",f)},init_data:null},c.free={element:"div",type:"",style:da.input,width_adj:0,init_data:null,event:{focusin:l,focusout:p,keydown:j,change:k,keyup:k}};for(var r in a.custom_cell_define)c[r]=a.custom_cell_define[r],"default"===c[r].event&&(c[r].event={focusin:l,focusout:p,keydown:j,change:k,keyup:k});return c}function k(d,e,f){this.cfg=e;return this.get_id=b(d),this.get_original_cfg=b(a.extend(!0,{},e)),this.get_original_scheme=b(f.map(U.clone)),this.get_gen_col=b(U.findIndex(f,{type:"gen"})),this.get_gen_label_col=b(U.findIndex(f,{type:"gen_label"})),this.get_IE_version=b(g()),this.is_IE=b(g()>0),this.is_IE=b(this.get_IE_version()>0),this.page_index=1,this.cell=[],this.rows=[],this.drill_btn=[],this.gen_label=[],this.drill_cell=[],this.render_data=this.cfg.drill_down?O:N,this.scheme=i.call(this,f),this.header_labels=o.call(this),this.header_cells=this.header_labels.map(function(a){return[]}),this.cfg=h.call(this,e),this.cfg=z.call(this),this.div=A.call(this),this.tbl=B.call(this),u.call(this),w(this,0),this.cfg.sort=U.findIndex(this.scheme,{sort:!0})>=0,this.sorted_column=-1,this.filtered=!1,this.sorted=!1,function(b,d,e){this.proto={},this.proto.cell=t.call(this),this.calc_cell=t.call(this,"input","calc_row"),this.proto.row=[],this.proto.row[0]=s.call(this,b,d,this.cfg.left_width),this.proto.row[1]=s.call(this,d,e,this.cfg.right_width),this.proto.scroll_v=s.call(this,b,1,1).css("visibility","hidden").empty();var f=this,g=function(b){try{C(b,f)}catch(d){}var e=a(this),g=c(e.attr("row"));f.row_selected=f.current_top_line+g,f.highlight_row>=0&&f.paint_one_row(f.highlight_row,f.before_highlight_color),f.highlight_row=g,f.render_data(f,f.current_top_line)};this.proto.row.forEach(function(a){a.mousedown(g)})}.bind(this)(0,this.cfg.fixed_header,this.scheme.length),this.current_top_line=0,this.highlight_row=-1,this.row_selected=-1,this.col_selected=!1,this.highlight_refresh=!0,this.before_highlight_color="",this.buttons=x(this),this.resize_btn={},this.scroll_mode=!1,this.scroll_v_inner=a("<div>",{id:d+"_scroll_v_inner"}).width(1).height(0).css("visibility","hidden"),this}function l(b,c,d){function e(b,c,d,e,f,g){function h(a,b,c){var d=c.scheme[b].element,e=b<c.cfg.fixed_header?0:1,f=d+"[col="+b+"]",g=c.get_id()+"_cell_"+a+"_"+b;c.cell[a][b]=c.rows[a][e].find(f).attr({id:g,row:a})}function i(b,c,d){if("gen_label"===d.scheme[c].type){d.drill_cell[b]=d.cell[b][c],d.drill_btn[b]=d.buttons.drill_btn_minus.clone(!0,!0);var e=a("<span>");d.cell[b][c].empty().append(d.drill_btn[b],e),d.cell[b][c]=e}}function j(a,b,c){c.rows[a][b].get(0).setAttribute("id",c.get_id()+"_row_"+b+"_"+a),c.rows[a][b].get(0).setAttribute("row",a),c.div[2][b].append(c.rows[a][b])}var k=g.scheme.length;U.range(b,c).forEach(function(a){g.rows[a]=[e[0].clone(!0,!0),e[1].clone(!0,!0)],g.cell[a]=[];for(var b=0;k>b;++b)h(a,b,g);if(g.get_gen_col()>=0)for(var c=0;d>c;++c)i(a,c,g);j(a,0,g),j(a,1,g)}),g.scroll_v_inner.height(c*g.cfg.row_height)}var f=[b.proto.row[0].clone(!0,!0),b.proto.row[1].clone(!0,!0)],g=b.scheme.map(function(a,c){var d=c<b.cfg.fixed_header?0:1;return f[d].find(a.element+"[col="+c+"]")});return e(0,b.cfg.rows_show,b.scheme.length,f,g,b),b.div.row_label.append(b.div.under_line_left),b.div.data_table.append(b.div.under_line_right),P(b,b.data.length),b}function m(b,c,d){function e(){this.blur()}var f=U.range(c,d);return this.header_labels.forEach(function(c,d){f.forEach(function(f){var g=this.scheme[f],h=a("<div>",{row:d,col:f,col_merge:1,row_merge:1,"class":da.cell}).height(this.cfg.row_height).width(g.width).css({left:g.left,top:d*this.cfg.row_height}).appendTo(this.div[0][b]);n.call(this,d,f,g,c[f]).attr("align",g.h_align).focus(e).appendTo(h)}.bind(this))}.bind(this)),this}function n(b,c,d,e){var f=this.get_cell_define().str_label,g={row:b,col:c,type:/^\&(checkbox|radio)$/.test(e)?e.slice(1):f.type,name:d.name,readonly:!0,"class":da.label},h=a("<"+f.element+">",g).val(e).css("text-align",d.h_align).height(da.row_height-1);return h}function o(){var a=this,b=this.scheme.map(function(a){return a.label.split("||")}),c=U.range(U.max(b.map(function(a){return a.length}))),d=c.map(function(a){return[]});return c.forEach(function(c){a.scheme.forEach(function(a,e){d[c][e]=b[e][c]})}),d}function p(){var a=this.header_labels,b=this.scheme.length,d=this.header_labels.length;return U.range(b).forEach(function(b){for(var e=d-1;e>0;--e)if(void 0===a[e][b]){var f=this.get_header_cell(e-1,b),g=this.get_header_cell(e,b),h=f.height(),i=g.height();if(f.width()===g.width()){var j=c(g.attr("row_merge")),k=c(f.attr("row_merge"));g.remove(),f.height(h+i),f.attr("row_merge",j+k)}}}.bind(this)),this}function q(){function a(a,e){d.forEach(function(d){for(var f=e-1;f>a;--f){var g=!/radio|check/i.test(this.scheme[f].type);if(g&&b[d][f-1]===b[d][f]){var h=this.get_header_cell(d,f-1),i=this.get_header_cell(d,f);if(h.height()===i.height()){var j=c(i.attr("col_merge")),k=c(h.attr("col_merge"));i.attr("removed",!0).remove(),h.width(h.width()+i.width()),h.attr("col_merge",j+k)}}}}.bind(this))}var b=this.header_labels,d=U.range(this.header_labels.length),e=this.cfg.fixed_header;return a.call(this,0,e),a.call(this,e,this.scheme.length),this}function r(b){function c(){var c=a(this),d=c.find("input"),e=(c.height()-b.cfg.row_height)/2;d.css("top",e),/checkbox|radio/.test(d.attr("type"))&&d.height(b.cfg.checkbox_size).width("100%")}var d="."+da.cell;return b.div[0][0].find(d).each(c),b.div[0][1].find(d).each(c),b}function s(b,c,d){var e=a("<div>").addClass(da.row).height(this.cfg.row_height);return U.range(b,c).forEach(function(a){return this.proto.cell[a].clone(!0,!0).appendTo(e)}.bind(this)),e}function t(a,b){var c=this.cfg.row_height,d=this.scheme.map(function(d,e){var f="select"===d.type?0:1,g=v.call(this,d,a,e,c-f,b).addClass(this.get_id()+"_col_"+e);return g}.bind(this));return d}function u(){for(var a=this.scheme.length,b=0,c=0;a>b;++b)b===this.cfg.fixed_header&&(c=0),this.scheme[b].left=c,c+=this.scheme[b].width;return this}function v(b,c,d,e,f){var g=this.get_cell_define()[b.type],h="select"===g.element,i="calc_row"===f,j=/check|radio/.test(b.type),k={id:this.get_id()+"_proto_col_"+d,name:b.name,col:d,"class":i&&j?da.idiv:g.style,type:i?"text":g.type};U.isNumber(b.size)&&(k.maxlength=b.size);var l=a("<"+(c||g.element)+">",k);if(!c&&h&&g.child&&b[g.scheme].forEach(function(b){return a("<"+g.child+">",b).appendTo(l)}),!c&&g.event&&U.map(g.event,function(a,b){return l[b](a)}),!i&&j){l.height(this.cfg.checkbox_size).width("100%");var m=a("<div>",{"class":da.idiv}).append(l);return m.css("padding-top",(this.cfg.row_height-this.cfg.checkbox_size)/2),m}return l.height(e),l}function w(a,b){return U.range(b,a.scheme.length).forEach(function(b){var c=a.scheme[b],d=a.get_cell_define()[c.type],e=c.width+d.width_adj,g=a.get_id()+"_col_"+b,h=0>=e,i={"text-align":c.align,left:c.left+"px",width:h?"0px":e+"px",display:h?"none":"inline","background-color":c.bg_color?c.bg_color:"transparent"},j="."+g+" {",k=U.reduce(i,function(a,b,c){return a+c+":"+b+";"},""),l="}";f(a,g,j+k+l)}),this}function x(b){function d(d){var e=b.get_gen_col(),g=c(a(this).attr("row")),h=b.data[g],i=h[e],j={};if(j[i]=h,h.children){f();var k=h.children.map(function(a){return a.hide=!1,a}),l=b.data.slice(0,g+1),m=b.data.slice(g+1);b.data=l.concat(k,m),h.children=void 0}else{for(var n=g+1;n<b.data.length;n++){var o=b.data[n],p=o[e];if(i>=p)break;j[p]=o,j[p-1]&&(j[p-1].children||(j[p-1].children=[]),o.hide=!0,j[p-1].children.push(o))}for(var q=[],n=0;n<b.data.length;n++){var o=b.data[n];o.hide||q.push(o)}b.data=q}if(b.data.length<b.rows.length){var r=b.rows.length-b.data.length,s=b.create_init_data(r).map(function(a){return a.empty=!0,a});b.data=b.data.concat(s)}b.data.forEach(function(a,b){a.index=b}),P(b,b.data.length),b.refresh(),d.preventDefault()}function e(d){function e(a){for(var b=a,c=0;c<b.length;c++){var d=b[c];if(d.children){var e=b.slice(0,c+1),f=d.children,g=b.slice(c+1);d.children=void 0,b=e.concat(f,g)}}return b.map(function(a){return a.hide=void 0,a})}var g=c(a(this).attr("row")),h=b.data[g];if(U.isArray(h.children)){var i=b.data.slice(0,g+1),j=h.children,k=b.data.slice(g+1);h.children=void 0,b.data=i.concat(e(j),k),f(),b.refresh(),P(b,b.data.length,!0,!0),d.preventDefault()}}function f(){for(var a=b.data.length-1;a>=0&&b.data[a].empty;--a)b.data.pop()}return{drill_btn_minus:a("<button>").text("-").click(d).dblclick(e).addClass(da.drill_btn)}}function y(){return this.div[0][1].width(this.cfg.right_width).height(this.header_labels.length*this.cfg.row_height),this.div[0][0].width(this.cfg.left_width).height(this.header_labels.length*this.cfg.row_height),this}function z(){function a(a,b){return a+b}var b=this.cfg,c=this.scheme,d=0,e=b.fixed_header,f=c.length,g=b.border_size=0,h=U.isNumber(b.cols_show)&&b.cols_show>0,i=U.isNumber(b.rows_show)&&b.rows_show>0,j=U.chain(c).slice(e,e+b.cols_show).pluck("width").reduce(a,0);return b.header_height=this.header_labels.length*b.row_height+1,b.left_width=U.chain(c).slice(d,e).pluck("width").reduce(a,0),b.right_width=U.chain(c).slice(e,f).pluck("width").reduce(a,0),b.right_width_show=h?j+g*b.cols_show:b.width-b.left_width,i&&(b.height=b.row_height*b.rows_show),b.scroll_v_height=b.height,"top"===b.calc_row&&(b.height+=b.row_height),b.wheel_move=b.row_height*b.wheel_move_row,b.scroll_bar_width=this.get_scroll_bar_width(),b}function A(){function b(b,c){return a("<div>",{id:b.get_id()+c,"class":c})}for(var c={0:[],1:[],2:[],3:[],4:[],main:a("#"+this.get_id()).addClass(da.main_div)},d=[["top_corner","col_label","top_empty"],["calc_left","calc_right","calc_empty"],["row_label","data_table","scroll_v"],["bot_empty","scroll_h","bot_corner"],["bot_paging"]],e=0;4>e;e++)for(var f=0;3>f;f++){var g="_fg_div_"+e+f,h=d[e][f];c[e][f]=c[h]=b(this,g)}c[4][0]=c.bot_paging=b(this,"_fg_div_40");var i=this.cfg.header_height+this.cfg.height,j="bottom"===this.cfg.calc_row?this.cfg.row_height:0,k=i+j;return c.left=b(this,"_fg_div_left").height(k),c.right=b(this,"_fg_div_right").height(k),c.bot_left=b(this,"_fg_div_bot_left").append(c.bot_empty),c.bot_right=b(this,"_fg_div_bot_right").appendTo(c.scroll_h),"bottom"===this.cfg.calc_row?(c.left.append(c[0][0],c[2][0],c[1][0]),c.right.append(c[0][1],c[2][1],c[1][1])):(c.left.append(c[0][0],c[1][0],c[2][0]),c.right.append(c[0][1],c[1][1],c[2][1]),c.bot_right.css("border-bottom","0px"),c[3][0].css("border-bottom","0px")),c.cover=b(this,"_fg_div_cover").appendTo(c.main),c.under_line_left=a("<div>",{style:"border-top:"+da.row_bot_line}),c.under_line_right=a("<div>",{style:"border-top:"+da.row_bot_line}),c}function B(){function b(b,c,d,e){function f(){return a("<tr>")}function g(){return a("<td>",{height:b.cfg.row_height,valign:"top"})}var h=U.range(d),i=a("<table>",e);return U.range(c).forEach(function(){var a=f().appendTo(i);h.forEach(function(){return g().appendTo(a)})}),i}var c={id:this.get_id()+"_fg_main_table","class":"_fg_main_table",border:0,cellspacing:0,cellpadding:0},d={main:b(this,3,3,c).appendTo(this.div.main)},e=d.main.find("tr:eq(1) td"),f=d.main.find("tr").eq(2).empty();return d.main.find("tr:eq(0) td:eq(0)").append(this.div.left),d.main.find("tr:eq(0) td:eq(1)").append(this.div.right),d.main.find("tr:eq(0) td:eq(2)").append(this.div.scroll_v).attr({valign:"bottom"}).css({"padding-bottom":"bottom"===this.cfg.calc_row?this.cfg.row_height+1:0}),["bot_empty","scroll_h","bot_corner"].forEach(function(a,b){e.eq(b).append(this.div[a])}.bind(this)),this.cfg.paging?a("<td>",{colspan:3}).append(this.div[4][0].attr({align:"center"})).appendTo(f):f.css("background-color","red").remove(),d}function C(a,b){if(b.event_flag.click){var c=b.get_loc(a.target);b.click_event.forEach(function(d){d(a,c.row,c.col,b.data[c.row][c.col],b)})}return b}function D(a,b,c,d){if(b.event_flag.change){var e=b.get_loc(a.target);b.change_event.forEach(function(d){d(a,e.row,e.col,b.data[e.row][e.col],c,b)})}return b}function E(a,b){if(b.event_flag.focusin){var c=b.get_loc(a.target);b.focusin_event.forEach(function(d){d(a,c.row,c.col,b.data[c.row][c.col],b)})}return b}function F(a,b){if(b.event_flag.focusout){var c=b.get_loc(a.target);b.focusout_event.forEach(function(d){d(a,c.row,c.col,b.data[c.row][c.col],b)})}return this}function G(b){function d(d){var e=a(this),f=c(e.attr("col")),g=f<b.cfg.fixed_header?b.div.row_label:b.div.data_table,h=e.attr("name"),i=e.prop("checked")?1:0;g.find("input[name="+h+"]").prop("checked",e.prop("checked")),b.data.forEach(function(a,b){a[f]=i}),b.render_data(b,b.current_top_line)}function e(d){var e=c(a(this).attr("col"));b.data.forEach(function(a){a[e]=0}),b.render_data(b,b.current_top_line)}return[0,1].forEach(function(a){this[a].find("input[type=checkbox]").click(d),this[a].find("input[type=radio]").click(e)},b.div[0]),b}function H(a){function b(a){return a.originalEvent.wheelDelta>0||a.originalEvent.detail<0}return a.div.main.bind("mousewheel DOMMouseScroll",function(c){a.scroll_row(b(c)?-1:1)}),a}function I(b){function c(a){a.stopPropagation(),a.preventDefault(),a.dataTransfer.dropEffect="copy"}function d(a){for(var b="",c=0,d=10240;c<a.byteLength/d;++c)b+=String.fromCharCode.apply(null,new Uint8Array(a.slice(c*d,c*d+d)));return b+=String.fromCharCode.apply(null,new Uint8Array(a.slice(c*d)))}function e(b,c){if(null==b||null==b["!ref"])return[];var d,e=U.some(c,function(a){return"date"===a.type});d=e?function(b,c){return"date"===c.type&&"number"==typeof b?a.datepicker.formatDate(c.date.dateFormat,new Date(864e5*(b-25569))):b}:function(a){return a};var g,h,i,j,k=f(b["!ref"]),l=k.s.c,m=k.e.c,n=U.range(l,m+1),o=n.map(function(a){return XLSX.utils.encode_col(a)}),p=U.range(k.s.r,k.e.r+1).map(function(a){var e=[],f=XLSX.utils.encode_row(a);for(g=l;m>=g;++g)i=b[o[g]+f],h=void 0!==i?i.v:null,j=g-l,h=d(h,c[j]),j<c.length&&e.push(h);return e});return p}function f(a){var b={s:{c:0,r:0},e:{c:0,r:0}},c=0,d=0,e=0,f=a.length;for(c=0;f>d&&!((e=a.charCodeAt(d)-64)<1||e>26);++d)c=26*c+e;for(b.s.c=--c,c=0;f>d&&!((e=a.charCodeAt(d)-48)<0||e>9);++d)c=10*c+e;if(b.s.r=--c,d===f||58===a.charCodeAt(++d))return b.e.c=b.s.c,b.e.r=b.s.r,b;for(c=0;d!=f&&!((e=a.charCodeAt(d)-64)<1||e>26);++d)c=26*c+e;for(b.e.c=--c,c=0;d!=f&&!((e=a.charCodeAt(d)-48)<0||e>9);++d)c=10*c+e;return b.e.r=--c,b}function g(a){a.stopPropagation(),a.preventDefault();var c=a.dataTransfer.files,f=c[0],g=new FileReader;f.name;g.onload=function(a){var c=a.target.result,f=XLSX.read(btoa(d(c)),{type:"base64"}),g=f.Sheets[f.SheetNames[0]],h=e(g,b.scheme);b.clear(),b.Load_data(h)},g.readAsArrayBuffer(f)}if(void 0!==window.XLSX&&void 0!==window.jszip){var h=b.div.main.get(0);return h.addEventListener&&(h.addEventListener("dragenter",c,!1),h.addEventListener("dragover",c,!1),h.addEventListener("drop",g,!1)),b}}function J(a,b){if(b.move_delay)return!1;b.move_delay=!0,setTimeout(function(){b.move_delay=!1},b.scroll_delay_ms),13===a.keyCode&&a.preventDefault();var c={13:1,33:-b.cfg.rows_show,34:b.cfg.rows_show,38:-1,40:1};if(!c.hasOwnProperty(a.keyCode))return!1;var d=b.get_loc(a.target),e=d.row,f=c[a.keyCode],g=e-b.current_top_line,h={"-1":0===g,1:g>=b.rows.length-1};if(h.hasOwnProperty(f))if(h[f])b.row_selected=e+f,b.row_selected<0&&(b.row_selected=0),b.scroll_row(f);else{var i=b.cell[g+f];i&&i[d.col].mousedown().focus()}else{var j=b.div.scroll_v.scrollTop();b.row_selected=e+f,b.div.scroll_v.scrollTop(j+b.cfg.row_height*f),b.scroll_row(f)}return!0}function K(b){function d(a){return window.clipboardData?window.clipboardData.getData("text"):(a.originalEvent||a).clipboardData.getData("text/plain")}function e(e){function g(a,b){return a.split("	").map(function(a,c){return{row:i+b,col:j+c,txt:a}})}e.preventDefault();var h=a(e.target),i=c(h.attr("row")),j=c(h.attr("col"));h.val(null),d(e).split(/\r\n|\r|\n/).map(g).every(function(a,c){return b.data[i+c]?(a.forEach(f),!0):!1}),b.refresh()}function f(a){return b.scheme[a.col]&&b.is_editable_cell(a.row,a.col)?void(b.data[a.row][a.col]=b.scheme[a.col].data_push(void 0,a,a.txt)):!0}for(var g=(function(){var a=/^\s*$/;return function(b){return a.test(b)}}(),0);2>g;++g)b.div[2][g].bind("paste",e);return b}function L(a,b){return U.isFunction(b)?(a.push(b),!0):!1}function M(){function b(a,b){e.col_resize(0,e.scheme[0].width)}function d(b,d){var f=c(a(this).attr("col"));e.col_resize(f,d.size.width),e.get_gen_col()>=0&&e.refresh()}var e=this,f={position:"absolute",right:0,"z-index":0};return this.scheme.forEach(function(a,c){if(!a.resize)return!0;var e=a.resize,g=c<this.cfg.fixed_header?this.div.top_corner:this.div.col_label,h=g.find("div[col="+c+"]").last(),i={maxHeight:h.height(),minHeight:h.height(),maxWidth:e.max||void 0,minWidth:e.min||20,handles:"se",stop:b,resize:d};f.top=h.height()-this.cfg.resize_icon_size,h.resizable&&h.resizable(i),h.css("position","absolute"),this.resize_btn[c]=h.find(".ui-resizable-handle").attr("title",ea.header_resize).css(f)}.bind(this)),this}function N(a,b){var c,d,e=a.scheme.length,f=a.cfg.rows_show;for(c=0;f>c;++c){var g=b+c,h=a.data[g];if(h)for(void 0===h.bg_color&&(h.bg_color="transparent"),a.paint_one_row(c,h.bg_color),d=0;e>d;++d)a.cell[c][d].attr("row",g),a.Set_cell_value(c,d,h[d])}return a.show_highlight_bar(),a}function O(a,b){var c,d,e=a.scheme.length,f=a.cfg.rows_show;for(c=0;f>c;++c){var g=b+c,h=a.data[g];if(h){for(d=0;e>d;++d)a.cell[c][d].attr("row",g),a.Set_cell_value(c,d,h[d]);var i=a.get_gen_col(),j=a.get_gen_label_col(),k=h[i],l=g+1<a.data.length?a.data[g+1]:void 0,m=l?l[i]:-1,n=a.drill_btn[c],o=da.drill_indent*k;n.attr({row:g,gen:k}),a.drill_cell[c].css("padding-left",o),a.drill_cell[c].width(a.scheme[j].width-o-da.input_padding),h.children?(n.show(),n.text("+")):m>k?(n.show(),n.text("-")):n.hide(),void 0===h.bg_color&&(h.bg_color="transparent"),a.paint_one_row(c,h.bg_color)}else for(a.drill_btn[c].hide(),a.data[g]=a.create_init_data(1)[0],a.data[g].empty=!0,d=0;e>d;++d)a.cell[c][d].attr("row",g),a.Set_cell_value(c,d,a.data[g][d])}return a.show_highlight_bar(),a}function P(a,b){var c=a.data.length>a.cfg.rows_show?"scroll":"hidden",d=function(){return"visible"===b?a.div.data_table.find("."+da.row+":visible").length:U.isNumber(b)?b:void 0}(),e=d*a.cfg.row_height;return a.scroll_v_inner.height(e),a.div.scroll_v.css("overflow-y",c),a}function Q(){return this.cfg.calc_row?(this.scheme.forEach(function(a,b){var c=b<this.cfg.fixed_header?"calc_left":"calc_right",d={readonly:!0,id:this.get_id()+"_calc_cell_"+b,disabled:a.type.match(/check|radio/)};this.calc_cell[b].attr(d).css("border-left","1px solid transparent").appendTo(this.div[c]),d.disabled&&this.calc_cell[b].find("input").attr("disabled",!0)}.bind(this)),this):this}function R(b,d){return d.each(function(){for(var d=a(this),e=c(d.attr("col")),f=c(d.attr("col_merge")),g=0,h=0;f>h;h++)g+=b.scheme[e+h].width;d.css("left",b.scheme[e].left),d.width(g)}),b}function S(){function b(a){return!c.cfg.use_filter_div||c.div.filter.is(":visible")?c.div.filter.hide():void c.div.filter.slideDown()}var c=this;return this.div.filter=X.call(this),this.scheme.forEach(function(c,d){var e=d<this.cfg.fixed_header?this.div.top_corner:this.div.col_label,f=e.find("div[col="+d+"]"),g={"class":da.filter_btn,col:d};/&checkbox|&radio/.test(c.label)||f.css("cursor","pointer").click(b),c.filter_icon=a("<div>",g).appendTo(f.last())}.bind(this)),this}function T(b,c){var d=a("<select>",c);return b.scheme.forEach(function(b,c){if(b.width>2){var e=b.label.replace(/\&checkbox|&radio/g,"").replace(/\|\|/g,",").replace(/^,|,$/g,"");a("<option>",{text:e,value:c,type:b.type}).appendTo(d)}}),d}function V(b){function c(){var b=a(this);b.prop("checked")&&(b.closest("div").find("input[type=checkbox]").prop("checked",!1),b.prop("checked",!0))}function d(){var b=a(this),c=b.closest("div");if("plus"===b.attr("func")){var d=c.clone(!0,!0);d.find("button").css("visibility",""),d.insertAfter(c)}else c.remove()}var e={sort_area:{"class":da.filter_sort_div,style:"padding-left: 78px;"},sort_title:{"class":da.filter_sort_title},sort_div:{},s_select:{"class":da.filter_check,type:"sort",func:"column",name:b.get_id()+"_filter_sort_column"},sort_asc:{"class":da.filter_check,type:"checkbox",order:"sort_asc"},check_asc:{"class":da.filter_check,type:"checkbox",order:"sort_asc"},check_desc:{"class":da.filter_check,type:"checkbox",order:"sort_dessc"},plus_btn:{"class":da.filter_plus_btn,func:"plus"},minus_btn:{"class":da.filter_minus_btn,func:"minus"}},f=a("<div>",e.sort_area),g=a("<label>",e.sort_title),h=a("<div>",e.sort_div),i=T(b,e.s_select),j=a("<label>",e.sort_asc),k=a("<input>",e.check_asc).change(c),l=ea.sort_asc,m=a("<label>",e.check_desc),n=a("<input>",e.check_desc).change(c),o=ea.sort_desc,p=a("<button>",e.plus_btn).click(d),q=a("<button>",e.minus_btn).click(d).css("visibility","hidden");return f.append(g,h),h.append(i,j,m,p,q),j.append(k,l),m.append(n,o),b.cfg.use_sort_panel||f.hide(),f}function W(b){function c(){var b=a(this),c=b.closest("div");"plus"===b.attr("func")?c.clone(!0,!0).insertAfter(c).css("border-top","1px solid transparent").find("button, select").css("visibility",""):c.remove()}function d(){var b=a(this),c="AND"===b.val()?"1px solid transparent":"1px solid red";b.closest("div").css("border-top",c)}function e(){var c=a(this),d=c.closest("div").find("select[func=condition]"),e=function(){var a=b.scheme[c.val()].type;return a.match(/check|radio/)?"check":"number"===a?"number":"str"}();b.is_IE()?(d.find("option").attr("disabled",!0),d.find("option[d_type*="+e+"]").attr("disabled",!1)):(d.find("option").hide(),d.find("option[d_type*="+e+"]").show())}var f=b.get_id(),g=a("<div>",{"class":da.filter_sort_div}),h=a("<label>",{"class":da.filter_filter_title}),i=a("<div>",{"class":da.filter_cond}),j=a("<select>",{func:"operator",name:f+"_filter_cond_operator"}).change(d),k=a("<option>",{text:"AND",value:"AND"}),l=a("<option>",{text:"OR",value:"OR"}),m=T(b,{func:"column",type:"cond",name:f+"_filter_cond_column"}).change(e),n=a("<select>",{func:"condition",name:f+"_filter_cond_condition"}),o=a("<input>",{func:"value",name:f+"_filter_cond_value"}),p=a("<button>",{"class":da.filter_plus_btn,func:"plus"}).click(c),q=a("<button>",{"class":da.filter_minus_btn,func:"minus"}).click(c);return n.append([{html:ea.filter_none,value:"none",d_type:"number,str,check"},{html:ea.filter_eq,value:"equal",d_type:"number,str"},{html:ea.filter_ne,value:"not_equal",d_type:"number,str"},{html:ea.filter_lt,value:"less_than",d_type:"number"},{html:ea.filter_gt,value:"greater_than",d_type:"number"},{html:ea.filter_le,value:"less_equal",d_type:"number"},{html:ea.filter_ge,value:"greater_equal",d_type:"number"},{html:ea.filter_begin,value:"begins_with",d_type:"number,str"},{html:ea.filter_end,value:"ends_with",d_type:"number,str"},{html:ea.filter_cont,value:"contains",d_type:"number,str"},{html:ea.filter_ncont,value:"not_contain",d_type:"number,str"}].map(function(b){return a("<option>",b)})),g.append(h,i),i.append(j,m,n,o,p,q),j.append(k,l),i.find("select").change(),g.find("select[func=operator]").eq(0).val("OR").css("visibility","hidden"),g.find("button[func=minus]").eq(0).css("visibility","hidden"),b.cfg.use_filter_panel||g.hide(),g}function X(){var b=this,c={div:{id:this.get_id()+"_filter_div","class":da.filter_div},run:{text:ea.filter_run,"class":da.filter_inner_btn},clear:{text:ea.filter_clear,"class":da.filter_inner_btn},close:{text:ea.filter_close,"class":da.filter_inner_btn}},d=a("<div>",c.div),e=V(this),f=W(this),g=a("<button>",c.run).click(function(){return b.run_filter(b)}),h=a("<button>",c.clear).click(function(){return b.clear_filter_condition(b)}),i=a("<button>",c.close).click(function(){return d.hide()});return this.div.main.append(d),d.append(e,f,g,h,i),d.draggable({containment:"parent"}),d}function Y(){function b(b){var c=a("<table>");for(var d in b){var e=a("<tr>").appendTo(c);for(var f in b[d])a("<td>").appendTo(e).append(b[d][f])}return c}var d=this,e=this.get_id(),f=a("<div>",{"class":da.search_div,align:"right"}),g=T(this,{id:e+"_search_column_range"});this.div.search=f.appendTo(this.div.main).draggable({containment:"parent"}),g.find("option[type=radio], option[type=check]").remove(),g.prepend(a("<option>",{html:"전체",value:"all"}));var h={column:{title:a("<label>",{html:ea.target}),obj:g},search:{title:a("<label>",{html:ea.do_search}),obj:a("<input>")},replace:{title:a("<label>",{html:"replace"}),obj:a("<input>")}},i={direction:{f_obj:a("<input>",{type:"radio",name:e+"_search_dir",id:e+"_search_f_dir",checked:!0}),f_title:a("<label>",{html:ea.forward,"for":e+"_search_f_dir"}),b_obj:a("<input>",{type:"radio",name:e+"_search_dir",id:e+"_search_b_dir"}),b_title:a("<label>",{html:ea.reward,"for":e+"_search_b_dir"})}},j={case_ignore:{obj:a("<input>",{type:"checkbox",id:e+"_search_case_ignore"}),title:a("<label>",{html:ea.ig_case,"for":e+"_search_case_ignore"})},whole_word:{obj:a("<input>",{type:"checkbox",id:e+"_search_whole_word"}),title:a("<label>",{html:ea.whole_word,"for":e+"_search_whole_word"})},wild_card:{obj:a("<input>",{type:"checkbox",id:e+"_search_wild_card"}),title:a("<label>",{html:ea.wild_card,"for":e+"_search_wild_card"})},reg_exp:{obj:a("<input>",{type:"checkbox",id:e+"_search_regular_expression"}),title:a("<label>",{html:ea.reg_exp,"for":e+"_search_regular_expression"})}},k=a("<fieldset>",{align:"left"}),l=a("<fieldset>",{align:"left"}),m=a("<fieldset>",{align:"left"}),n=a("<legend>",{html:ea.search}),o=a("<legend>",{html:ea.direction}),p=a("<legend>",{html:ea.option}),q=a("<button>",{html:ea.find_btn}),r=a("<button>",{html:ea.replace_btn}),s=a("<button>",{html:ea.close_btn});return f.append([k,l,m,q,r,s]),k.append([n,b(h)]),l.append([o,b(i)]),m.append([p,b(j)]),[h.replace.obj,h.replace.title,r].forEach(function(a){a[this.cfg.search_replace?"show":"hide"]()}.bind(this)),[j.reg_exp.obj,j.reg_exp.title].forEach(function(a){a[this.cfg.search_by_reg_exp?"show":"hide"]()}.bind(this)),g.keydown(function(a){9===a.keyCode&&a.shiftKey&&(s.focus(),a.preventDefault())}),h.search.obj.keydown(function(a){13===a.keyCode&&q.click()}),j.reg_exp.obj.click(function(b){var c=j,d=a(this).prop("checked"),e=function(a,b){return a.attr("disabled",b).css("opacity",b?.3:1)};[].concat(U.values(c.whole_word),U.values(c.wild_card)).forEach(function(a){e(a,d)})}),s.click(function(a){f.hide()}).keydown(function(a){9!==a.keyCode||a.shiftKey||(g.focus(),a.preventDefault())}),q.click(function(a){var b=i.direction.f_obj.prop("checked")?1:-1,e=j.whole_word.obj.prop("checked"),f=j.case_ignore.obj.prop("checked"),k=j.wild_card.obj.prop("checked"),l=j.reg_exp.obj.prop("checked"),m=h.search.obj.val(),n=g.val(),o="all"===n?0:c(n),p="all"===n?d.scheme.length:c(n)+1,q=d.create_search_reg_exp(m,l,e,f,k),r=d.row_selected+b,s=[],t=[];d.scheme.forEach(function(a,b){
	if(t[b]=/$^/,"select"===a.type){a:for(var c=0;c<a.option.length;++c)if(q.test(a.option[c].text)){s[b]=a.option[c].value,t[b]=this.create_search_reg_exp(s[b],!1,!0,!1,!1);break a}}else"number"===a.type?(s[b]=m,t[b]=this.create_search_reg_exp(s[b],l,e,f,k)):a.type.match(/check|radio/)?(s[b]="not",t[b]=/$^/):(s[b]=m,t[b]=this.create_search_reg_exp(s[b],l,e,f,k))},d);var u,v=!1,w=function(){u&&(u.closest("."+da.row).mousedown(),u.click().focus())};a:for(var x=r,y=0;y<d.data.length;x+=b,++y){x>=d.data.length?x-=d.data.length:0>x&&(x=d.data.length-1);for(var z=o;p>z;++z){var A=d.data[x][z];if(t[z].test(A)){d.scroll_row(2*-d.data.length).scroll_row(x),v=!0,u=d.cell[x-d.current_top_line][z],setTimeout(w,100);break a}}}v||alert(ea.search_fail)}),this}function Z(){var b=this,c={"class":da.modal_div,align:"center"},d=a("<div>",c).appendTo(this.div.main),e=a("<div>",{html:"",role:"title","class":da.modal_content}),f=a("<div>",{html:"",role:"body","class":da.modal_content}),g=a("<div>",{role:"control",align:"center","class":da.modal_content}),h=a("<button>",{text:ea.confirm});return this.div.modal=d,d.position({my:"center",at:"center",of:this.div.main}),d.append([e,f,g]),g.append(h),h.css({position:"relative",right:0}).click(function(){d.hide(),b.disable(!1)}),e.hide(),g.hide(),this}var $=function(){var a=/^\s*-?\d+(?:\.\d+)?\s*$/;return function(b){return a.test(b)}}(),_=function(){var a=/\B(?=(\d{3})+(?!\d))/g;return function(b){if(null==b)return b;var c=b.toString(),d=c.indexOf(".");if(d>=0){var e=c.slice(d),f=c.slice(0,d);return f.replace(a,",")+e}return c.replace(a,",")}}();QUnit.test("_to_comma_format",function(a){var b=_(123456789.1234567);a.ok("123,456,789.1234567"===b,"Passed!");var c=_(void 0);a.ok(U.isUndefined(c),"Passed!")}),k.prototype.set_interceptor=function(a,b,c){return function(){var d=[].slice.call(arguments);return b.apply(c,d),a.apply(c,d)}},k.prototype.get_scroll_bar_width=function(){var b=a("<div>",{html:"scroll test",style:"width:100%;height:200px;"}),c=a("<div>",{style:"width:200px;height:150px;position:absolute;top:0;left:0;visibility:hidden;overflow:hidden;"}).append(b);a("body").append(c);var d=b[0].offsetWidth;c.css("overflow","scroll");var e=c[0].clientWidth;return c.remove(),d-e};var aa={wheel_move_row:1,drill_down:!1,rows_show:20,row_height:25,checkbox_size:20,resize_icon_size:16,scroll_delay_ms:10,flexible_right_width:!0,use_filter_div:!1,use_filter_panel:!1,use_sort_panel:!1,search_by_reg_exp:!1,search_replace:!1},ba={dateFormat:"yy-mm-dd",changeYear:!0,changeMonth:!0,weekHeader:"Wk",yearRange:"c-20:c+20",dayNamesMin:["일","월","화","수","목","금","토"],monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],monthNamesShort:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],constrainInput:!0,showMonthAfterYear:!0},ca={str:{name:"",label:"",width:100,h_align:"center",align:"left",valign:"middle",edit:!0,size:2e3},number:{name:"",label:"",width:100,h_align:"center",align:"right",valign:"middle",edit:!0,format:"#.############"},check:{name:"",label:"",width:30,h_align:"center",align:"center",valign:"middle",edit:!0},select:{name:"",label:"",width:100,h_align:"center",align:"center",valign:"middle",edit:!0,option:[]},gen:"check",gen_label:"check",radio:"check",date:"str"},da={main_div:"_fg_main_div",row:"_fg_row",cell:"_fg_cell",label:"_fg_label_text",input:"_fg_input_text",check:"_fg_input_check",select:"_fg_input_select",img:"_fg_input_img",calc:"_fg_calc",idiv:"_fg_input_div",scroll_h:"_fg_scroll_h",scroll_v:"_fg_scroll_v",readonly:"#F5EAB9",row_color_odd:"#FFFFFF",row_color_even:"#E8EEF5",row_selected:"#E8EEF5",row_bot_line:"1px solid #B6B6B6",input_padding:5,paging_button:"_fg_paging_button",paging_button_selected:"_fg_paging_button_selected",sort_btn:"_fg_sort_btn",search_div:"_fg_div_search",filter_btn:"_fg_filter_icon",filter_btn_red:"_fg_filter_icon_red",filter_div:"_fg_div_filter",filter_cond:"_fg_filter_cond",filter_inner_btn:"_fg_filter_inner_btn",filter_sort_div:"_fg_filter_sort_div",filter_search_div:"_fg_filter_search_div",filter_sort_title:"_fg_filter_sort_title",filter_search_title:"_fg_filter_search_title",filter_filter_title:"_fg_filter_filter_title",filter_check:"_fg_filter_checkbox",filter_input:"_fg_filter_input",filter_plus_btn:"_fg_filter_plus_btn",filter_minus_btn:"_fg_filter_minus_btn",drill_btn:"_fg_drill_btn",drill_indent:13,drill_btn_width:20,sort_btn_width:15,modal_div:"_fg_div_modal",modal_content:"_fg_modal_content"},ea={header_resize:"마우스로 드래그하여 너비를 조정할 수 있습니다",filter_run:"적용",filter_close:"닫기",filter_clear:"조건 초기화",sort_asc:"오름차순으로 정렬",sort_desc:"내림차순으로 정렬",reg_exp:"Regular Expression",ig_case:"대소문자 무시",find_btn:"찾기",replace_btn:"바꾸기",close_btn:"닫기",whole_word:"일치하는 단어만 찾기",wild_card:"와일드카드(?, *) 사용",search_fail:"검색 결과가 없습니다.",search:"검색",direction:"방향",option:"옵션",target:"대상",do_search:"찾기",forward:"정방향",reward:"역방향",confirm:"확인",filter_none:"선택",filter_eq:"= 일치",filter_ne:"&ne; 불일치",filter_lt:"< 작다",filter_gt:"> 크다",filter_le:"≤ 작거나 같다",filter_ge:"≥ 크거나 같다",filter_begin:"^= 시작 문자",filter_end:"$= 끝 문자",filter_cont:"*= 포함 문자",filter_ncont:"*&ne; 제외 문자"};k.prototype.sp_char={g_gamma:"&#915;",g_delta:"&#916;",g_lambda:"&#923;",g_pi:"&#928;",g_sigma:"&#931;",g_phi:"&#934;",g_gamma_l:"&#947;",g_delta_l:"&#948;",g_lambda_l:"&#955;",g_pi_l:"&#960;",g_sigma_l:"&#963;",g_phi_l:"&#966;",m_lt:"&#60;",m_gt:"&#62;",m_not:"&#172;",m_plusmn:"&#177;",m_times:"&#215;",m_divide:"&#247;",m_forall:"&#8704;",m_exist:"&#8707;",m_radic:"&#8730;",m_infin:"&#8734;",m_int:"&#8747;",m_ne:"&#8800;",m_le:"&#8804;",m_ge:"&#8805;",m_less_oeq:"&#8806;",m_grt_oeq:"&#8807;",u_per_mil:"&#8240;",u_euro:"&#8364;",u_celsius:"&#8451;",u_fahrenheit:"&#8457;",u_yuan:"&#20803;",u_cent:"&#65504;",u_pound:"&#65505;",u_yen:"&#65509;",u_won:"&#65510;",c_nbsp:"&#160;"},k.prototype.custom_cell_define={},k.prototype.event_handler={},k.prototype.event_handler.change_val=function(b,c){var d,e,f,g=this.get_loc(b.target),h=this.data[g.row][g.col],i=this.is_editable_cell(g.row,g.col);this.event_handler.cell={editable:i,loc:g};return i?(d=a(b.target),e=this.scheme[g.col],this.data[g.row][g.col]=e.data_push(d,g,e.getter(d)),f=this.data[g.row][g.col],void(h!==f&&void 0===c&&(this.data[g.row].modified=!0,D(b,this,h,f)))):this.refresh()},k.prototype.event_handler.focus_in=function(b){var c=a(b.target),d=this.get_loc(b.target),e=this.event_handler.cell,f=this.is_editable_cell(d.row,d.col);if(!e||e.loc.row!==d.row||e.loc.col!==d.col){this.event_handler.cell={loc:d,editable:f},this.div.filter.hide(),this.pre_cell&&this.pre_cell.removeAttr("disabled"),this.col_selected=d.col,f||b.preventDefault();var g=this.scheme[d.col].focus_in;return g&&g.bind(this)(b,c,d),c.attr("disabled",!f),this.pre_cell=c,f&&E(b,this),b}},k.prototype.event_handler.focus_out=function(a){this.event_handler.cell.editable&&F(a,this)},k.prototype.event_handler.focus_number=function(b){var c=this.event_handler.cell;if(c.editable){var d=c.loc,e=this.data[d.row][d.col];this.event_handler.temp_number=e,a(b.target).val(e)}},k.prototype.event_handler.focus_out_number=function(b){var c=this.get_loc(b.target),d=this.data[c.row][c.col],e=a(b.target),f=U.isNull(d)||/^\s*$/.test(d);f?e.val(null):e.val(_(d)),this.scheme[c.col].calc_row&&this.event_handler.temp_number!==d&&this.refresh_calc_cell(c.col),this.event_handler.cell.editable&&F(b,this)},k.prototype.Create_grid=function(){function b(b){d.div.right.scrollLeft(a(this).scrollLeft())}function c(b){if(d.scroll_mode){var c=Math.ceil(a(this).scrollTop()),e=c%d.cfg.wheel_move,f=(c-e)/d.cfg.row_height;d.current_top_line=f,d.render_data(d,f)}}var d=this,e=0,f=this.cfg.fixed_header,g=this.scheme.length;y.call(this),m.call(this,0,e,f),m.call(this,1,f,g),p.call(this),q.call(this),r(this),Q.call(this),M.call(this),S.call(this),Y.call(this),Z.call(this),this.scroll_bar_h=a("<div>",{id:this.get_id()+"_scroll_bar_h"}).addClass(da.scroll_h).width(d.cfg.right_width).height(1).appendTo(d.div.scroll_h),this.cfg.cols_show>=this.scheme.length&&this.div.scroll_h.closest("tr").hide();var h=function(){var a=this.cfg.left_width,e=this.cfg.right_width,f=this.cfg.right_width_show,g=this.cfg.calc_row?this.cfg.row_height:0,h=this.cfg.rows_show*this.cfg.row_height,i=this.cfg.scroll_bar_width,j=[{div_name:"left",width:a+2},{div_name:"right",width:f+1},{div_name:"top_corner"},{div_name:"col_label",width:e},{div_name:"calc_left",height:g},{div_name:"calc_right",height:g,width:e},{div_name:"row_label",height:h},{div_name:"data_table",height:h,width:e},{div_name:"scroll_h",height:i+1,width:f+2,scroll:b},{div_name:"scroll_v",height:this.cfg.scroll_v_height,width:i+1,mouseover:function(){d.scroll_mode=!0},mouseout:function(){d.scroll_mode=!1},scroll:c,child:this.scroll_v_inner}];return"bottom"===this.cfg.calc_row&&(j.push({div_name:"bot_empty",height:0}),j.push({div_name:"bot_right",height:0,width:this.cfg.right_width})),j}.bind(this)();return h.forEach(function(a){var b=d.div[a.div_name];a.width&&b.width(a.width),a.height&&b.height(a.height),a.scroll&&b.scroll(a.scroll),a.child&&b.append(a.child),a.mouseout&&b.mouseout(a.mouseout),a.mouseover&&b.mouseover(a.mouseover)}),H(this),G(this),K(this),I(this),this.div.main.keydown(function(a){a.ctrlKey&&70===a.keyCode&&(d.div.search.show().find("input:first").focus(),a.preventDefault())}),this.click_event=[],this.change_event=[],this.focusin_event=[],this.focusout_event=[],this.event_flag={click:!0,change:!0,focusin:!0,focusout:!0},this.original_data=!1,this.deleted_data=[],this.data=this.create_init_data(),this.data.forEach(function(a,b){a.index=b}),l(this,this.data),this.refresh(),this},k.prototype.get_header_cell=function(a,b){if(this.header_cells[a]&&this.header_cells[a][b])return this.header_cells[a][b];var c=this,d=this.div[0][b>=this.cfg.fixed_header?1:0],e=d.find("."+da.cell).filter(function(){var d=c.get_loc(this);return d.row===a&&d.col===b});return this.header_cells[a][b]=1===e.length?e:null,e},k.prototype.create_init_data=function(a){var b=a||this.cfg.rows_show,c=this.scheme.map(function(a){return a.init_data});return U.range(b).map(function(){return c.slice(0)})},k.prototype.attatch_click_event=function(a){return L(this.click_event,a)},k.prototype.attatch_change_event=function(a){return L(this.change_event,a)},k.prototype.attatch_focusin_event=function(a){return L(this.focusin_event,a)},k.prototype.attatch_focusout_event=function(a){return L(this.focusout_event,a)},k.prototype.sort_func=function(a){return{number_asc:function(b,c){return null===b[a]?1:null===c[a]?-1:b[a]-c[a]},number_desc:function(b,c){return null===b[a]?1:null===c[a]?-1:-b[a]+c[a]},str_asc:function(b,c){return null===b[a]||""===b[a]?1:null===c[a]||""===c[a]?-1:b[a]<c[a]?-1:1},str_desc:function(b,c){return null===b[a]||""===b[a]?1:null===c[a]||""===c[a]?-1:b[a]>c[a]?-1:1},revert:function(a,b){return a.index-b.index}}},k.prototype.refresh=function(){return this.render_data(this,this.current_top_line),this},k.prototype.Cell_value=function(a,b,c){var d=this.cell[a][b],e=this.scheme[b],f=void 0===c?e.getter:e.setter;return f(d,c,a,b,this)},k.prototype.Set_cell_value=function(a,b,c){var d=this.cell[a][b];return this.scheme[b].setter(d,c,a,b,this)},k.prototype.get_loc=function(a){return{row:c(a.getAttribute("row")),col:c(a.getAttribute("col"))}},k.prototype.show_highlight_bar=function(){if(!this.highlight_refresh)return this.highlight_refresh=!0,this;if(this.highlight_row<0)return this;if(this.pre_cell&&this.pre_cell.attr("disabled",!1),this.row_selected>=this.current_top_line&&this.row_selected<this.current_top_line+this.rows.length){var b=this.is_editable_cell(this.row_selected,this.col_selected);this.highlight_row=this.row_selected-this.current_top_line,this.paint_one_row(this.highlight_row,da.row_selected),this.col_selected&&!b?this.pre_cell=this.cell[this.highlight_row][this.col_selected].attr("disabled",!0):this.col_selected&&b&&this.cell[this.highlight_row][this.col_selected].focus()}else this.is_IE()?this.div[0][1].focus():a(":focus").blur();return this},k.prototype.paint_one_row=function(a,b){for(var c=0;2>c;c++)this.rows[a][c].css("background-color",b);return this},k.prototype.hide_one_row=function(a,b){for(var c=0;2>c;c++)this.rows[a][c][b?"hide":"show"]();return this},k.prototype.paint_rows=function(a){function b(b,c){for(var d=0;2>d;++d)a.div[2][d].find("."+da.row+b).css("background-color",c)}return b(":odd",da.row_color_odd),b(":even",da.row_color_even),this},k.prototype.calc_calc_cell=function(a){var b=this.scheme[a];if(void 0===b.calc_row)return"";var c=this.calc[b.calc_row](this,a);return b.calc_title+""+c},k.prototype.calc={sum:function(a,b){var c=a.data.reduce(function(a,c){return a+c[b]},0);return _(c)},avg:function(a,b){var c=function(a){return null!=a[b]},d=function(a,c){return a+c[b]},e=a.data.filter(c),f=e.reduce(d,0)/e.length;return f.toLocaleString("en")},max:function(a,b){var c=Number.MIN_SAFE_INTEGER;return a.data.forEach(function(a,d){var e=a[b];return null==e?!0:void(e>c&&(c=e))}),c<=Number.MIN_SAFE_INTEGER?c="":_(c)},min:function(a,b){var c=Number.MAX_SAFE_INTEGER;return a.data.forEach(function(a,d){var e=a[b];return null==e?!0:void(c>e&&(c=e))}),c>=Number.MAX_SAFE_INTEGER?c="":_(c)}},k.prototype.refresh_calc_cell=function(a){var b=this;return void 0===a?this.scheme.forEach(function(a,c){a.calc_row&&b.calc_cell[c].val(b.calc_calc_cell(c))}):U.isNumber(a)&&b.scheme[a].calc_row&&b.calc_cell[a].val(b.calc_calc_cell(a)),this},k.prototype.Add_row=function(a,b){var c=void 0===a?1:a,e=d(b),f=e?this.data.slice(0,b):this.data,g=this.create_init_data(c),h=e?this.data.slice(b):[];return this.data=f.concat(g,h),this.data.forEach(function(a,b){a.index=b}),P(this,this.data.length),this.refresh(),this},k.prototype.Load_data=function(a,b,c,d){var e=this;e.highlight_row=-1,e.row_selected=-1,e.col_selected=!1,e.sorted=!1,e.filtered=!1,e.pre_filter_data=void 0,e.highlight_refresh=!0,e.clear_filter_condition(e),e.scroll_row(2*-e.data.length),e.scheme.forEach(function(a){a.filter_icon.attr("class",da.filter_btn)}),function(b){var e,f,g,h,i;if(Array.isArray(a)&&Array.isArray(a[0]))e=d?a.map(function(a){return a.map(function(a,c){var d=b.scheme[c];return d.input_caster?d.input_caster(a):a})}):a;else{if(!Array.isArray(a)||!U.isObject(a[0]))return!1;for(e=[],f=0;f<a.length;++f){for(g=0,h=[];g<b.scheme.length;++g)i=a[f][b.scheme[g].name],h[g]=void 0===i?null:i;e[f]=h}}if(b.data.length>e.length)for(f=0;f<e.length;++f)for(g=0;g<b.data[f].length;++g)b.data[f][g]=e[f][g];else b.data=e;U.isFunction(c)&&(b.data=b.data.filter(c))}(this),this.cfg.save_original_data&&(this.original_data=this.data.map(function(a){return a.slice()}));for(var f=0;f<this.data.length;++f)this.data[f].index=f;return this.div.scroll_v.css("overflow-y",this.data.length<=this.cfg.rows_show?"hidden":"scroll"),e.scroll_v_inner.height(this.data.length*e.cfg.row_height),this.cfg.paging?this.render_data(this,0):this.cfg.drill_down?this.render_data(this,0):this.render_data(this,0),this.refresh_calc_cell(),U.isFunction(b)&&b(),this},k.prototype.Row_count=function(){return this.data?this.data.length:this.div.data_table.find("."+da.row).length},k.prototype.Delete_row=function(a,b){function c(a){return/^(?:check|radio)$/i.test(a)}var e=this,f=void 0===a?this.data.length-1:a,g=function(){return c(f)?e.Get_checked(b):d(f)?[f]:Array.isArray(f)?f:/^all$/i.test(f)?"all":void 0}();if(void 0===g)return this;"all"===g?(this.deleted_data=this.deleted_data.concat(this.data),this.data=this.create_init_data()):(g.forEach(function(a,b){this.data[a].del=!0},this),this.deleted_data=this.data.filter(function(a){return a.del}),this.data=this.data.filter(function(a){return!a.del}),this.deleted_data.forEach(function(a){delete a.del}));var h=this.rows.length-this.data.length;if(h>0){var i=this.create_init_data(h);this.data=this.data.concat(i)}return this.data.forEach(function(a,b){a.index=b}),this.refresh_calc_cell(),this.render_data(this,0),P(this,this.data.length),this},k.prototype.Get_checked=function(a){var b=U.isString(b)?U.findIndex(this.scheme,{name:b}):a,c=[];return this.data.forEach(function(a,d){a[b]>0&&c.push(d)}),c},k.prototype.col_bg_color=function(a,b){return this.scheme[a]?(this.scheme[a].bg_color=b,w(this,a),this):this},k.prototype.col_resize=function(a,b){this.left_header_cells||(this.left_header_cells=this.div.top_corner.find("."+da.cell)),this.right_header_cells||(this.right_header_cells=this.div.col_label.find("."+da.cell));var c=this.scheme[this.cfg.fixed_header-1],d=this.scheme[this.scheme.length-1],e=c.left+c.width,f=d.left+d.width,g=this.cfg.left_width-e,h=this.cfg.right_width_show+g+1;this.scheme[a].width=0>b?this.scheme[a].init_width:b,u.call(this),this.div.left.width(e+2),this.div.top_corner.width(e),this.div.right.width(h),this.div.scroll_h.width(h),f<=this.div.right.width()&&(d.width+=this.div.right.width()-f,f=d.left+d.width);for(var i=0;3>i;i++)this.div[i][1].width(f);this.scroll_bar_h.width(f),this.div.bot_right.width(f);var j=this.div.right.width()<=this.div.data_table.width();if(this.show_scroll_bar_h(j),w(this,a),R(this,this.left_header_cells),R(this,this.right_header_cells),0===b){var k;this.scheme.forEach(function(a,b){a.width>0&&(k={index:b,width:a.width})}),k&&this.col_resize(k.index,k.width)}return this},k.prototype.show_scroll_bar_h=function(a){return this.div.scroll_h.closest("tr")[a?"show":"hide"](),this},k.prototype.save_ajax_json=function(b,c,d,e){for(var f,g,h=[],i=0;i<this.data.length;++i)if(!e||e(this.data[i],i)){f={};for(var j=0;j<this.scheme.length;++j)f[this.scheme[j].name]=this.data[i][j];h.push(f)}var k={data:h,params:c||{}};g=JSON.stringify(k),a.ajax({url:b,data:g,dataType:"json",contentType:"application/json",type:"POST",async:!0,success:d||function(){}})},k.prototype.send_ajax_request=function(b,c,d){var e={params:c||{}};return a.ajax({url:b,data:JSON.stringify(e),dataType:"json",contentType:"application/json",type:"POST",async:!0,success:d||function(){}}),this},k.prototype.clear=function(){return this.data=this.create_init_data(),this.data.forEach(function(a,b){a.index=b}),this.refresh(),this},k.prototype.scroll_row=function(a){if(!U.isNumber(a)||this.row_selected>=this.data.length)return this;var b=function(){var b=this.current_top_line+a;if(0>b)return 0;var c=this.data.length-this.cfg.rows_show;return b>c?c:b}.bind(this)();return this.scroll_mode=!1,this.current_top_line=b,this.render_data(this,b),this.div.scroll_v.scrollTop(this.cfg.row_height*b),this},k.prototype.disable=function(a,b,c,d){return this.div.cover[a?"show":"hide"](),U.isNumber(b)&&this.div.cover.css("opacity",b),void 0!==c&&this.div.cover.css("background-color",c),void 0!==d&&this.div.cover.css("z-index",d),this},k.prototype.set_row_color=function(a,b){return void 0!==this.data[a]&&(this.data[a].bg_color=b),this},k.prototype.set_cell_editable=function(a,b,c){return this.data[a].editable||(this.data[a].editable={}),this.data[a].editable[b]=c,this},k.prototype.is_editable_cell=function(a,b){if(b===!1)return!1;if(void 0===this.data[a])return!0;var c=this.data[a].editable;return void 0===c||void 0===c[b]?this.scheme[b].edit:c[b]},k.prototype.get_modified_rows=function(){return this.data.filter(function(a){return a.modified})};var fa={equal:function(a,b){return a===b},not_equal:function(a,b){return a!==b},begins_with:function(a,b){return String(a).startsWith(b)},ends_with:function(a,b){return String(a).endsWith(b)},contains:function(a,b){return String(a).indexOf(b)>=0},not_contain:function(a,b){return String(a).indexof(b)<0},less_than:function(a,b){return b>a},greater_than:function(a,b){return a>b},less_equal:function(a,b){return b>=a},greater_equal:function(a,b){return a>=b}};return k.prototype.clear_filter_condition=function(b){var c=b||this;c.div.filter.find("."+da.filter_minus_btn).each(function(){var b=a(this);"hidden"!==b.css("visibility")&&b.click()}),c.div.filter.find("input[type=checkbox]").prop("checked",!1);var d=c.div.filter.find("."+da.filter_sort_div);return d.find("select").each(function(){var b=a(this),c=b.find("option").first().val();b.val(c).change()}),d.find("input").val(""),this},k.prototype.run_filter=function(b){function d(a){var b;a:for(var c=0;c<f.length;++c){b=!1;var d;b:for(var e=0;e<f[c].length;++e){var g=f[c][e];if(void 0!==g.func&&(d=g.func(a[g.col],g.value),!d))break b}if(d){b=!0;break a}}return b}function e(b){function d(a,b){for(var c=0;c<i.length;++c){var d=i[c].col;if(a[d]!==b[d])return i[c].func(a,b)}return 0}var e=b.div.filter.find("._fg_filter_sort_div"),f=e.find("select[name="+b.get_id()+"_filter_sort_column]"),g=e.find("input[order=sort_asc]"),h=e.find("input[order=sort_desc]"),i=[];f.each(function(d,e){var f=c(a(this).val()),j=g.eq(d).prop("checked"),k=h.eq(d).prop("checked"),l="number"===b.scheme[f].type,m=!j&&!k;if(m)return!0;var n=b.sort_func(f),o=n[(l?"number_":"str_")+(j?"asc":"desc")];i.push({col:f,func:o})}),i.length>0?(b.data.sort(d),b.sorted=!0):b.sorted&&(b.data.sort(b.sort_func(0).revert),b.sorted=!1)}var f=b.collect_filter_functions();if(!b.validate_filter_options())return alert("잘못된 입력입니다");b.div.filter.hide(),b.pre_filter_data&&(b.data=b.pre_filter_data),b.pre_filter_data=b.data;var g=[];if(f.length>0?(g=b.data.filter(d),b.filtered=!0):(g=b.data,b.filtered=!1),b.data=g,e(b),b.refresh_calc_cell(),b.data.length<b.rows.length){var h=b.rows.length-b.data.length,i=b.create_init_data(h);b.data=b.data.concat(i)}b.scroll_row(2*-b.data.length),b.render_data(b,b.current_top_line),b.scroll_v_inner.height(b.data.length*b.cfg.row_height),b.scheme.forEach(function(a){a.filter_icon.attr("class",da.filter_btn)});for(var j=0;j<f.length;++j)for(var k=0;k<f[j].length;++k){var l=f[j][k].col;b.scheme[l].filter_icon.attr("class",da.filter_btn_red)}},k.prototype.validate_filter_options=function(){for(var a=this.get_id(),b=this.div.filter.find("select[name="+a+"_filter_cond_column]"),c=this.div.filter.find("input[name="+a+"_filter_cond_value]"),d=0;d<b.length;++d){var e=b.eq(d).val(),f=this.scheme[e].type,g=$(c.eq(d).val());if("number"===f&&!g)return c.eq(d).focus(),!1}return!0},k.prototype.collect_filter_functions=function(){var a=this.get_id(),b=this.div.filter,d=b.find("select[name="+a+"_filter_cond_operator]"),e=b.find("select[name="+a+"_filter_cond_column]"),f=b.find("select[name="+a+"_filter_cond_condition]"),g=b.find("input[name="+a+"_filter_cond_value]"),h=[];return U.range(d.length).forEach(function(a){var b=/^\s*$/.test(g.eq(a).val());if(!b){var i="OR"===d.eq(a).val()?[]:h.pop()||[],j=f.eq(a).val(),k={col:c(e.eq(a).val()),func:fa[j],value:g.eq(a).val()};"number"===this.scheme[k.col].type&&$(k.value)&&(k.value=Number(k.value)),i.push(k),h.push(i)}}.bind(this)),h},k.prototype.data_filter=function(a,b){var c=this;c.pre_filter_data&&(c.data=c.pre_filter_data),c.pre_filter_data=c.data;var d=U.isFunction(a);if(c.data=d?c.data.filter(a):c.data,c.filtered=d,c.refresh_calc_cell(),c.data.length<c.rows.length){var e=c.create_init_data(c.rows.length-c.data.length);c.data=c.data.concat(e)}return c.scroll_row(2*-c.data.length),c.render_data(c,c.current_top_line),c.scroll_v_inner.height(c.data.length*c.cfg.row_height),c.scheme.forEach(function(a){a.filter_icon.attr("class",da.filter_btn)}),b.forEach(function(a){c.scheme[a].filter_icon.attr("class",da.filter_btn_red)}),this},k.prototype.create_search_reg_exp=function(a,b,c,d,e){if(void 0===a||null===a)return/$^/;if(b)return new RegExp(f,d?"i":void 0);var f=a;return f=f.replace(/\s/g,"\\s"),f=f.replace(/([\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\{\]\}\`\~\;\:\'\"\,<\.\>\/\?\\\|])/g,"\\$1"),e&&(f=f.replace(/\\\?/g,"."),f=f.replace(/\\\*/g,".*")),c&&(f="^"+f+"$"),new RegExp(f,d?"i":void 0)},k.prototype.modal=function(a,b){var c=this,d=this.div.modal,e=d.find("div[role=body]"),f=d.find("div[role=control]"),g=function(a){U.isBoolean(a)&&c.disable(a)},h={obj:d,show:function(a){d.show(),g(a)},hide:function(a){d.hide(),g(a)},text:function(a){e.empty().append(a)},button:function(a){f[a?"show":"hide"]()}};return h.text(a),h.button(b),h},k}(jQuery);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ }
/******/ ]);