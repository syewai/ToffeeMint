<%@include file="config.jsp"%>

<%@page import="java.util.*"%>
<%@page import="com.api_demo.model.*"%>
<%@page import="org.json.*"%>
<%@page import="java.net.*"%>
<%@page import="java.io.*"%>
<%@page import="java.text.SimpleDateFormat"%>  
<%@page import="java.util.Date"%>  
<%@page import="java.util.Collections"%> 

<%
    
   
    
// api url
		String apiServiceUrl = "http://smu.tbankonline.com/SMUtBank_API/Gateway";
//		String apiServiceUrl = "http://localhost:8080/SMUtBank_API/Gateway";
                JSONObject results = new JSONObject();
                JSONArray refNumArr = new JSONArray();
                JSONObject responseObj = null;

		try {		

			// build header
			JSONObject jo = new JSONObject();
			jo.put("serviceName", "getLetterOfCreditRefNumList");
			jo.put("userID", "kinetic1");
			jo.put("PIN", "123456");
			jo.put("OTP", "999999");
			JSONObject headerObj = new JSONObject();
			headerObj.put("Header", jo);
			String header = headerObj.toString();

			// connect to API service
			HttpURLConnection urlConnection = (HttpURLConnection) new URL(apiServiceUrl).openConnection();
			urlConnection.setDoOutput(true);
			urlConnection.setRequestMethod("POST");
			
			// build request parameters
			String parameters
				= "Header="+header+"&"
				+ "ConsumerID=TF";
			System.out.println(parameters);
			System.out.println();
			System.out.println();
				
			// send request
			BufferedWriter br = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream()));
			br.write(parameters);
			br.close();
			
			// get response
			String response1 = "";
			Scanner s = new Scanner(urlConnection.getInputStream());
			while (s.hasNextLine()){
				response1 += s.nextLine();
			}
			s.close();
			
			// get response object
			responseObj = new JSONObject(response1);
			System.out.println(responseObj.toString(4)); // indent 4 spaces
                       
			//System.out.println(refNumListSize);
                        

		}
		catch(Exception e) {e.printStackTrace(System.out);}
                
                

%>


<!DOCTYPE html>
<html lang="en" class="app">
    <head>
        <meta charset="utf-8" />
        <title>SMU tBank - Trade Finance Application</title>
        <meta name="description" content="app, web app, responsive, admin dashboard, admin, flat, flat ui, ui kit, off screen nav" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="stylesheet" href="assets/css/bootstrap.css" type="text/css" />
        <link rel="stylesheet" href="assets/css/animate.css" type="text/css" />
        <link rel="stylesheet" href="assets/css/font-awesome.min.css" type="text/css" />
        <link rel="stylesheet" href="assets/css/font.css" type="text/css" />
        <link rel="stylesheet" href="assets/js/calendar/bootstrap_calendar.css" type="text/css" />
        <link rel="stylesheet" href="assets/js/jvectormap/jquery-jvectormap-1.2.2.css" type="text/css" />
        <link rel="stylesheet" href="assets/css/app.css" type="text/css" />
        <!--[if lt IE 9]>
        <script src="assets/js/ie/html5shiv.js"></script>
        <script src="assets/js/ie/respond.min.js"></script>
        <script src="assets/js/ie/excanvas.js"></script>
      <![endif]-->
    </head>

    <body class="">
        <section class="vbox">
            <header class="bg-black dk header navbar navbar-fixed-top-xs">
                <!--Logo-->
                <div class="navbar-header aside-md">
                    <a class="btn btn-link visible-xs" data-toggle="class:nav-off-screen,open" data-target="#nav,html">
                        <i class="fa fa-bars"></i>
                    </a>
                    <a href="#" class="navbar-brand" data-toggle="fullscreen"><img src="assets/images/logo.png" class="m-r-sm">SMU tBank</a>
                    <a class="btn btn-link visible-xs" data-toggle="dropdown" data-target=".nav-user">
                        <i class="fa fa-cog"></i>
                    </a>
                </div>
                <!--End of Logo-->

                <ul class="nav navbar-nav navbar-right m-n hidden-xs nav-user">
                    <!--Notification-->
                    <li class="hidden-xs">
                        <a href="#" class="dropdown-toggle dk" data-toggle="dropdown">
                            <i class="fa fa-bell"></i>
                            <span class="badge badge-sm up bg-danger m-l-n-sm count">2</span>
                        </a>

                        <section class="dropdown-menu aside-xl">
                            <section class="panel bg-white">
                                <header class="panel-heading b-light bg-light">
                                    <strong>You have <span class="count">2</span> notifications</strong>
                                </header>
                                <div class="list-group list-group-alt animated fadeInRight">
                                    <a href="#" class="media list-group-item">
                                        <span class="pull-left thumb-sm">
                                            <img src="assets/images/avatar.jpg" alt="John said" class="img-circle">
                                        </span>
                                        <span class="media-body block m-b-none">
                                            Use awesome animate.css<br>
                                            <small class="text-muted">10 minutes ago</small>
                                        </span>
                                    </a>
                                    <a href="#" class="media list-group-item">
                                        <span class="media-body block m-b-none">
                                            1.0 initial released<br>
                                            <small class="text-muted">1 hour ago</small>
                                        </span>
                                    </a>
                                </div>
                                <footer class="panel-footer text-sm">
                                    <a href="#" class="pull-right"><i class="fa fa-cog"></i></a>
                                    <a href="#notes" data-toggle="class:show animated fadeInRight">See all the notifications</a>
                                </footer>
                            </section>
                        </section>
                    </li>
                    <!--End of Notification-->

                    <!--User Info-->
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <span class="thumb-sm avatar pull-left">
                                <img src="images/avatar.jpg">
                            </span> John.Smith <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu animated fadeInRight">
                            <span class="arrow top"></span>
                            <li>
                                <a href="modal.lockme.html" data-toggle="ajaxModal">Logout</a>
                            </li>
                        </ul>
                    </li>
                    <!--End of User Info-->
                </ul>
            </header>
            <section>
                <section class="hbox stretch">
                    <!-- .aside -->
                    <aside class="bg-dark lter aside-md hidden-print hidden-xs" id="nav">
                        <section class="vbox">

                            <section class="w-f scrollable">
                                <div class="slim-scroll" data-height="auto" data-disable-fade-out="true" data-distance="0" data-size="5px" data-color="#333333">

                                    <!-- nav -->
                                    <nav class="nav-primary hidden-xs">
                                        <ul class="nav">
                                            <li class="active">
                                                <a href="#">
                                                    <i class="fa fa-dashboard icon">
                                                        <b class="bg-danger"></b>
                                                    </i>
                                                    <span>Home</span>
                                                </a>
                                            </li>

                                            <li>
                                                <a href="#layout">
                                                    <i class="fa fa-file-text icon">
                                                        <b class="bg-warning"></b>
                                                    </i>
                                                    <span class="pull-right">
                                                        <i class="fa fa-angle-down text"></i>
                                                        <i class="fa fa-angle-up text-active"></i>
                                                    </span>
                                                    <span>Letter of Credits</span>
                                                </a>
                                                <ul class="nav lt">
                                                    <li>
                                                        <a href="applyLc.jsp">
                                                            <i class="fa fa-angle-right"></i>
                                                            <span>Apply LC</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="importerViewLcLog.jsp">
                                                            <i class="fa fa-angle-right"></i>
                                                            <span>View LC Log</span>
                                                        </a>
                                                    </li>

                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                    <!-- / nav -->
                                </div>
                            </section>

                            <footer class="footer lt hidden-xs b-t b-dark">
                                <a href="#nav" data-toggle="class:nav-xs" class="pull-right btn btn-sm btn-dark btn-icon">
                                    <i class="fa fa-angle-left text"></i>
                                    <i class="fa fa-angle-right text-active"></i>
                                </a>

                            </footer>
                        </section>
                    </aside>
                    <!-- /.aside -->
                    <!--Content-->
                    <section id="content">
                        <section class="vbox">
                            <section class="scrollable">
                                <div class="wrapper-lg">
                                    <h2 class="m-b-xs font-bold m-t-none">Welcome back, John</h2>
                                    <h4 class="text-primary font-bold">Importer</h4>
                                </div>

                                <!--LC Table-->
                                <section class="panel panel-default">
                                    <header class="panel-heading wrapper-lg">
                                        <h4 class="font-bold">Incomplete LC</h4>
                                    </header>
                                    
                                   <% 
                                         results = responseObj.getJSONObject("RefNumList");
                                         refNumArr = results.getJSONArray("RefNum");
                                         
                                         int refNumListSize = refNumArr.length();
                                          
                                         if( refNumListSize > 0 ) {
                                    
                                    %>
                                    <div class="table-responsive wrapper-lg">
                                        
                                        <table class="table table-striped b-t b-light" id="lcTable">
                                            <thead>
                                                <tr>
                                                    <th>Reference Number</th>
                                                    <th>Exporter</th>
                                                    <th>Date Submitted</th>
                                                    <th>Status</th>
                                                    <th></th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <%
                                                List<String> refList = new ArrayList<String>();
                                                for (int i = 0; i < refNumListSize; i++) {
                                                    String ref = (String) refNumArr.get(i);
                                                    refList.add(ref);
                                                }
                                                    
                                                Collections.sort(refList);
                                                System.out.println(refList);
                                                
                                                for (int i = refNumListSize-1; i >= refNumListSize-5; i--){
                                                    String refNum = (String)refList.get(i);
                                                    JSONObject responseObj2 = new JSONObject();
                                                    JSONObject tradeLC = new JSONObject();
                                                    String exporterId = "";
                                                    String dateTimeSubmitted = "";
                                                    String dateSubmitted = "";
                                                    
                                                    String status = "";
                                                        
                                                    //Get LC by parsing reference number
                                                    try {		
                                                        // build header
                                                        JSONObject jo = new JSONObject();
                                                        jo.put("serviceName", "getLetterOfCredit");
                                                        jo.put("userID", "kinetic1");
                                                        jo.put("PIN", "123456");
                                                        jo.put("OTP", "999999");
                                                        JSONObject headerObj = new JSONObject();
                                                        headerObj.put("Header", jo);
                                                        String header = headerObj.toString();

                                                        // build content
                                                        jo = new JSONObject();
                                                        jo.put("referenceNumber", refNum);
                                                        jo.put("mode", "BC"); // BC or DB
                                                        JSONObject contentObj = new JSONObject();
                                                        contentObj.put("Content", jo);
                                                        String content = contentObj.toString();
                                                        //System.out.println(refNum);
                                                        // connect to API service
                                                        HttpURLConnection urlConnection = (HttpURLConnection) new URL(apiServiceUrl).openConnection();
                                                        urlConnection.setDoOutput(true);
                                                        urlConnection.setRequestMethod("POST");

                                                        // build request parameters
                                                        String parameters
                                                        = "Header="+header+"&"
                                                        + "Content="+content+"&"
                                                        + "ConsumerID=TF";

                                                        // send request
                                                        BufferedWriter br = new BufferedWriter(new OutputStreamWriter(urlConnection.getOutputStream()));
                                                        br.write(parameters);
                                                        br.close();

                                                        // get response
                                                        String response2 = "";
                                                        Scanner s = new Scanner(urlConnection.getInputStream());
                                                        while (s.hasNextLine()){
                                                        response2 += s.nextLine();
                                                        }
                                                        s.close();

                                                        // get response object
                                                        responseObj2 = new JSONObject(response2);
                                                        System.out.println(responseObj2.toString(4)); // indent 4 spaces


                                                        tradeLC = responseObj2.getJSONObject("Content").getJSONObject("ServiceResponse").getJSONObject("Trade_LC_Read-Response").getJSONObject("LC_record");
                                                        System.out.println(tradeLC);
                                                        
                                                        
                                                        
                                                        
                                                        exporterId = tradeLC.getString("exporter_ID");
                                                        
                                                        dateTimeSubmitted = tradeLC.getString("creation_datetime");
                                                        int delimiter = dateTimeSubmitted.indexOf(" ");
                                                        
                                                        if (delimiter != -1) {
                                                         dateSubmitted = dateTimeSubmitted.substring(0,delimiter);     
                                                        }

                                                        status = tradeLC.getString("status");


                                                            
                                                    }
                                                    catch(Exception e) {e.printStackTrace(System.out);}
                                                        
                                                        
                                                    

                                               %>
                                                <tr>

                                                    <td><%=refNum%></td>
                                                    <td><%=exporterId %></td>
                                                    <td><%=dateTimeSubmitted %></td>
                                                    <td class="text-danger font-bold">
                                                        </i><%=status %></td>
                                                    <td>
                                                        <a href="lcDetails.jsp" class="active btn btn-s-md btn-danger">View LC</a>
                                                    </td>
                                                </tr>
                                              
                                               <%
                                               }
                                               %>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    <footer class="panel-footer">
                                        <div class="row">
                                            <div class="col-sm-4 hidden-xs">

                                            </div>
                                            <div class="col-sm-4 text-center">
                                                <a href="importerViewLcLog.jsp" class="btn btn-s-md btn-dark">View All LC</a>
                                            </div>
                                            <div class="col-sm-4 text-right text-center-xs">

                                            </div>
                                        </div>
                                    </footer>
                                    <%
                                    }
                                    
                                    %>
                                  
                                </section>
                                <!--End of LC Table-->
                            </section>
                            <!--End of Scrollable-->
                        </section>
                        <!--End of vbox-->

                    </section>
                    <!--End of Content-->

                </section>
                <!--End of hbox stretch -->
            </section>

        </section>
        <!--End of Vbox-->

        <script src="assets/js/jquery.min.js"></script>
        <!-- Bootstrap -->
        <script src="assets/js/bootstrap.js"></script>
        <!-- App -->
        <script src="assets/js/app.js"></script>
        <script src="assets/js/slimscroll/jquery.slimscroll.min.js"></script>
        <script src="assets/js/charts/easypiechart/jquery.easy-pie-chart.js"></script>
        <script src="assets/js/charts/sparkline/jquery.sparkline.min.js"></script>
        <script src="assets/js/charts/flot/jquery.flot.min.js"></script>
        <script src="assets/js/charts/flot/jquery.flot.tooltip.min.js"></script>
        <script src="assets/js/charts/flot/jquery.flot.resize.js"></script>
        <script src="assets/js/charts/flot/jquery.flot.grow.js"></script>
        <script src="assets/js/charts/flot/demo.js"></script>

        <script src="assets/js/calendar/bootstrap_calendar.js"></script>
        <script src="assets/js/calendar/demo.js"></script>

        <script src="assets/js/sortable/jquery.sortable.js"></script>

        <script src="assets/js/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
        <script src="assets/js/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
        <script src="assets/js/jvectormap/demo.js"></script>
        <script src="assets/js/app.plugin.js"></script>
    </body>
</html>