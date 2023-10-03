package com.LoginApp.demo.Model;

import jakarta.persistence.*;

import java.util.*;

@Entity
public class Team {
    @Id
    @Column(name = "teamID")
    private Long teamID;
    @Column(name = "organizationID")
    private Long organizationID;
    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "Location", nullable = true)
    private String location = "Canada";

    @Column(name = "managerID")
    private Long managerID;

    @Transient
    private ArrayList<User> members;

    public Team() {

    }

    public Team(Long teamID, Long organizationID, String name, String description, String location, Long managerID) {
        this.teamID = teamID;
        this.organizationID = organizationID;
        this.name = name;
        this.description = description;
        this.location = location;
        this.managerID = managerID;
    }

    public Long getTeamID() {
        return teamID;
    }

    public void setTeamID(Long teamID) {
        this.teamID = teamID;
    }

    public Long getOrganizationID() {
        return organizationID;
    }

    public void setOrganizationID(Long organizationID) {
        this.organizationID = organizationID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ArrayList<User> getMembers() {
        return members;
    }

    public void setMembers(ArrayList<User> members) {
        this.members = members;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getManagerID() {
        return managerID;
    }

    public void setManagerID(Long managerID) {
        this.managerID = managerID;
    }

    @Override
    public String toString() {
        return "Team{" +
                "teamID=" + teamID +
                ", organizationID=" + organizationID +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", members=" + members +
                '}';
    }
}
