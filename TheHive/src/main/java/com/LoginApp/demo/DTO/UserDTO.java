package com.LoginApp.demo.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.Transient;

public class UserDTO {

    @Transient
    private Long userID;
    @Transient
    private String email;
    @Transient
    private String password;
    @Transient
    private String firstName;
    @Transient
    private String lastName;
    @Transient
    private String role;
    @Transient
    private String description;
    @Transient
    private Boolean canCreate;
    @Transient
    private Boolean canRead;
    @Transient
    private Boolean canUpdate;
    @Transient
    private Boolean canDelete;
    @Transient
    private Long organizationID;
    @Transient
    private String organizationName;
    @Transient
    private Long teamID;
    @Transient
    private String teamName;
    @Transient
    private Long managerID;
    @Transient
    private String managerName;
    @Transient
    private String managerEmail;

    public UserDTO(Long userID, String email, String password, String firstName, String lastName, String role, String description, Boolean canCreate, Boolean canRead, Boolean canUpdate, Boolean canDelete, Long organizationID, String organizationName, Long teamID, String teamName, Long managerID, String managerName, String managerEmail) {
        this.userID = userID;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.description = description;
        this.canCreate = canCreate;
        this.canRead = canRead;
        this.canUpdate = canUpdate;
        this.canDelete = canDelete;
        this.organizationID = organizationID;
        this.organizationName = organizationName;
        this.teamID = teamID;
        this.teamName = teamName;
        this.managerID = managerID;
        this.managerName = managerName;
        this.managerEmail = managerEmail;
    }

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

    public Boolean getCanCreate() {
        return canCreate;
    }

    public void setCanCreate(Boolean canCreate) {
        this.canCreate = canCreate;
    }

    public Boolean getCanRead() {
        return canRead;
    }

    public void setCanRead(Boolean canRead) {
        this.canRead = canRead;
    }

    public Boolean getCanUpdate() {
        return canUpdate;
    }

    public void setCanUpdate(Boolean canUpdate) {
        this.canUpdate = canUpdate;
    }

    public Boolean getCanDelete() {
        return canDelete;
    }

    public void setCanDelete(Boolean canDelete) {
        this.canDelete = canDelete;
    }

    public Long getOrganizationID() {
        return organizationID;
    }

    public void setOrganizationID(Long organizationID) {
        this.organizationID = organizationID;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public Long getTeamID() {
        return teamID;
    }

    public void setTeamID(Long teamID) {
        this.teamID = teamID;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Long getManagerID() {
        return managerID;
    }

    public void setManagerID(Long managerID) {
        this.managerID = managerID;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getManagerEmail() {
        return managerEmail;
    }

    public void setManagerEmail(String managerEmail) {
        this.managerEmail = managerEmail;
    }
}
