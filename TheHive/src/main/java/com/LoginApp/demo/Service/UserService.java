package com.LoginApp.demo.Service;

import com.LoginApp.demo.Model.User;
import com.LoginApp.demo.Model.UserSession;
import com.LoginApp.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Optional;

@Component
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository u) {
        this.userRepository = u;
    }

    public ResponseEntity<User> getUser(Long id) {
        Optional<User> user = userRepository.getUser(id);
        if (user.isEmpty())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }

    public ResponseEntity<ArrayList<User>> getUsers(Long id) {
        Optional<ArrayList<User>> users = userRepository.getUsersFromOrganization(id);
        if (users.isEmpty())
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        return new ResponseEntity<>(users.get(), HttpStatus.OK);
    }

    public ResponseEntity<ArrayList<User>> getUsersByEmail(String email) {
        Optional<ArrayList<User>> users = userRepository.getUsersByEmail(UserSession.getInstance().getUser().getOrganizationID(), email);
        if (users.isEmpty())
             return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        return new ResponseEntity<>(users.get(), HttpStatus.OK);
    }

}
