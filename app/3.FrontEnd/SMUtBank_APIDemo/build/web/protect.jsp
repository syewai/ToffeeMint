<%@page import="com.api_demo.model.User"%>
<%
    User loginUser = null;
    String usertype = "API"; // default to client developer
  
        loginUser = (User) session.getAttribute("loginUser");
                
        if(loginUser != null) {
            usertype = loginUser.getUsertype(); // update type of usertype if user is logged in as another role (Admin or Client Developer)
        } else {            
            // only if page isn't "home.jsp"
            out.println("<script>var locationURL = String(window.location.href); if(locationURL.indexOf('home.jsp') == -1 || locationURL.indexOf('result) { location.assign('index.jsp') };</script>");
        }                            
%>