<%@include file="protect.jsp"%>
<%@page import="com.api_demo.model.User"%>

<head>
    <link href="assets/css/dashboard.css" rel="stylesheet">
</head>

<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container-fluid" style="padding-left: 0px">
        <div class="navbar-header">
            <a  href="home.jsp" style="color: #1a2155; text-decoration: none; font-size: 18px"><img alt="Brand" src="assets/img/logo_tbank_alt.png"> API Demo</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">                
                <li><p class="navbar-text">Welcome<% if (loginUser != null) {
                        out.println(", " + loginUser.getFullName());
                    } %></p></li>
                <li>&nbsp;&nbsp;</li>
                    <%
                        if (usertype.equals("API Admin") || usertype.equals("Super Admin")) {
                    %>
                <li>
                    <button type="button" class="btn btn-primary btn-xs navbar-btn loadPage" id="admin_control">
                        <span class="glyphicon glyphicon-cog" aria-hidden="true"></span> Admin Control
                    </button>
                </li>
                <li>&nbsp;&nbsp;</li>
                    <%
                        }
                    %>
                <li>
                <li>
                    <% if (loginUser != null) {%>
                    <button type="button" class="btn btn-primary btn-xs navbar-btn" id="logout">
                        Logout
                    </button>
                    <% } else { %>
                    <button type="button" class="btn btn-primary btn-xs navbar-btn" id="showloginModal" data-toggle="modal" data-target="#loginModal">
                        Login
                    </button>
                    <% }%>
                </li>
            </ul>
        </div>
    </div>
</nav>

<!--Login-->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 id="myModalLabel">Login</h4>
            </div>
            <div class="modal-body">
                <form id="loginForm" class="form-horizontal well" style="padding-bottom: 0px;">
                    <input id="type" type="hidden" class="form-control" name="type" value="login"/>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">Username</label>
                        <div class="col-sm-7">
                            <input id="username" type="text" class="form-control" name="username"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label">Password</label>
                        <div class="col-sm-7">
                            <input id="password" type="password" class="form-control" name="password"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-4 control-label"> </label>
                        <div class="col-sm-7">
                            <button id="loginButton" type="button" class="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- error modal
    ======================================== -->
<div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-danger">
                <h2>Error</h2>
            </div>
            <div class="modal-body">
                <p id = "errorMsg">
                </p>
            </div>
            <div class="modal-footer">
                <button id="CloseError" type="button" class="btn btn-danger"  data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>


<!-- javascript
    ======================================== -->
<script type="text/javascript" src="assets/js/jquery-1.11.1.min.js"></script>
<script src="assets/js/jquery.min.js"></script>
<script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
<script type="text/javascript" src="assets/js/jquery-ui.min.js"></script>

<script>
 
    $(document).ready(function() {              
        
        $("body").on("click", "#logout", function() {
            location.assign('logout.jsp');            
        });

        function showErrorModal(errorMessage) {
            document.getElementById("errorMsg").innerHTML = errorMessage;
            $('#errorModal').modal('show');
        }

    });

</script>