package com.LoginApp.demo.Repository;

import com.LoginApp.demo.DTO.UserDTO;
import com.LoginApp.demo.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.email = :email AND u.password = :password")
    Optional<User> validateLogin(String email, String password);

    @Query("SELECT new com.LoginApp.demo.DTO.UserDTO(" +
            "u.userID, u.email, u.password, u.firstName, u.lastName, u.role, " +
            "u.description, u.CanCreate, u.CanRead, u.CanUpdate, u.CanDelete, " +
            "o.organizationID, o.name AS organizationName, " +
            "t.teamID, t.name AS teamName, " +
            "m.userID AS managerID, CONCAT(m.firstName, ' ', m.lastName) AS managerName, m.email AS managerEmail) " +
            "FROM User u " +
            "INNER JOIN Organization o ON o.organizationID = u.organizationID " +
            "LEFT JOIN Team t ON t.teamID = u.teamID AND u.teamID IS NOT NULL " +
            "LEFT JOIN User m ON m.userID = t.managerID " +
            "WHERE u.userID = :userId AND o.organizationID = :organizationId")
    Optional<UserDTO> getUser(@Param("userId") Long userId, @Param("organizationId") Long organizationId);
    @Query("SELECT u FROM User u JOIN Organization o ON u.organizationID = o.organizationID WHERE o.organizationID = :id")
    Optional<ArrayList<User>> getUsersFromOrganization(Long id);

    @Query("SELECT u FROM User u INNER JOIN Organization o ON u.organizationID = o.organizationID WHERE o.organizationID = :oid AND u.email LIKE %:email%")
    Optional<ArrayList<User>> getUsersByEmail(@Param("oid") Long oid, @Param("email") String email);

}
