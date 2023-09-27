package com.LoginApp.demo.Model;

import jakarta.persistence.Transient;

import java.util.*;
// Data Transfer Object -- Used to transfer data from React form to Java
public class TeamDTO {
    @Transient
    private String team_name;
    @Transient
    private String description;

    @Transient
    private ArrayList<String> names;

    @Transient
    private ArrayList<User> members;

    public TeamDTO(String team_name, String description, ArrayList<String> names) {
        this.team_name = team_name;
        this.description = description;
        this.names = names;
    }

    public String getTeam_name() {
        return team_name;
    }

    public void setTeam_name(String team_name) {
        this.team_name = team_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ArrayList<String> getNames() {
        return names;
    }



    public void setNames(ArrayList<String> names) {
        this.names = names;
    }

    public ArrayList<User> getMembers() {
        return members;
    }

    public void setMembers(ArrayList<User> members) {
        this.members = members;
    }
}
