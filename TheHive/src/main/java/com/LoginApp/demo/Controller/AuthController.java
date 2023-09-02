package com.LoginApp.demo.Controller;

import com.LoginApp.demo.Model.User;
import com.LoginApp.demo.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService as) {
        this.authService = as;
    }

    @PostMapping("/signOut")
    public ResponseEntity<String> signOut(){
        return authService.signOut();
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User u) {
        return authService.register(u);
    }

    @PostMapping("/signIn")
    public ResponseEntity<String> signIn(@RequestBody User u) {
        return authService.signIn(u);
    }
}
