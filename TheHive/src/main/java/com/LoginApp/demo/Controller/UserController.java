package com.LoginApp.demo.Controller;

import com.LoginApp.demo.Model.User;
import com.LoginApp.demo.Model.UserSession;
import com.LoginApp.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/")
    public ResponseEntity<User> getUser() {
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
