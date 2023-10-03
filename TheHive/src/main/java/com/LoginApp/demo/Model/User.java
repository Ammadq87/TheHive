package com.LoginApp.demo.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @Column(name = "userID")
    private Long userID;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @JsonProperty("firstName")
    @Column(name = "firstName")
    private String firstName;

    @JsonProperty("lastName")
    @Column(name = "lastName")
    private String lastName;

    @Column(name = "organizationID")
    @JsonProperty("organizationID")
    private Long organizationID;

    @Column(nullable = true, name="teamID")
    private Long teamID;

    @Column(nullable = true, name = "role")
    private String role;

    @Column(nullable = true, name = "description")
    private String description;

    @Column(name = "isManager")
    private Boolean isManager = false;

    @Column(name = "CanCreate")
    private Boolean CanCreate = true;

    @Column(name = "CanRead")
    private Boolean CanRead = true;

    @Column(name = "CanUpdate")
    private Boolean CanUpdate = false;

    @Column(name = "CanDelete")
    private Boolean CanDelete = false;

    public User(Long userID, String email, String password, String firstName, String lastName, Long organizationID, Long teamID, String role, String description, Boolean isManager, Boolean canCreate, Boolean canRead, Boolean canUpdate, Boolean canDelete) {
        this.userID = userID;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.organizationID = organizationID;
        this.teamID = teamID;
        this.role = role;
        this.description = description;
        this.isManager = isManager;
        CanCreate = canCreate;
        CanRead = canRead;
        CanUpdate = canUpdate;
        CanDelete = canDelete;
    }

    public User(Long userID, String email, String password, String firstName, String lastName, Long organizationID, Long teamID) {
        this.userID = userID;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.organizationID = organizationID;
        this.teamID = teamID;
    }

    public User(){}

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getManager() {
        return isManager;
    }

    public void setManager(Boolean manager) {
        isManager = manager;
    }

    public Boolean getCanCreate() {
        return CanCreate;
    }

    public void setCanCreate(Boolean canCreate) {
        CanCreate = canCreate;
    }

    public Boolean getCanRead() {
        return CanRead;
    }

    public void setCanRead(Boolean canRead) {
        CanRead = canRead;
    }

    public Boolean getCanUpdate() {
        return CanUpdate;
    }

    public void setCanUpdate(Boolean canUpdate) {
        CanUpdate = canUpdate;
    }

    public Boolean getCanDelete() {
        return CanDelete;
    }

    public void setCanDelete(Boolean canDelete) {
        CanDelete = canDelete;
    }

    @Override
    public String toString() {
        return "User{" +
                "userID=" + userID +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", organizationID=" + organizationID +
                ", teamID=" + teamID +
                ", role='" + role + '\'' +
                ", description='" + description + '\'' +
                ", isManager=" + isManager +
                ", CanCreate=" + CanCreate +
                ", CanRead=" + CanRead +
                ", CanUpdate=" + CanUpdate +
                ", CanDelete=" + CanDelete +
                '}';
    }
}
