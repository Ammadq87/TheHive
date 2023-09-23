package com.LoginApp.demo.Repository;

import com.LoginApp.demo.Model.Organization;
import com.LoginApp.demo.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.email = :email AND u.password = :password")
    Optional<User> validateLogin(String email, String password);

    @Query("SELECT o FROM Organization o WHERE o.organizationID = :id")
    Optional<Organization> orgnizationExists(@Param("id") Long id);

    @Query("SELECT COUNT(u) FROM User u WHERE u.organizationID = :orgId AND u.userID = :uid")
    Long countByOrganizationID(@Param("orgId") Long organizationId, @Param("uid") Long uid);
}
