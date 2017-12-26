
<%   
    String userName = request.getParameter("username");
    String password = request.getParameter("password");
    
    User u = UserDAO.getUserByUsername(username, password);
    if(username!=null&&password!=null){
        if(username.equals("importer")&&(password.equals("importerPassword"))){
            u = new User("importer",1);
            session.setAttribute("importer",u);
            
        }else if(username.equals("exporter")&&(password.equals("exporterPassword"))){
            u = new User("exporter",2);
            session.setAttribute("exporter",u);
            
        }else{
        out.print("Wrong username or password");
        }
    }
%>

