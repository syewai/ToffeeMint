package com.api_demo.model;

import com.api_demo.connection.ConnectionFactory;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import com.api_demo.model.User;
//hash
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.*;
import java.util.Date;

public class UserDAO {

    ArrayList<User> lookupList;
    Connection conn = null;
    PreparedStatement pstate = null;
    ResultSet rs = null;

    public static final String SALT = "my-salt-text";

    public UserDAO() {

    }

    public User retrieve(String username) {
        try {
            conn = ConnectionFactory.getConnection("smu_core_services");
            pstate = conn.prepareStatement("SELECT username, password, firstname, lastname, usertype, lastLoginTimeStamp, id FROM user WHERE username = '" + username + "'");
            rs = pstate.executeQuery();
            while (rs.next()) {
                if (rs.getString(1) != null) {
                    User user = new User(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getInt(7));
                    return user;
                } else {
                    return null;
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionFactory.close(conn, pstate, rs);
        }

        return null;
    }

    public void createUser(String username, String firstname, String lastname, String usertype, String password, String lastLoginTimeStamp) {
        //  lookupList = new ArrayList<String>();
        try {
            conn = ConnectionFactory.getConnection("smu_core_services");
            pstate = conn.prepareStatement("INSERT INTO `user` (`username`, `password`, `firstname`, `lastname`, `usertype`, `lastLoginTimeStamp`) VALUES"
                    + "(?,?,?,?,?,?)");

            pstate.setString(1, username);
            pstate.setString(2, password);
            pstate.setString(3, firstname);
            pstate.setString(4, lastname);
            pstate.setString(5, usertype);
            pstate.setString(6, lastLoginTimeStamp);
            pstate.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                // rs.close();
                pstate.close();
                conn.close();
            } catch (SQLException ex) {

            }
        }
    }

    public void updateUser(String username, String firstname, String lastname, String usertype) {

        try {

            conn = ConnectionFactory.getConnection("smu_core_services");
            pstate = conn.prepareStatement("Update `user` SET `firstname`='" + firstname + "', `lastname`='" + lastname + "', `usertype`='" + usertype + "'  where `username` = '" + username + "'");
          
            pstate.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                //rs.close();
                pstate.close();
                conn.close();
            } catch (SQLException ex) {
                //Logger.getLogger(CompanyDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

    }
    
    public void updateUserWithNewPw(String username, String firstname, String lastname, String usertype, String password) {

        try {

            conn = ConnectionFactory.getConnection("smu_core_services");
             pstate = conn.prepareStatement("Update `user` SET `firstname`='" + firstname + "', `lastname`='" + lastname + "', `usertype`='" + usertype + "', `password` = '" + password + "'  where `username` = '" + username + "'");
             
            pstate.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                //rs.close();
                pstate.close();
                conn.close();
            } catch (SQLException ex) {
                //Logger.getLogger(CompanyDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

    }
    
    public void updateTimestampByUsername(String username, String lastLoginTimeStamp) {

        try {
//            System.out.println("login:" + lastLoginTimeStamp + username);
            conn = ConnectionFactory.getConnection("smu_core_services");
            pstate = conn.prepareStatement("UPDATE `user` SET `lastLoginTimeStamp` = ?"
                    + " where `username` = '" + username + "'");
            pstate.setString(1, lastLoginTimeStamp);
            pstate.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                //rs.close();
                pstate.close();
                conn.close();
            } catch (SQLException ex) {
                //Logger.getLogger(CompanyDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

    }
    
    public void deleteUser(String username) {
        try {

            conn = ConnectionFactory.getConnection("smu_core_services");
            pstate = conn.prepareStatement("DELETE FROM `user` WHERE `username`=?");
            pstate.setString(1, username);

            pstate.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                //rs.close();
                pstate.close();
                conn.close();
            } catch (SQLException ex) {
                Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

    }
    
    public ArrayList<String> retrieveUserInfo() {
        ArrayList<String> lookupStringList = new ArrayList<String>();
        try {
            conn = ConnectionFactory.getConnection("smu_core_services");
            String query = "SELECT * from user where usertype like 'API%';";
            pstate = conn.prepareStatement(query);
            rs = pstate.executeQuery();

            while (rs.next()) {
                lookupStringList.add(rs.getString(1));
                lookupStringList.add(rs.getString(3));
                lookupStringList.add(rs.getString(4));
                lookupStringList.add(rs.getString(5));
                String timestampStr = rs.getString(6);
                if (timestampStr== null || timestampStr.equals("N.A") || timestampStr.trim().equals("")) {
                    lookupStringList.add(rs.getString(6));
                } else {
                    long lastloginStr = Long.parseLong(timestampStr);
                    Date datetimestamp = new Date(lastloginStr*1000);
                    DateFormat df = new SimpleDateFormat("dd MMM yyyy HH:mm:ss z Z");
                    String timestamp = df.format(datetimestamp);
                    lookupStringList.add(timestamp);
                }
                
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstate.close();
                conn.close();
            } catch (SQLException ex) {
                Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return lookupStringList;
    }

    public ArrayList<User> retrieveAll() {
        lookupList = new ArrayList<User>();
        try {
            conn = ConnectionFactory.getConnection("smu_core_services");
            String query = "SELECT * from user where usertype = 'API' or usertype = 'API Admin';";
            pstate = conn.prepareStatement(query);
            rs = pstate.executeQuery();

            while (rs.next()) {
                lookupList.add(new User(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getInt(7)));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                rs.close();
                pstate.close();
                conn.close();
            } catch (SQLException ex) {
                Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return lookupList;
    }

    public Boolean login(String username, String password) {
        Boolean isAuthenticated = false;
        User user = retrieve(username);

        // remember to use the same SALT value use used while storing password
        // for the first time.
        String saltedPassword = password;
        String hashedPassword = generateHash(saltedPassword);
        if(user != null){
            String storedPasswordHash = user.getPassword();
            if (hashedPassword.equals(storedPasswordHash)) {
                isAuthenticated = true;
            } else {
                isAuthenticated = false;
            }
        }else {
            isAuthenticated = false;
        }
        return isAuthenticated;
    }

    public static String generateHash(String input) {
        StringBuilder hash = new StringBuilder();

        try {
            MessageDigest sha = MessageDigest.getInstance("SHA-1");
            byte[] hashedBytes = sha.digest(input.getBytes());
            char[] digits = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'a', 'b', 'c', 'd', 'e', 'f'};
            for (int idx = 0; idx < hashedBytes.length; idx++) {
                byte b = hashedBytes[idx];
                hash.append(digits[(b & 0xf0) >> 4]);
                hash.append(digits[b & 0x0f]);
            }
        } catch (NoSuchAlgorithmException e) {
            // handle error here.
        }

        return hash.toString();
    }

    public boolean retrieveBank(String bic) {
        String name = "";
        try {
            conn = ConnectionFactory.getConnection("soa_governance");
            pstate = conn.prepareStatement("SELECT Bank_Name FROM bank WHERE bic = '" + bic + "'");
            rs = pstate.executeQuery();

            while (rs.next()) {
                name = rs.getString("Bank_Name");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            ConnectionFactory.close(conn, pstate, rs);
        }

        if (name.equals("")) {
            return true;
        } else {
            return false;
        }
    }

}
