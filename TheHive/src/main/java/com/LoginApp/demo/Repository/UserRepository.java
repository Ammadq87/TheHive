package com.LoginApp.demo.Repository;

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

    @Query("SELECT u FROM User u JOIN Organization o ON u.organizationID = o.organizationID WHERE u.userID = :id")
    Optional<User> getUser(Long id);

    @Query("SELECT u FROM User u JOIN Organization o ON u.organizationID = o.organizationID WHERE o.organizationID = :id")
    Optional<ArrayList<User>> getUsersFromOrganization(Long id);

    @Query("SELECT u FROM User u INNER JOIN Organization o ON u.organizationID = o.organizationID WHERE o.organizationID = :oid AND u.email LIKE %:email%")
    Optional<ArrayList<User>> getUsersByEmail(@Param("oid") Long oid, @Param("email") String email);

}
