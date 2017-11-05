<%
    session.removeAttribute("loginUser");
    response.sendRedirect("index.jsp");
%>    