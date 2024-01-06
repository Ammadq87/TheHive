package com.LoginApp.demo.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

//@Entity
public class UsersInTeam {

    @Column(name = "organizationID")
    private Long organizationID;

    @Column(name = "teamID")
    private Long teamID;

    @Column(name = "userID")
    private Long userID;

    public UsersInTeam(){}

    public UsersInTeam(Long organizationID, Long teamID, Long userID) {
        this.organizationID = organizationID;
        this.teamID = teamID;
        this.userID = userID;
    }

    public Long getOrganizationID() {
        return organizationID;
    }

    public void setOrganizationID(Long organizationID) {
        this.organizationID = organizationID;
    }

    public Long getTeamID() {
        return teamID;
    }

    public void setTeamID(Long teamID) {
        this.teamID = teamID;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }
}
