package com.LoginApp.demo.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Spaces {

    @Column(name = "name")
    private String name;

    @Column(name = "adminID")
    private Long adminID;
    private User admin;

    @Id
    @Column(name = "spaceID")
    private Long spaceID;

    @Column(name = "organizationID")
    private Long organizationID;

    public Spaces(String name, Long adminID, Long spaceID, Long organizationID) {
        this.name = name;
        this.adminID = adminID;
        this.spaceID = spaceID;
        this.organizationID = organizationID;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAdminID(Long adminID) {
        this.adminID = adminID;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
    }

    public void setSpaceID(Long spaceID) {
        this.spaceID = spaceID;
    }

    public void setOrganizationID(Long organizationID) {
        this.organizationID = organizationID;
    }

    public String getName() {
        return name;
    }

    public Long getAdminID() {
        return adminID;
    }

    public User getAdmin() {
        return admin;
    }

    public Long getSpaceID() {
        return spaceID;
    }

    public Long getOrganizationID() {
        return organizationID;
    }

    @Override
    public String toString() {
        return "Spaces{" +
                "name='" + name + '\'' +
                ", adminID=" + adminID +
                ", admin=" + admin +
                ", spaceID=" + spaceID +
                ", organizationID=" + organizationID +
                '}';
    }
}
