package com.LoginApp.demo.Controller;

import com.LoginApp.demo.Model.User;
import com.LoginApp.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="api/v1/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService us) {
        this.userService = us;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User u) {
        System.out.println(u.toString());
        return userService.register(u);
    }
}
