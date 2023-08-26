package com.LoginApp.demo.Model;

import jakarta.persistence.*;

@Entity
public class Organization {
    @Id
    @Column(name = "organizationID")
    private Long organizationID;

    @Column(name = "name")
    private String name;

    public Organization(Long organizationID, String name) {
        this.organizationID = organizationID;
        this.name = name;
    }

    public Organization(){}

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
}