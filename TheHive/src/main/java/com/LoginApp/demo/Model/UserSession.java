package com.LoginApp.demo.Model;

// Singleton class to handle user session information
public class UserSession {

    private static UserSession instance;
    private User session;

    private UserSession() {}

    public static UserSession getInstance(){
        if (instance == null)
            instance = new UserSession();
        return instance;
    }

    public User getUser() {
        return this.session;
    }

    // Set to null when logging out
    public void setUser(User u) {
        this.session = u;
    }

}
