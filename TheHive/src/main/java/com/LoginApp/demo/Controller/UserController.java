package com.LoginApp.demo.Controller;

import com.LoginApp.demo.DTO.UserDTO;
import com.LoginApp.demo.Model.User;
import com.LoginApp.demo.Model.UserSession;
import com.LoginApp.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping(path="api/v1/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService us) {
        this.userService = us;
    }

    @GetMapping("/{email}")
    public ResponseEntity<ArrayList<User>> getUsersByEmail(@PathVariable String email) {
        if (email == null || email.length() == 0)
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        return userService.getUsersByEmail(email);
    }

    @GetMapping("/")
    public ResponseEntity<UserDTO> getUser() {
        if (UserSession.getInstance().getUser() == null)
            return null;
        return userService.getUser(UserSession.getInstance().getUser().getUserID());
    }

    // Should this be moved to Organization MVC?
    @GetMapping("/organization/{organizationID}")
    public ResponseEntity<ArrayList<User>> getUsersFromOrganization (@PathVariable Long organizationID) {
        return userService.getUsers(organizationID);
    }
}
