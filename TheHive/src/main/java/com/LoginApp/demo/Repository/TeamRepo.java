package com.LoginApp.demo.Repository;

import com.LoginApp.demo.Model.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface TeamRepo extends JpaRepository<Team, Long> {

    @Query("SELECT COUNT(t) FROM Team t WHERE t.name = :name AND t.organizationID = :id")
    Long verifyTeamName(@Param("name") String name, @Param("id") Long id);

    @Query("SELECT u.email FROM User u INNER JOIN Organization o ON u.organizationID = o.organizationID WHERE u.email IN :members")
    Optional<List<String>> findUserDetailsByEmailList(@Param("members") List<String> members);

    @Query("SELECT COUNT(t) FROM Team t WHERE t.teamID = :id AND t.organizationID = :oid")
    Long isUniqueTeamID(@Param("id") Long id, @Param("oid") Long oid);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.teamID = :teamId WHERE u.organizationID = :oid AND u.email IN :emailList")
    void updateUserTeamId(@Param("teamId") Long teamId, @Param("oid") Long oid, @Param("emailList") List<String> emailList);
}
