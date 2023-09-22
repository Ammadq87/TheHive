package com.LoginApp.demo.Repository;

import com.LoginApp.demo.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.email = :email AND u.password = :password")
    Optional<User> validateLogin(String email, String password);

}
