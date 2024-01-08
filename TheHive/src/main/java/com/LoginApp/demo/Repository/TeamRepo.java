package com.LoginApp.demo.Repository;

import com.LoginApp.demo.Model.Team;
import com.LoginApp.demo.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

public interface TeamRepo extends JpaRepository<Team, Long> {

    // Read
    @Query("SELECT COUNT(t) FROM Team t WHERE t.name = :name AND t.organizationID = :id")
    Long verifyTeamName(@Param("name") String name, @Param("id") Long id);
    @Query("SELECT u.email FROM User u INNER JOIN Organization o ON u.organizationID = o.organizationID WHERE u.email IN :members")
    Optional<List<String>> findUserDetailsByEmailList(@Param("members") List<String> members);
    @Query("SELECT u.userID FROM User u INNER JOIN Organization o ON u.organizationID = o.organizationID WHERE u.email IN :members")
    Optional<List<Long>> getUserIDsByEmailList(@Param("members") List<String> members);
    @Query("SELECT COUNT(t) FROM Team t WHERE t.teamID = :id AND t.organizationID = :oid")
    Long isUniqueTeamID(@Param("id") Long id, @Param("oid") Long oid);
    @Query("SELECT t FROM Team t WHERE t.teamID = :tid AND t.organizationID = :oid")
    Optional<Team> getTeam(@Param("tid") Long tid, @Param("oid") Long oid);
    @Query("SELECT u FROM User u INNER JOIN Team t ON t.teamID=u.teamID INNER JOIN Organization o ON t.organizationID=o.organizationID WHERE t.teamID=:tid AND t.organizationID=:oid")
    Optional<ArrayList<User>> getMembers(@Param("tid") Long tid, @Param("oid") Long oid);

    // Insert

    // Update
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.teamID = :teamId, u.CanCreate = False WHERE u.organizationID = :oid AND u.email IN :emailList")
    void updateUserTeamId(@Param("teamId") Long teamId, @Param("oid") Long oid, @Param("emailList") List<String> emailList);
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.teamID = :teamId, u.CanCreate = False WHERE u.organizationID = :oid AND u.email IN :emailList")
    void updateTeamInfo(@Param("teamId") Long teamId, @Param("oid") Long oid, @Param("emailList") List<String> emailList);
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.CanCreate = True, u.CanRead = True, u.CanUpdate = True, u.CanDelete = True, u.teamID = :tid WHERE u.organizationID = :oid AND u.userID = :uid")
    void updateUserManager(@Param("tid") Long tid, @Param("oid") Long oid, @Param("uid") Long uid);
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.CanCreate = :C, u.CanRead = :R, u.CanUpdate = :U, u.CanDelete = :D, u.teamID = :tid WHERE u.organizationID = :oid AND u.userID = :uid")
    void updateUserPermissions(@Param("tid") Long tid, @Param("oid") Long oid, @Param("uid") Long uid, boolean C, boolean R, boolean U, boolean D);

    // Delete
}
