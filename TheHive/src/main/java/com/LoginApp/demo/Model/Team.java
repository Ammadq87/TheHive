package com.LoginApp.demo.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.ArrayList;

@Entity
public class Team {
    @Id
    @Column(name = "teamID")
    private Long teamID;
    @Column(name = "organizationID")
    private Long organizationID;
    @Column(name = "name")
    @JsonProperty("team_name")
    private String name;

    @Column(name = "description")
    private String description;

    public Team() {

    }

    public Team(Long teamID, Long organizationID, String name, String description) {
        this.teamID = teamID;
        this.organizationID = organizationID;
        this.name = name;
        this.description = description;
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

    public ArrayList<String> getMembers() {
        return members;
    }

    public void setMembers(ArrayList<String> members) {
        this.members = members;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Team{" +
                "teamID=" + teamID +
                ", organizationID=" + organizationID +
                ", name='" + name + '\'' +
                '}';
    }
}
