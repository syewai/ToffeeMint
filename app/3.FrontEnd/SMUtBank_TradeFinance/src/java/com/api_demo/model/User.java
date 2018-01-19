/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.api_demo.model;

/**
 *
 * @author Charlene
 */
public class User {

    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private String usertype;
    private String lastLoginTimeStamp;
    private int ach_id;

    public User(String username, String password, String firstname, String lastname, String usertype, String lastLoginTimeStamp, int ach_id) {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.usertype = usertype;
        this.lastLoginTimeStamp = lastLoginTimeStamp;
        this.ach_id = ach_id;
    }
    
    public User(String username, String password, String firstname, String lastname, String usertype)   {
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.usertype = usertype;
    }
    public User(String username, String password, String usertype)   {
        this.username = username;
        this.password = password;
        this.usertype = usertype;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    
    public String getFullName(){
        return lastname + " " + firstname;
    }

    public String getUsertype() {
        return usertype;
    }

    public void setUsertype(String usertype) {
        this.usertype = usertype;
    }

    public String getLastLoginTimeStamp() {
        return lastLoginTimeStamp;
    }

    public void setLastLoginTimeStamp(String lastLoginTimeStamp) {
        this.lastLoginTimeStamp = lastLoginTimeStamp;
    }

    public int getAchId() {
        return ach_id;
    }

    public void setAchId(int ach_id) {
        this.ach_id = ach_id;
    }
   
    

    public boolean authenticate(String password) {
        return password.equals(this.password);
    } // authenticate

}
