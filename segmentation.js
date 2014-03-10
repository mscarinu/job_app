var chartOptions;
var action_chart;

var s_properties = '<option data-hidden="true"></option><option value="1">Events</option><option value="2">City</option><option value="3">Country</option><option value="4">Phone Type</option><option value="5">Acquisition Source</option><option value="6">Operating System</option><option value="7">Browser</option><option value="8">Time Period</option>';
var s_filter = '<option value="1">equals</option><option value="2">does not equal</option><option value="3" selected>contains</option><option value="4">does not contain</option><option value="5">is set</option><option value="6">is not set</option>';
var s_operators = '<option value="by">BY</option><option value="avg">AVG</option><option value="sum">SUM</option><option value="max">MAX</option><option value="min">MIN</option>';
var div_s_operators = '<div class="operation"><select class="selectpicker op_picker" id="jswidget_'+Math.round(Math.random()*1000000)+'" style="width: 90px; position: relative; z-index: 1">'+s_operators+'</select></div>';
var r_actions_content = '<select style="width: 120px" class="datatype selectpicker" id="jswidget_'+Math.round(Math.random()*1000000)+'" disabled> <option value="1">String</option> <option value="2">Number</option> <option value="3">True / False</option> <option value="4">Date</option></select>';
var boolcontainer = '<div class="bool_op toggle_container" id="jswidget_'+Math.round(Math.random()*1000000)+'" val="and"><div class="toggle" style="position: relative;"><button type="button" class="btn btn-default btn-sm btn-small bool_toggle selectedBool" id="and"  style="padding: 7px 12px" onclick="getBoolOption(1)" id="and">AND</button><button type="button" id="or" class="btn btn-white btn-sm btn-small bool_toggle" style="padding: 7px 12px" onclick="getBoolOption(0)">OR</button></div></div>';

var date_type = '<div class="inline_text" style="display: inline-block; margin: 0 5px 0 5px">was</div>'+
'<div style="display: inline-block; margin: 0 5px 0 5px; width: 112px">'+
	'<select class="fil_picker prange" >'+
		'<option value="13">more than</option>'+
		'<option value="14">less than</option>'+
	'</select>'+
'</div>'+
'<div style="display: inline-block; margin: 0 5px 0 5px">'+
	'<select class="fil_picker pnum" >'+
		'<option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option>'+
		'<option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option>'+
		'<option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option>'+       		
	'</select>'+
'</div>'+
'<div style="display: inline-block; margin: 0 5px 0 5px">'+
	'<select class="fil_picker pperiod" >'+
		'<option value="1">days</option>'+
		'<option value="2">weeks</option>'+
		'<option value="3">months</option>'+
	'</select>'+
'</div>'+
'<div class="inline_text" style="display: inline-block; margin: 0 5px 0 5px">ago</div>';

var num_bet = '<div class="number_between" style="display: inline-block; vertical-align: top;">'+
'<input type="text" class="typed_text_input input_from" style="display: inline-block;">'+
'<div class="inline_text" style="display: inline-block;">and</div>'+
'<input type="text" class="typed_text_input input_to" style="display: inline-block;">'+
'</div>';

var num_input = '<div style="vertical-align: top"><input type="text" class="typed_text_input input_from"></div>';

var number_type = '<div class="inline_text" style="display: inline-block; margin: 0 5px 0 5px">is</div>'+
'<div style="display: inline-block; margin: 0 5px 0 5px; width: 112px">'+
	'<select class="fil_picker num_range" id="jswidget_'+Math.round(Math.random()*1000000)+'" >'+
		'<option value="7">in between</option>'+
		'<option value="8">less than</option>'+
		'<option value="9">equal to</option>'+
		'<option value="10">greater than</option>'+
	'</select>'+
'</div>'+
num_bet;

var bool_type = '<div class="inline_text">is</div><select class="fil_picker bool_sel"><option value="11">True</option><option value="12">False</option></select>';

var event_filter1 = 
'<select class="fil_picker event_list" data-live-search="true" title="Event Name" data-width="auto">'+
'<option data-hidden="true">'+
	'<option>open/fight</option>'+
	'<option>close/dungeonmenu</option>'+
'</select>'+
'<select class="fil_picker attr_list" data-live-search="true" style="margin-left: 5px;" title="Attribute" data-width="auto">'+
'<option data-hidden="true">'+
	'<option>defense</option>'+
	'<option>attack</option>'+
'</select>';

var event_filter3 = '<div id="jswidget_'+Math.round(Math.random()*1000000)+'" style="display: inline-block; padding-right: 4px;padding-left: 4px;"><select class="second_filter">'+s_filter+'</select></div>';


var event_filter2 = '<select class="fil_picker val_select third_filter" data-live-search="true" style="margin-left: 5px;" data-width="auto" title="Value" data-width="auto">'+
'<option data-hidden="true">'+
'<option>1</option>'+
'<option>2</option>'+
'</select>';


$(document).ready(function() {
	loadTable();
	loadActionChart("line");

	$('.first_filter').selectpicker();
	$('.game_filter').selectpicker();
	$('.selectpicker').selectpicker();
	
	$("#from").datepicker({ format: "yyyy-mm-dd", autoclose: true, todayHighlight: true});
	$("#to").datepicker({ format: "yyyy-mm-dd", autoclose: true, todayHighlight: true});
	
	$(".sf_wrapper").find(".datatype").prop("disabled", true).selectpicker();
	$(".op_picker").selectpicker();

	$('#save_bookmark').popover({ 
		html : true, 
		placement: "bottom",
		content: function() {
			return $('#save_bookmark_popup').html();
		},
		animation: false
	});

	$('#show_bookmarks').popover({ 
		html : true, 
		placement: "bottom",
		content: function() {
			return $('#show_bookmark_popup').html();
		},
		animation: false
	});

	/* close all popover when click outside*/
	$('body').on('click', function (e) {
		//console.log("-AAA-");
		$('[data-toggle="popover"]').each(function () {
			//the 'is' for buttons that trigger popups
			//the 'has' for icons within a button that triggers a popup
			//console.log("BBB: " +$(this).is(e.target));
			//console.log("CCC: " +$(this).has(e.target).length);
			//console.log("DDD: " +$('.popover').has(e.target).length);
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 /*&& $('.popover').has(e.target).length === 0*/) {
				//console.log("hide");
				//$(".popover.bottom.in").hide();
				//$(".popover.bottom.in").popover('hide');
				//$(".popover.bottom.in").hide();
				//$(this).popover('hide');
	        }else{
	        	//console.log("show");
	        	//$(this).popover('show');
	        }
	    });
	}); 
	
	

	$( '.sf_wrapper').on( 'click',  '.insert_row',function () { 
		addRow($(this).parent().attr("id"), "I");
	}); 

	//hide second dimension
	$(".subsegment_row").on( 'change', '.property_dropdown',function () { 
		$(".subsegment_row").find(".datatype").prop("disabled", false).selectpicker("refresh");
    });
	
	//onchange trigger on num_range(inbetween, less than, greater than, equal to)
	$(".sf_wrapper").on( 'change', '.num_range',function () { 
		var poc = $(this).parent().parent().parent().attr("id");
		var numrange_val = $(this).val();
		var str="";
		
		$("#"+poc).find(".rule div:nth-child(3)").remove();
		if(numrange_val == 1){
			str= num_bet;
		}else {
			str= num_input;
		}
		$("#"+poc).find(".rule").append(str);
    });
	
	//onchange trigger for second_filter (equals, does not equals, ..)
	$(".sf_wrapper ").on( 'change', '.property_filter select.second_filter',function () {
		var poc = $(this).parent().parent().parent().attr("id");
		var sfparid = $(this).parent().attr("id");
		var secfil_val = $(this).val();
		var ffil_val = $("#"+poc).find(".first_filter").val();
		
		console.log("OOOO " +sfparid);
		if(ffil_val == 1){ //Events
			var opEvents = '<option data-hidden="true"></option><option>1</option><option>2</option><option>3</option>';
			if(secfil_val == 1 || secfil_val == 2){
				console.log("V1");
				$("#"+sfparid).nextAll().remove();
				//console.log("PPP: " +$("#"+sfparid).nextAll().html());
				$("#"+poc).find(".rule").append('<select class="fil_picker val_select third_filter" multiple title="Value" data-live-search="true" style="margin-left: 5px;" data-width="auto">'+opEvents+'</select>');
			}else if(secfil_val == 3 || secfil_val == 4){
				console.log("V2");
				//console.log("CCC: " +$("#"+sfparid).nextAll().html());
				$("#"+sfparid).nextAll().remove();
				$("#"+poc).find(".rule").append('<select class="fil_picker val_select third_filter" title="Value" data-live-search="true" style="margin-left: 5px;" data-width="auto">'+opEvents+'</select>');
			}else if(secfil_val == 5 || secfil_val == 6){
				console.log("V3");
				$("#"+sfparid).nextAll().remove();
			}
		}else if(ffil_val == 2){ //City
			if(secfil_val == 1 || secfil_val == 2 || secfil_val == 3 || secfil_val == 4){
				$("#"+sfparid).nextAll().remove();
				$("#"+poc).find(".rule").append('<input type="text" class="third_filter">');
			}else if(secfil_val == 5 || secfil_val == 6){
				$("#"+sfparid).nextAll().remove();
			}
		}else if(ffil_val == 3){ // Country
			var opCountry = '<option data-hidden="true"></option><option>Singapore</option>';
			if(secfil_val == 1 || secfil_val == 2){
				$("#"+sfparid).nextAll().remove();
				$("#"+poc).find(".rule").append('<select class="third_filter" multiple title="Value" data-live-search="true" style="margin-left: 5px;" data-width="auto">'+opCountry+'</select>');
			}else if(secfil_val == 3 || secfil_val == 4){
				$("#"+sfparid).nextAll().remove();
				$("#"+poc).find(".rule").append('<select class="third_filter" title="Value" data-live-search="true" style="margin-left: 5px;" data-width="auto">'+opCountry+'</select>');
			}else if(secfil_val == 5 || secfil_val == 6){
				$("#"+sfparid).nextAll().remove();
			}
		}else if(ffil_val == 4){ //Phone Type
			var opPhone = '<option data-hidden="true"></option><option>Iphone 5s</option><option>Note 3</option><option>S4</option>';
			if(secfil_val == 1 || secfil_val == 2){
				$("#"+sfparid).nextAll().remove();
				$("#"+poc).find(".rule").append('<select class="third_filter" multiple title="Value" data-live-search="true" style="margin-left: 5px;" data-width="auto">'+opPhone+'</select>');
			}else if(secfil_val == 3 || secfil_val == 4){
				$("#"+sfparid).nextAll().remove();
				$("#"+poc).find(".rule").append('<select class="third_filter" title="Value" data-live-search="true" style="margin-left: 5px;" data-width="auto">'+opPhone+'</select>');
			}else if(secfil_val == 5 || secfil_val == 6){
				$("#"+sfparid).nextAll().remove();
			}
		}else if(ffil_val == 5){ //Acquisition Source
			var opAS = '<option data-hidden="true"></option><option>$direct</option>';
			if(secfil_val == 1 || secfil_val == 2){
				$("#"+sfparid).nextAll().remove();
				$("#"+poc).find(".rule").append('<select class="third_filter" multiple title="Value" data-live-search="true" style="margin-left: 5px;" data-width="auto">'+opAS+'</select>');
			}else if(secfil_val == 3 || secfil_val == 4){
				$("#"+sfparid).nextAll().remove();
				$("#"+poc).find(".rule").append('<select class="third_filter" title="Value" data-live-search="true" style="margin-left: 5px;" data-width="auto">'+opAS+'</select>');
			}else if(secfil_val == 5 || secfil_val == 6){
				$("#"+sfparid).nextAll().remove();
			}
		}else if(ffil_val == 6){ //Operating System
			var opOS = '<option data-hidden="true"></option><option>Mac</option><option>Windows</option><option>Linux</option>';
			if(secfil_val == 1 || secfil_val == 2){
				$("#"+sfparid).nextAll().remove();
				$("#"+poc).find(".rule").append('<select class="third_filter" multiple title="Value" data-live-search="true" style="margin-left: 5px;" data-width="auto">'+opOS+'</select>');
			}else if(secfil_val == 3 || secfil_val == 4){
				$("#"+sfparid).nextAll().remove();
				$("#"+poc).find(".rule").append('<select class="fil_picker val_select third_filter" title="Value" data-live-search="true" style="margin-left: 5px;" data-width="auto">'+opOS+'</select>');
			}else if(secfil_val == 5 || secfil_val == 6){
				$("#"+sfparid).nextAll().remove();
			}
		}else if(ffil_val == 7){ //Browser
			var opBrowser = '<option data-hidden="true"></option><option>Chrome</option><option>Safari</option>';
			if(secfil_val == 1 || secfil_val == 2){
				$("#"+sfparid).nextAll().remove();
				$("#"+poc).find(".rule").append('<select class="third_filter" multiple title="Value" data-live-search="true" style="margin-left: 5px;" data-width="auto">'+opBrowser+'</select>');
			}else if(secfil_val == 3 || secfil_val == 4){
				$("#"+sfparid).nextAll().remove();
				$("#"+poc).find(".rule").append('<select class="third_filter" title="Value" data-live-search="true" style="margin-left: 5px;" data-width="auto">'+opBrowser+'</select>');
			}else if(secfil_val == 5 || secfil_val == 6){
				$("#"+sfparid).nextAll().remove();
			}
		}
			
		$(".fil_picker, .third_filter").selectpicker("refresh");
    });
	
	
	//onchange trigger for datatype (string, number, ...)
	$(".sf_wrapper").on( 'change', '.datatype',function () {
		changeRule($(this).parent().attr("id"), "D");
//		var poc = $(this).parent().parent().attr("id"); //find property_filter parent id
//		var dt_val = $(this).val(); //get selected datatype
//		var firstfil_id = $("#"+poc).find("div select:first-child").attr("id");
//		var d = $("#"+firstfil_id +" option:selected").val();
//		var rule_content = $("#"+poc).find(".rule").html();
//		var rule_con="";
//		
//		if(!(d == "8" || d == "1")){
//			rule_con = '<div id="jswidget_'+Math.round(Math.random()*1000000)+'" style="display: inline-block; padding-right: 4px;padding-left: 4px;"><select class="second_filter">'+s_filter+'</select></div>';
//	    }
//		if(rule_content != ""){
//			if(dt_val == 1){
//				if(d == "1"){
//			        rule_con = event_filter;
//			      }if(d == "7"){
//			    	  rule_con += '<div id="jswidget_'+Math.round(Math.random()*1000000)+'" style="display: inline-block"><select class="third_filter" data-width="auto" data-live-search="true" title="Select a value"><option data-hidden="true"></option><option>Chrome</option><option>Safari</option></select></div>';
//			      }else if(d == "2"){
//			    	  rule_con += '<input type="text">';
//			      }else if(d == "3"){
//			    	  rule_con += '<div id="jswidget_'+Math.round(Math.random()*1000000)+'" style="display: inline-block"><select class="third_filter" data-width="auto" data-live-search="true" title="Select a value"><option data-hidden="true"></option><option>Singapore</option></select></div>'; 
//			      }else if(d == "8"){
//			    	  rule_con = date_type;		    	  
//			    	  $("#"+poc +" .rule").find("div:nth-child(2)").remove();
//			      }else if(d == "5" || d == "Initial Referring Dom"){
//			    	  rule_con += '<div id="jswidget_'+Math.round(Math.random()*1000000)+'" style="display: inline-block"><select class="third_filter" data-width="auto" data-live-search="true" title="Select a value"><option data-hidden="true"></option><option>$direct</option></select></div>'; 
//			      }else if(d == "6"){
//			    	  rule_con += '<div id="jswidget_'+Math.round(Math.random()*1000000)+'" style="display: inline-block"><select class="third_filter" data-width="auto" data-live-search="true" title="Select a value"><option data-hidden="true"></option><option>Chrome</option><option>Safari</option></select></div>'; 
//			      }else if(d == "4"){
//			    	  rule_con += '<div id="jswidget_'+Math.round(Math.random()*1000000)+'" style="display: inline-block"><select class="third_filter" data-width="auto" data-live-search="true" title="Select a value"><option data-hidden="true"></option><option>Iphone 5s</option><option>Note 3</option><option>S4</option></select></div>'; 
//			      }
//			}else if(dt_val == 2){
//				rule_con = number_type;
//			}else if(dt_val == 3){
//				rule_con = bool_type;
//			}else if(dt_val == 4){
//				rule_con = date_type;
//			}
//			$("#"+poc).find(".rule").html(rule_con);
//		}
//		
//		$('.selectpicker, .second_filter, .third_filter, .fil_picker').selectpicker();
    });
	
	//onchange trigger for first_filter (events, browser, ..)
	$(".sf_wrapper").on( 'change', '.first_filter', function () { 
		changeRule($(this).parent().attr("id"), "F");
    });
	
	//click trigger on expand
	$(".sf_wrapper").on( 'click', '.expand', function () { 
		changeRule($(this).attr("id"), "E");
    });
	
	//click trigger on new_row
	$(".sf_wrapper").on( 'click', '.new_row', function () { 
		console.log("EEEE");
		addRow("", "A");
    });
	
//	$(".save_bookmark_popup").on("click", ".bookmark_save", function(){
//		alert("PP");
//	});
	
});

function changeRule(elem_id, flag){
	
	var poc = $("#"+elem_id).parent().attr("id");
	var dt_val = $("#"+poc).find(".datatype").val();
	var ff_val = $("#"+poc).find(".first_filter").val();
	var rule_con = $("#"+poc).find(".rule").html();
	var ruleCon="";
	var m = Math.round(Math.random()*1000000);
	console.log("mmm: " +m);
	
	var ef3 = '<div id="jswidget_'+Math.round(Math.random()*1000000)+'" style="display: inline-block; padding-right: 4px;padding-left: 4px;"><select class="second_filter">'+s_filter+'</select></div>';
	
	if(flag == "F"){ // onchange Property function
		console.log("A1");
		if(rule_con != ""){ // change rule content if not empty
			console.log("A2");
			if( ff_val == 1){ 
				ruleCon = event_filter1+ef3 + "" + event_filter2;
				$("#"+poc).find(".rule").html(ruleCon);
				$("#"+poc).find(".second_filter").trigger("change");
			}else if(ff_val == 8){
				ruleCon = date_type;
				$("#"+poc).find(".rule").html(ruleCon);
			}else{
				ruleCon =  '<div id="jswidget_'+m+'" style="display: inline-block; padding-right: 4px;padding-left: 4px;"><select class="second_filter">'+s_filter+'</select></div>';
				$("#"+poc).find(".rule").html(ruleCon);
	    		$("#"+poc).find(".second_filter").trigger("change");
	    	}
		}else{
			console.log("A3");
			$("#"+poc).find(".expand").remove();
			$("#"+poc).find(".contract").remove();
			$("#"+poc).find(".datatype").val("1"); //default to string when first filter onchange
			$('<div style="display: inline-block; color: #499ECE; vertical-align: middle; font-size: 25px; padding-left: 4px" class="fa fa-chevron-circle-right expand" id="expand_'+ Math.round(Math.random()*1000000) +'"></div>').insertAfter($("#"+poc).find(".rule"));
			$("#"+poc).find(".datatype").prop("disabled", false).selectpicker("refresh");
			$(".sf_second_dimension").show();  
		}
	}else{ // on click expand function
		$("#"+poc).find(".expand").remove();
		$("#"+poc).find(".contract").remove();
		$('<div style="display: inline-block; margin-left: 5px; color: #499ECE; vertical-align: middle; font-size: 25px;" class="fa fa-chevron-circle-left contract" id="contract_'+ Math.round(Math.random()*1000000) +'" onclick="contractFilter(this.id)"></div>').insertAfter($("#"+poc).find(".rule"));

	    if(dt_val == 1){
	    	if( ff_val == 1){ 
	    		ruleCon = event_filter1+ef3 + "" + event_filter2;
				$("#"+poc).find(".rule").html(ruleCon);
				$("#"+poc).find(".second_filter").trigger("change");
			}else if(ff_val == 8){
				ruleCon = date_type;
				$("#"+poc).find(".rule").html(ruleCon);
			}else{
				ruleCon =  '<div id="jswidget_'+Math.round(Math.random()*1000000)+'" style="display: inline-block; padding-right: 4px;padding-left: 4px;"><select class="second_filter">'+s_filter+'</select></div>';
				$("#"+poc).find(".rule").html(ruleCon);
	    		$("#"+poc).find(".second_filter").trigger("change");
	    	}
		}else if(dt_val == 2){
			ruleCon = number_type;
			$("#"+poc).find(".rule").html(ruleCon);
		}else if(dt_val == 3){
			ruleCon = bool_type;
			$("#"+poc).find(".rule").html(ruleCon);
		}else if(dt_val == 4){
			ruleCon = date_type;
			$("#"+poc).find(".rule").html(ruleCon);
		}
	    
	    
	    var nrisvis = $(".sf_wrapper .new_row").is(":visible"); //check if new row is visible	    
	    var propfil_len = $(".sf_wrapper").find(".property_filter").length;
	    var lchild="";
	    
	    //assign AND or OR
	    var activebtn = $(".toggle").find(".btn-white").html();
	    var seglabelsel = "AND";
	    if(activebtn == "AND"){
	    	seglabelsel = "OR";
	    }
	    
	    $(".sf_wrapper .rows .property_filter").each(function(){
	    	lchild = $(this).attr("id"); //get last child id of property_filter
	    });
	    
	    //function for labels
		if(poc == lchild && nrisvis != true){
			$(".new_row").show();
			$(".new_row").find(".grey_vert").css("display", "block");
			
			$(".labels").find(".grey_vert").show();
			$(".labels").find(".grey_horz").show();
			$(".labels").find(".operation").remove();
	  
			var llc = $(".sf_wrapper").find(".labels div:last-child").attr("class");
			if(propfil_len == 1){
				$(".labels").append('<div class="seg_label" style="visibility: hidden;">x</div>');
			}else if(propfil_len == 2){
				if(llc == "seg_label") $(".sf_wrapper").find(".labels div:last-child").remove();
				$(".labels").append('<div class="seg_label" style="visibility: hidden;">x</div>');
				$(".labels").append(boolcontainer);          
			}else{
				if(llc == "seg_label") $(".sf_wrapper").find(".labels div:last-child").remove();        
				$('.labels').append('<div class="seg_label">'+seglabelsel+'</div>');
			}
		}
	    
	}
	$('.selectpicker, .second_filter, .third_filter, .fil_picker').selectpicker();
	
}
  
function contractFilter(x){
    var p1 = $("#"+x).parent().attr("id");
    var pfl = $(".sf_wrapper").find(".property_filter").length;

	$("#"+p1).find(".rule").empty();
	$("#"+x).remove();
	$('<div style="display: inline-block; color: #499ECE; vertical-align: middle; font-size: 25px; padding-left: 4px" class="fa fa-chevron-circle-right expand" id="expand_'+ Math.round(Math.random()*1000000) +'"></div>').insertAfter($("#"+p1).find(".rule"));
	
	$(".sf_wrapper .rows .property_filter").each(function(){
		lc = $(this).attr("id");
	});

	if(p1 == lc){
		if(pfl == 1){
			$(".grey_vert").hide();
			$(".grey_horz").hide();
			$(".sf_wrapper .new_row").hide();
			var llca = $(".sf_wrapper").find(".labels div:last-child").attr("class");
			if(llca == "seg_label") $(".sf_wrapper").find(".labels div:last-child").remove();
			$('.labels').append(div_s_operators);
		}else if(pfl == 2){
			$(".sf_wrapper .new_row").hide();
			var llcb = $(".sf_wrapper").find(".labels div:last-child").attr("class");
			if(llcb == "bool_op toggle_container") $(".sf_wrapper").find(".labels div:last-child").remove();
			$('.labels').append(div_s_operators);
		}else{
			$(".sf_wrapper .new_row").hide();
			$('.labels').append(div_s_operators);
			$(".sf_wrapper").find(".operation").prev().remove();
		}
	}
	$(".op_picker").selectpicker();
  }  

function addRow(elem_id, flag){
	console.log("PPPP: " +elem_id);
	var nr = '<div id="jswidget_'+Math.round(Math.random()*1000000)+'" class="property_filter">'+
	'<div class="property_dropdown filterable_dropdown" id="jswidget_'+Math.round(Math.random()*1000000)+'">'+
	//'<select id="jswidget_'+Math.round(Math.random()*1000000)+'" onchange="showFilter(this.value, this.id)"  title="Property" class="first_filter" data-width="auto" data-live-search="true">'+s_properties+'</select>'+
	'<select id="jswidget_'+Math.round(Math.random()*1000000)+'" title="Property" class="first_filter" data-width="auto" data-live-search="true">'+s_properties+'</select>'+
	'</div>'+
	'<div class="rule"></div>'+
    '<div class="delete_button icon_button delete" id="jswidget_'+Math.round(Math.random()*1000000)+'" onclick="removeThisRow(this.id)"><button class="btn delete_prop" type="button"><i class="fa fa-times"></i></button></div><div class="typecast_dropdown icon_dropdown" id="jswidget_'+Math.round(Math.random()*1000000)+'">'+r_actions_content+'</div>'+
	'<div class="insert_row">'+
	'<i class="fa fa-plus-circle add-small-plus"></i>'+
	'<div class="line">'+
	'</div>'+
	'</div>'+
	'</div>';
	
	if(flag == "A"){
	    $(".new_row").hide();
	    $(".insert_row").show();
	    $(".rows").append(nr);
	    $('.labels').append(div_s_operators);
	}else{
		var activebtn = $(".toggle").find(".btn-white").html();
		var seglabelsel = "AND";
		
		if(activebtn == "AND"){
		  seglabelsel = "OR";
		}
		
		if($(".labels").find("div:last-child").hasClass("operation")){
			if($(".labels").find("div:nth-child(4)").hasClass("bool_op")){
				$('<div class="seg_label">'+seglabelsel+'</div>').insertBefore($(".labels").find(".operation"));      
			}else{
				$(boolcontainer).insertBefore($(".labels").find(".operation"));      
			}
		}else{
			$(".labels").append('<div class="seg_label">'+seglabelsel+'</div>');
		}
		
		$(nr).insertAfter($("#"+elem_id));
	}
	
	$(".datatype, .first_filter").selectpicker();
	$(".first_filter, .selectpicker, .op_picker").selectpicker();
}


function addNewRow(v){
	//addRow(v, "A");
}
  
function removeThisRow(x){
	var pid = $("#"+x).parent().attr("id"); //get property_filter id
	var pfl = $(".sf_wrapper").find(".property_filter").length; 
	    
	var lc="";
	$(".sf_wrapper .rows .property_filter").each(function(){
		lc = $(this).attr("id"); //get the last property_filter id
	});

    var ex = $(".sf_wrapper").find("div.labels").children().length;
	if(pid == lc){  //check if property_filter is the last child        
		if(pfl == 1){  // check if property_filter is only one
			$(".grey_vert").hide();
			$(".grey_horz").hide();
			$(".labels").find(".grey_horz").nextAll().remove();
			$("#"+pid).find(".rule").empty();
			$("#"+pid).find(".contract").remove();
			$("#"+pid).find(".expand").remove();
			$('.labels').append(div_s_operators);
			$(".new_row").hide();
			$("#"+pid).find(".datatype").prop("disabled", true);
			$(".sf_second_dimension").hide();    
		}else{
			var isexpand = $("#"+pid).prev().find("div:nth-child(3)").hasClass("expand"); //get the previous property_filter if it has expand 
			var isthird = $("#"+pid).prev().find("div:nth-child(3)").attr("class"); // get the third div of prev property_filter
			
			$("#"+pid).prev().find(".insert_row").hide();
			
			if(isexpand == true || isthird == "delete_button icon_button delete"){
				for(var i=0; i < 2; i++){
				    var ex = $(".sf_wrapper").find("div.labels").children().length;
				    $(".labels").find("div:nth-child("+ex+")").remove();
				}
				  $('.labels').append(div_s_operators);
				  $(".new_row").hide();
			}else{
				$(".labels").find("div:nth-child("+ex+")").remove();
				$(".new_row").show();
			}
			$("#"+pid).remove();     
		}       
	
		  var proplen = $(".sf_wrapper").find(".property_filter").length;
		
		  var hacContract = $(".sf_wrapper .property_filter").find("div").hasClass("contract");
		  if(proplen == 1 && hacContract != true){
		      $(".grey_vert").hide();
		  $(".grey_horz").hide();
		  }      
	        
	}else{   
		if($(".labels").find("div:last-child").hasClass("operation")){
			ex = ex-1;
			$(".labels").find("div:nth-child("+ex+")").remove();
		}else{
			$(".labels").find("div:nth-child("+ex+")").remove();
		}
		$("#"+pid).remove();  
		var propfillen = $(".sf_wrapper").find(".property_filter").length;
		var hacContract = $(".sf_wrapper .property_filter").find("div").hasClass("contract");
		if(propfillen == 1 && hacContract != true){
			$(".grey_vert").hide();
			$(".grey_horz").hide();
		}
	}
    $(".first_filter, .selectpicker, .op_picker").selectpicker();
	    
}

function showSecondDimension(v){
	var ssr = '<div id="jswidget_'+Math.round(Math.random()*1000000)+'" class="property_filter"> <div class="property_dropdown filterable_dropdown" id="jswidget_'+Math.round(Math.random()*1000000)+'"> <select id="jswidget_'+Math.round(Math.random()*1000000)+'" class="sub_first_filter" title="Property" data-width="auto" data-live-search="true">'+s_properties+'</select> </div> <div class="rule"></div>   <div class="delete_button icon_button delete" id="jswidget_'+Math.round(Math.random()*1000000)+'" onclick="removeSecondDimension()"><button class="btn delete_prop" type="button"><i class="fa fa-times"></i></button></div><div class="typecast_dropdown icon_dropdown" id="jswidget_'+Math.round(Math.random()*1000000)+'">'+r_actions_content+' </div> </div>';
	  
	$(".pick_second_dimension").show();
    $(".add_second_dimension").hide();
    $(".subsegment_row").html(ssr);
    $(".sub_first_filter").selectpicker();
    $(".subsegment_row").find(".datatype").prop("disabled", true).selectpicker("refresh");
}  
  
function removeSecondDimension(){
	$(".pick_second_dimension").hide();
	$(".add_second_dimension").show();
}

function getBoolOption(v){
    $(".sf_wrapper").find(".bool_toggle").toggleClass("btn-white","btn-default");
    $(".sf_wrapper").find(".bool_toggle").removeClass("selectedBool");
    if(v == 0){
    	$(".sf_wrapper").find(".seg_label").html('OR');
    	$(".sf_wrapper").find("#or").addClass("selectedBool");
    }else{
    	$(".sf_wrapper").find(".seg_label").html('AND');
    	$(".sf_wrapper").find("#and").addClass("selectedBool");
    }
}

function saveBookmark(){
	var a="", b="", c="", d="", e="";
	
	var pflength = $(".sf_wrapper").find(".property_filter").length;
	var count = 0;
	
	
	
	$(".sf_wrapper").find(".property_filter").each(function(){
		
		var bOp = $(".sf_wrapper").find(".selectedBool").attr("id");
		console.log("EEEE: " +bOp);

		console.log("---" +$(this).attr("id"));
		console.log("-1--" +$(this).find(".first_filter").val());
		console.log("-2--" +$(this).find(".first_filter").val());
		var ffilter = $(this).find(".first_filter").val();
		//var ddtype = $(this).find(".first_filter").val();
		
		var sfilter = $(this).find(".rule .second_filter").length;
		var eventlist = $(this).find(".rule .event_list").length;
		var prange = $(this).find(".rule .prange").length;
		var numrange = $(this).find(".rule .num_range").length;
		var boolsel = $(this).find(".rule .bool_sel").length;
		//var pnum = $(this).find(".rule .pnum").length;
		//var pperiod = $(this).find(".rule .pperiod").length;
		var sfunc = $(".sf_wrapper").find(".op_picker").length;
		//var toggleCon = $(".sf_wrapper").find(".bool_op").length;
		
		var sfilterval = $(this).find(".rule .second_filter").val();
		var eventlistval = $(this).find(".rule .event_list").val();
		var prangeval = $(this).find(".rule .prange").val();
		var numrangeval = $(this).find(".rule .num_range").val();
		var boolselval = $(this).find(".rule .bool_sel").val();
		var pnumval = $(this).find(".rule .pnum").val();
		var pperiodval = $(this).find(".rule .pperiod").val();
		var attrlistval = $(this).find(".rule .attr_list").val();
		var tfilterval = $(this).find(".rule .third_filter").val();
		var sfuncval = $(".sf_wrapper").find(".op_picker").val();
		
		var lablength = $(".sf_wrapper").find(".labels").children().length;
		console.log("OOxxxOO: " +lablength);
		
		var r = tfilterval;
		console.log("TT: " +count);
		
		console.log("LLL: " +sfuncval);
		
		if(count > 0){
			if(count+3 == lablength && sfunc != 0){
				b += "@" +sfuncval;
				d += "sgm1" +sfuncval;
				console.log("MM: " +b);
			}else{
				console.log("WWWW");
				b += "@" +bOp+";";
				d += "sgm1" +bOp+"sgmop";
			}
		}
		if(sfilter != 0){
			console.log("W1");

			console.log("sfil: " +sfilterval);
			if(ffilter == 1){
				var c = "", f="";
				if(sfilterval == 1 || sfilterval == 2){
					if(r != null){
						for(var i=0; i < r.length; i++){
							c += r[i] + "/";
							f += r[i] + "/";
						}
						c = c.substring(0, c.length-1);
						
						f = f.substring(0, f.length-1);
						d = f.replace("/", "sgm4");
					}
				}else{
					c = tfilterval;
					f = tfilterval;
				}
				b += ffilter+"="+eventlistval+"&"+sfilterval+":"+attrlistval+","+c;
				d += ffilter+"sgmeq"+eventlistval+"sgm5"+sfilterval+"sgm2"+attrlistval+"sgm3"+f;
				
				
			}else if(ffilter == 8){
				b += ffilter+"="+prangeval+":"+pnumval+"/"+pperiodval;
				d += ffilter+"sgmeq"+prangeval+"sgm2"+pnumval+"sgm4"+pperiodval;
			}else if(ffilter == 2){
				b+= ffilter + "=" + sfilterval +":" +tfilterval;	
				d+= ffilter + "sgmeq" + sfilterval +"sgm2" +tfilterval;	
				
			}else{
				var c = "", f="";
				//var r = tfilterval;
				if(sfilterval == 1 || sfilterval == 2){
					if(r != null){
						for(var i=0; i < r.length; i++){
							c += r[i] + "/";
							f += r[i] + "/";
						}
						c = c.substring(0, c.length-1);
						
						f = f.substring(0, f.length-1);
						f = f.replace("/", "sgm4");
					}
					
				}else{
					c = tfilterval;
					f = tfilterval;
				}
				
				b+= ffilter + "=" + sfilterval +":" +c;
				d+= ffilter + "sgmeq" + sfilterval +"sgm2" +f;
			}
		}else if(eventlist != 0){
			console.log("W2");
			
			var c = "", f="";
			var r = tfilterval;
			if(sfilterval == 1 || sfilterval == 2){
				for(var i=0; i < r.length; i++){
					c += r[i] + "/";
					f += r[i] + "/";
				}
				c = c.substring(0, c.length-1);
				
				f = f.substring(0, f.length-1);
				d = f.replace("/", "sgm4");
			}else{
				c = tfilterval;
				c = c.substring(0, c.length-1);
				
				f = tfilterval;
				f = f.substring(0, f.length-1);
			}
			b += ffilter+"="+eventlistval+"&"+sfilterval+":"+attrlistval+","+c;
			b += ffilter+"="+eventlistval+"&"+sfilterval+":"+attrlistval+","+f;
		}else if(prange != 0){
			console.log("W3");
			b += ffilter+"="+prangeval+":"+pnumval+"/"+pperiodval
			d += ffilter+"sgmeq"+prangeval+"sgm2"+pnumval+"sgm4"+pperiodval
		}else if(numrange != 0){
			console.log("W4");
			if(numrangeval == 7){
				b += ffilter+"="+numrangeval+":"+$(".input_from").val() + "/" +$(".input_to").val();
				d += ffilter+"sgmeq"+numrangeval+"sgm2"+$(".input_from").val() + "sgm4" +$(".input_to").val();
			}else{
				b += ffilter + "=" + numrangeval + ":" + $(".input_from").val();
				d += ffilter + "sgmeq" + numrangeval + "sgm2" + $(".input_from").val();
			}
		}else if(boolsel != 0){
			console.log("W5");
			b += ffilter + "=" + boolselval;
			d += ffilter + "sgmeq" + boolselval;
		}else{
			console.log("W6");
			b += ffilter;
			d += ffilter;
		}
		count ++;
		
		
		
	});

	console.log("xxxx " +b);
	console.log("SSSS " +d);
	//var strep = b.replace("@" , "sgm1").replace(";" , "sgmop").replace(":" , "sgm2").replace("," , "sgm3").replace("/" , "sgm4").replace("=" , "sgmeq").replace("&" , "sgm5");
	 
	
}


function loadTable(){
	resp = [{"eventName": "Buy Item", "day1": "0", "day2": "0", "day3": "0", "day4": "0"}];
	var data = [];
	
	for(var i = 0; i < resp.length; i++){
		data.push([resp[i].eventName,resp[i].day1,resp[i].day2,resp[i].day3,resp[i].day4]);
	}
	
	$("#s_table_div").empty(); 
	$("#s_table_div").html("Loading...");
	
	setTimeout(function(){   
	  $("#s_table_div").html('<table id="s_table" class="bordered-table dataTable"></table>');
	  $('#s_table').dataTable({
		"bJQueryUI":true,
		"sPaginationType": "full_numbers",
		"aaData": data,
		"aoColumns": [                                              
			{ "sTitle": "Event" },
			{ "sTitle": "Mon 12AM"},
			{ "sTitle": "Sun 12AM"},
			{ "sTitle": "Sat 12AM"},
			{ "sTitle": "Fri 12AM"},
		],  
		"bLengthChange": false,
		"bPaginate": false,
		"bFilter":false
	  });   
	  $(".ui-corner-bl").append('<button type="button" class="btn btn-white" style="float: right; position: relative; bottom: 10px"><i class="fa fa-download" style="padding-right: 10px"></i>EXPORT CSV</button>');
	},1000);
} 

function drawchart(type){
	chartOptions = {
		chart:{
		    renderTo: "container",
		    marginTop: 40,
		    type: type
		},
		title: {
			text: '',
			x: -20 //center
		},
		legend: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		subtitle: {
		    text: '',
		    x: -20
		},
		xAxis: {
			gridLineWidth: 1,
		    type: 'datetime',
		    dateTimeLabelFormats: {
		    	//day: "%m/%e %I%P"
		    	day: "%b %e"
		    }
		},
		yAxis: {
			title: {
				text: ''
			},
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
					}]
		},
		series: [{
			name: null,        
		}]
	};
}

function loadActionChart(type){   
    drawchart(type);

    $("#from").val("2014-02-01");
    $("#to").val("2014-02-05");

    var actionResp = jQuery.parseJSON(decodeURIComponent('{"dates":["2013-12-01","2013-12-02","2013-12-03","2013-12-04","2013-12-05","2013-12-06","2013-12-07","2013-12-08","2013-12-09","2013-12-10","2013-12-11","2013-12-12","2013-12-13","2013-12-14","2013-12-15","2013-12-16","2013-12-17","2013-12-18","2013-12-19","2013-12-20","2013-12-21","2013-12-22","2013-12-23","2013-12-24","2013-12-25","2013-12-26","2013-12-27","2013-12-28","2013-12-29","2013-12-30","2013-12-31"],"numberAction":["420","7450","4230","6630","870","7670","8700","350","900","0","350","540","870","980","3540","830","9780","30","460","890","340","760","670","340","740","640","440","730","820","670","870"]}'));
    var _data = [];
    for(var j=0; j < actionResp.dates.length; j++){
    	var x = actionResp.dates[j].split("-");
    	var availDate = Date.UTC(parseInt(x[0], "10"),parseInt(x[1], "10")-1,parseInt(x[2], "10")); 
    	_data.push( [ availDate, parseInt(actionResp.numberAction[j]) ]);
    }

    chartOptions.series[0].data = _data;      
    action_chart = new Highcharts.Chart(chartOptions);
} 

function reloadView(){
	loadTable();
    loadActionChart("column");
}
