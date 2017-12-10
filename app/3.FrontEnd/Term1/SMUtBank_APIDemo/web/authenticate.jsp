<%@page import="com.api_demo.model.*"%>
<%@page import="java.util.*"%>
<%
    try{
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        //System.out.println(username + "," + password);

        UserDAO uDAO = new UserDAO();
        Boolean login = uDAO.login(username, password);

        if (login) {
            User user = uDAO.retrieve(username);
            session.setAttribute("loginUser", user);
            Date date = new Date();
            String timestamp = String.valueOf(date.getTime()/1000);
//            System.out.println(date.getTime()/1000);
            uDAO.updateTimestampByUsername(username, timestamp);
            response.sendRedirect("home.jsp");
        } else {
%>
<jsp:forward page="index.jsp">
    <jsp:param name="errorMsg" value="Invalid username/password" />
</jsp:forward>
<%
    }
    }catch(NullPointerException e) {
        %>
<jsp:forward page="index.jsp">
    <jsp:param name="errorMsg" value="Invalid username/password" />
</jsp:forward>
<%
    }

%>