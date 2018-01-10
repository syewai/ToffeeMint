/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.api_demo.model.User;
import com.api_demo.model.UserDAO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Jiang Huiwen
 */
@WebServlet(name = "UserServlet", urlPatterns = {"/UserServlet"})
public class UserServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Map<String, Object> toReturn = new HashMap<String, Object>();
        String type = request.getParameter("type");
        
        if(type != null)    {
            if (type.equals("create")) {
                String username = request.getParameter("username");
                String password = request.getParameter("password");
                String firstName = request.getParameter("firstName");
                String lastName = request.getParameter("lastName");
                String userType = request.getParameter("userType");
                String pwHash = UserDAO.generateHash(password);

                //System.out.println("crating user with " + username);

                UserDAO u = new UserDAO();
                u.createUser(username, firstName, lastName, userType, pwHash, "");
                toReturn.put("success", "success");
                write(response, toReturn);
            } else if (type.equals("login")) {
                String username = request.getParameter("username");
                String password = request.getParameter("password");
                String usertype = request.getParameter("usertype");
                System.out.println(username+" "+password+" "+usertype);
                UserDAO uDAO = new UserDAO();
                Boolean login = uDAO.login(username, password, usertype);

                if (login) {
                    User user = uDAO.retrieve(username);
                    HttpSession session = request.getSession();
                    session.setAttribute("loginUser", user);
                    Date date = new Date();
                    String timestamp = String.valueOf(date.getTime() / 1000);
                    //uDAO.updateTimestampByUsername(username, timestamp);
                }

                toReturn.put("success", login);
                write(response, toReturn);
            } else if (type.equals("retrieveUser")) {
                try {
                    /* TODO output your page here. You may use following sample code. */
                    UserDAO userDAO = new UserDAO();
                    ArrayList<String> list = userDAO.retrieveUserInfo();
                    String output = "";
                    for (String s : list) {
                        output += s + ",";
                    }

                    String json = "";
                    //   System.out.println("json" + json);
                    if (output.length() > 0 && output.charAt(output.length() - 1) == ',') {
                        json = output.substring(0, output.length() - 1);
                    }

                    response.getWriter().write(json);

                } finally {
                    //  out.close();
                }
            } else if (type.equals("deleteUser")) {
                JSONObject transJsonObj = new JSONObject();
                try {
                    transJsonObj = new JSONObject(request.getReader().readLine());

                } catch (Exception e) {
                    e.printStackTrace();
                }

                String username = "";

                try {
                    username = transJsonObj.getString("username");

                    UserDAO uDAO = new UserDAO();
                    uDAO.deleteUser(username);

                    response.getWriter().write("updated user");
                } catch (JSONException ex) {
                    //Logger.getLogger(admincontrol.class.getName()).log(Level.SEVERE, null, ex);
                }

                //System.out.println(transJsonObj);      
            } else if (type.equals("updateUser")) {

                String username = "";
                String firstname = "";
                String lastname = "";
                String usertype = "";
                String password = "";   

                try {                        
                    username = request.getParameter("username");
                    firstname = request.getParameter("firstname");
                    lastname = request.getParameter("lastname");
                    usertype = request.getParameter("usertype");
                    password = request.getParameter("password");            

                    UserDAO uDAO = new UserDAO();
                    if (password != null && !password.trim().equals("")) {                    
                        String pwHash = UserDAO.generateHash(password);
                        uDAO.updateUserWithNewPw(username, firstname, lastname, usertype, pwHash);
                    } else {
                        uDAO.updateUser(username, firstname, lastname, usertype);
                    }
                    response.getWriter().write("updated user");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        
    }
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        /*
        response.setContentType("application/json");
        
        JSONObject returnObj = new JSONObject();
        ReferenceDataDAO ref_data_mgr = new ReferenceDataDAO();
        PrintWriter out = response.getWriter();
        Gson gson = new GsonBuilder().disableHtmlEscaping().setPrettyPrinting().create();
        BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
        
        UserDAO user_data_mgr = new UserDAO();
        
        try {
            String json = "";
        
            if(br != null){
                json = br.readLine();
            }
            
            JSONObject jsonObj = new JSONObject(json);
            Iterator it = jsonObj.keys();
            
            // create hashmap to store results
            HashMap<String, String> user = new HashMap<String, String>();

            while(it.hasNext()) {
                String key = (String)it.next();
                Object o = jsonObj.get(key);
                user.put(key, (String)o);
            }
            
            String username = user.get("username");
            String password = user.get("password");
            String first_name = user.get("firstName");
            String last_name = user.get("lastName");
            String user_type = user.get("userType");
            String timestamp = "";
            
            user_data_mgr.createUser(username, first_name, last_name, user_type, password, timestamp);            
            returnObj.put("status", "success");
            returnObj.put("message", "affinity successfully added");
            
        } catch(Exception e)    {
            e.printStackTrace();
        } finally   {
            out.println(gson.toJson(returnObj));
        }
        */
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    private void write(HttpServletResponse response, Map<String, Object> map) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new Gson().toJson(map));
    }
}
