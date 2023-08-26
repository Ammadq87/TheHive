package com.LoginApp.demo.Service;

import com.LoginApp.demo.Model.User;
import com.LoginApp.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository u) {
        this.userRepository = u;
    }

    public ResponseEntity<String> register(User u) {
        if (u == null)
            return new ResponseEntity<>("Insufficient User Information Provided", HttpStatus.BAD_REQUEST);

        boolean exists = userRepository.existsByEmail(u.getEmail()).isPresent();
        System.out.println(exists);
        if (exists)
            return new ResponseEntity<>("Email already taken", HttpStatus.PRECONDITION_FAILED);

        userRepository.save(u);
        return new ResponseEntity<>("Successfully Registered", HttpStatus.OK);
    }

}
