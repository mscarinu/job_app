<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<title>SOGAMO DASHBOARD</title>
	<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<meta content="" name="description" />
	<meta content="" name="author" />

	<!-- NEED TO WORK ON -->

	<link href="assets/plugins/pace/pace-theme-flash.css" rel="stylesheet" type="text/css" media="screen"/>
	<link href="assets/plugins/jquery-slider/css/jquery.sidr.light.css" rel="stylesheet" type="text/css" media="screen"/>
	<link href="assets/plugins/bootstrapv3/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="assets/plugins/bootstrapv3/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css"/>
	<link href="assets/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css"/>
	<link href="assets/plugins/data-tables/jquery.dataTables.css" rel="stylesheet" type="text/css"/>
	<link href="assets/plugins/bootstrap-select/bootstrap-select.min.css" rel="stylesheet" type="text/css" media="screen"/>
	<link href="assets/css/animate.min.css" rel="stylesheet" type="text/css"/>
	<link href="assets/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="assets/css/sgm-responsive.css" rel="stylesheet" type="text/css"/>
	<link href="assets/css/custom-icon-set.css" rel="stylesheet" type="text/css"/>
	<link href="assets/css/sgm-style.css" rel="stylesheet" type="text/css"/>
	<link href="assets/css/segmentation.css" rel="stylesheet" type="text/css"/>
	<!-- END NEED TO WORK ON -->
	
</head>

<body class="">
	
<!-- BEGIN CONTENT -->
<jsp:include page='common/header.jsp' />
  
<div class="page-container row-fluid">
	
<jsp:include page='common/menu.jsp' />	
	
	<div class="page-content"> 
		      <div class="content">  
        <div class="page-title">  <!--<h3>Content Here</h3> --></div>    

        <!--BEGIN FILTER  -->
        <div class="row-fluid">
          <div class="span12"  style="min-width: 1024px">
            <div class="grid simple ">
              <div class="grid-title" style="background-color: #eff1f6; height: 35px">
                <!--<h4><span class="semi-bold">Message List</span></h4>-->

                <div style="width: 200px; display: inline-block">
                  <select name="gameFilter" class="game_filter" data-live-search="true" data-width="auto">
                    <option>Candy Crash</option>
                    <option>Flappy Bird</option>
                  </select>
                </div>


                <div id="bookmark_picker" style="position: relative; bottom: 5px; float: right">
                  <div style="display: inline-block" class="bookmarks_dropdown_widget">
                    <div class="bookmarks_dropdown_widget_head">
                      <button type="button" class="btn btn-white dropdown-toggle" id="show_bookmarks"  data-toggle="popover" data-original-title="Your Bookmarks" style="position: relative; left: 6px"><i class="fa fa-bookmark" style="padding-right: 10px;"></i>Bookmarks</button>
                    </div>
                    <div class="bookmarks_dropdown_widget_body">
                      <div id="show_bookmark_popup" style="display:none">
                        <div class="items_container">      
                                          
                          <div class="bookmark_menu_item">
                              <div class="remove-bookmark" style="float: right">x</div>
                              <div class="bookmark_details" id="bookmark_43244242">
                                <div class="name">Buy Item by Country</div>
                                <div class="creator">John Doe</div>
                              </div>

                          </div>
                          <div class="bookmark_menu_item">
                              <div class="remove-bookmark" style="float: right">x</div>
                              <div class="bookmark_details" id="bookmark_525233">
                                <div class="name">Sign In by Country and Browser</div>
                                <div class="creator">Jane Doe</div>
                              </div>

                          </div>
                        </div>        
                      </div> 


                    </div>

                  </div>   
                  <div style="display: inline-block; right: 0; position: relative" class="bookmarks_add_widget">                    

                    <div style="display: inline-block" class="bookmarks_add_widget1">
	                    <div class="bookmarks_add_widget_head">
	                      <button type="button" class="btn btn-white dropdown-toggle " id="save_bookmark" data-toggle="popover" data-original-title=""><i class="fa fa-plus"></i></button>   
	                    </div>
	                    <div class="bookmarks_add_widget_body">
	                      <div id="save_bookmark_popup" style="display:none">
	                        <div>                          
	                          <input type="text" placeholder="Save new Bookmark as ..." id="bookmark_name">
	                          <button type="button" class="btn btn-primary btn-sm btn-small bookmark_save" onclick="saveBookmark()" style="margin: 5px; padding: 3px; 10px">SAVE</button>
	                        </div>        
	                      </div>
	                    </div>

                  </div>   
                </div>

              </div>
            </div>

              <div class="grid-body" style="padding: 0">
                <div class="sf_wrapper" style="display: block; padding: 25px">
                  <div class="labels">
                    <div class="grey_vert" style="display: none;"></div>
                    <div class="grey_horz" style="display: none;"></div>
                    <div class="operation">
                      <select class="selectpicker op_picker" id="jswidget_145469808" style="width: 90px; position: relative; z-index: 1">
                        <option value="by">BY</option>
                        <option value="avg">AVG</option>
                        <option value="sum">SUM</option>
                        <option value="max">MAX</option>
                        <option value="min">MIN</option>
                      </select>
                    </div>
                  </div>

                  <div class="rows">
                    <div id="jswidget_5228521081" class="property_filter">
                      <div class="property_dropdown filterable_dropdown" id="jswidget_497236259">
                        <!-- <select id="jswidget_883123686" onchange="showFilter(this.value, this.id)" class="first_filter" title="Property" style="width: 180px">-->
                       <!--  <select id="jswidget_883123686" onchange="showFilter(this.value, this.id)" class="first_filter" title="Property" data-width="auto" data-live-search="true">-->
                        <select id="jswidget_883123686" class="first_filter" title="Property" data-width="auto" data-live-search="true">
                          <option data-hidden="true"></option>
                          <option value="1">Events</option>
                          <option value="2">City</option>
                          <option value="3">Country</option>
                          <option value="4">Phone Type</option>
                          <option value="5">Acquisition Source</option>
                          <option value="6">Operating System</option>
                          <!-- <option value="jswidget_007">Game</option> -->
                          <option value="7">Browser</option>
                          <option value="8">Time Period</option>
                        </select>
                      </div>


                      <div class="rule"></div>
                      <div class="delete_button icon_button delete" id="jswidget_495791901" onclick="removeThisRow(this.id)">
                        <!--  <div class="fa fa-times" style="font-weight: bold; padding-left: 10px; padding-top: 5px; font-size: 20px; cursor: pointer; color: #9B9595"></div>-->
                        <button class="btn delete_prop" type="button"><i class="fa fa-times"></i></button>
                        
                      </div>
                      <div class="typecast_dropdown icon_dropdown" id="jswidget_972575701">
                        <select style="width: 120px" class="datatype selectpicker" id="jswidget_68569839">
                          <option value="1">String</option>
                          <option value="2">Number</option>
                          <option value="3">True / False</option>
                          <option value="4">Date</option>
                        </select>
                      </div>
                      <div class="insert_row">
                         <i class="fa fa-plus-circle add-small-plus"></i><div class="line"></div>
                      </div>
                    </div>

                  </div>

                  <div class="new_row" style="display: none;">
                    <!-- <i class="fa fa-plus-circle" style="font-size: 30px; color: #499ECE" id="add-big-plus" onclick="addNewRow(1)"></i> -->
                    <div class="grey_vert" style="display: none;">
                        
                    </div>
                  </div>
                </div>

                <div class="sf_second_dimension" style="padding: 10px 25px; background: #f7f7f7; border-top: 1px solid #ddd; display: none">
                  
                   <div class="add_second_dimension" style="display: block;">                      
                        <button type="button" class="btn btn-white"  onclick="showSecondDimension(0)"><i class="fa fa-plus" style="padding-right: 10px; color: #3B82DD;"></i>Second Dimension</button>
                  </div>
                  <div class="pick_second_dimension" style="display: none;">
                    <div class="subseg_label">BY</div>
                    <div class="subsegment_row">
                      
                    </div>
                  </div>
                
                </div>

                <div class="grid-sf-footer" style="background-color: #eff1f6; padding: 25px; color: #6f7b8a;">
                 <!-- <div class="sf_second_dimension" style="display: none">
                  <div class="add_second_dimension"><div class="add_button add_copy"><div class="icon"></div> Second dimension</div></div><div class="pick_second_dimension" style="display:none;"><div class="subseg_label">By</div><div class="subsegment_row"></div></div>
                </div>  -->                
                  
                <button type="button" class="btn btn-success btn-sm btn-small" style="position: relative; top: -10px; float: right" onclick="reloadView()">SHOW</button>
                
              </div>
            </div>
          </div>
        </div>
        <!--END FILTER -->    

        <!--BEGIN SEGMENTATION CHART-->
        <div class="row-fluid">
          <div class="span12">
            <div class="grid simple ">
              <div class="grid-title" style="background-color: #eff1f6">
               
                <!--<div class="tools"> <a href="javascript:;" class="collapse"></a> <a href="#grid-config" data-toggle="modal" class="config"></a> <a href="javascript:;" class="reload"></a> <a href="javascript:;" class="remove"></a> </div>-->
                <div id="jswidget_284425542" style="display: inline-block">
                  <span class="field">
                    <input style="width: 110px" type="text" id="from" name="from" readonly="readonly">
                  </span>
                  <span style="padding-left: 8px"> - </span>
                  <span class="field" style="margin-left: 5px">
                    <input style="width: 110px" type="text" id="to" name="to" readonly="readonly">
                  </span>
                  <span>
                    <button type="button" class="btn btn-success btn-cons" style="margin-left: 10px" onclick="reloadView()">DONE</button>
                  </span>
                </div>
                <div id="jswidget_424242" style="display: inline-block; float: right">
                  <div style="width: 100px; display: inline-block">
                    <select name="timeInterval" id="timeInterval" class="selectpicker form-control dropdown_nosearch">
                      <option value="hour">Hour</option>
                      <option value="day">Day</option>
                      <option value="week">Week</option>
                      <option value="month">Month</option>
                    </select>
                  </div>
                  <div style="width: 100px; display: inline-block">
                    <select name="function_select" id="function_select" class="selectpicker form-control dropdown_nosearch" >
                      <option>Total</option>
                      <option>Unique</option>
                      <option>Average</option>
                    </select>
                  </div>
                  <div style="width: 100px; display: inline-block">
                    <select name="chart_select" id="chart_select" class="selectpicker form-control dropdown_nosearch" onclick="loadActionChart(this.value)">
                      <option value="line">Line</option>
                      <option value="pie">Pie</option>
                      <option value="column">Bar</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="grid-body ">
                <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
              </div>
            </div>
          </div>
        </div>
        <!--END SEGMENTATION CHART -->

        <!--BEGIN SEGMENTATION TABLE -->
        <div class="row-fluid">
          <div class="span12">
            <div class="grid simple ">
              <!--<div class="grid-title">
                <h4><span class="semi-bold"></span></h4>
                <div class="tools"> <a href="javascript:;" class="collapse"></a> <a href="#grid-config" data-toggle="modal" class="config"></a> <a href="javascript:;" class="reload"></a> <a href="javascript:;" class="remove"></a> </div>
              </div>-->
              <div class="grid-body" id="s_table_div">
                <table id="s_table" class="bordered-table dataTable"></table>
              </div>
            </div>
          </div>
        </div>
        <!--END SEGMENTATION TABLE  --> 
        
      
        
        
    
        	
        	
        
        
        
        
        
        

    </div>
  </div>
	</div>	
</div>
<!-- END CONTENT --> 

<!-- BEGIN CORE JS FRAMEWORK--> 
	<script src="assets/plugins/jquery-1.8.3.min.js" type="text/javascript"></script> 
	<script src="assets/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script> 
	<script src="assets/plugins/bootstrapv3/js/bootstrap.min.js" type="text/javascript"></script> 
	<script src="assets/plugins/breakpoints.js" type="text/javascript"></script> 
	<script src="assets/plugins/jquery-unveil/jquery.unveil.min.js" type="text/javascript"></script> 
	<script src="assets/plugins/jquery-block-ui/jqueryblockui.js" type="text/javascript"></script> 
<!-- END CORE JS FRAMEWORK --> 
<!-- BEGIN PAGE LEVEL JS --> 	
	<script src="assets/plugins/jquery-slider/jquery.sidr.min.js" type="text/javascript"></script> 	
	<script src="assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script> 
	<script src="assets/plugins/pace/pace.min.js" type="text/javascript"></script>  
	<script src="assets/plugins/jquery-numberAnimate/jquery.animateNumbers.js" type="text/javascript"></script>
	<script src="assets/plugins/data-tables/jquery.dataTables.js" type="text/javascript"></script>
	<script src="assets/plugins/hc/highcharts.js" type="text/javascript"></script>
	<script src="assets/plugins/bootstrap-select/bootstrap-select.js" type="text/javascript"></script>
	<script src="assets/js/segmentation.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS --> 	
	
<!-- BEGIN CORE TEMPLATE JS --> 
	<!--  <script src="assets/js/core.js" type="text/javascript"></script> -->
<!-- END CORE TEMPLATE JS --> 

</body>
</html>
