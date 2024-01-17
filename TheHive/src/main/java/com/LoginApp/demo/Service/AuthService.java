package com.LoginApp.demo.Service;

import com.LoginApp.demo.Model.Organization;
import com.LoginApp.demo.Model.User;
import com.LoginApp.demo.Model.UserSession;
import com.LoginApp.demo.Repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Optional;
import java.util.Random;

@Component
public class AuthService {

    private final AuthRepository authRepository;

    @Autowired
    public AuthService(AuthRepository ar) {
        this.authRepository = ar;
    }

    public ResponseEntity<String> signOut() {
        if (UserSession.getInstance().getUser() == null)
            return new ResponseEntity<>("Cannot Sign Out - User Not Logged In", HttpStatus.BAD_REQUEST);

        System.out.println(UserSession.getInstance().getUser().getEmail() + " has logged out.");
        UserSession.getInstance().setUser(null);
        return new ResponseEntity<>("Successfully Logged Out", HttpStatus.OK);
    }

    public ResponseEntity<String> register(User u) {
        if (UserSession.getInstance().getUser() != null)
            return new ResponseEntity<>("Sign Out to Register", HttpStatus.BAD_REQUEST);

        if (u == null)
            return new ResponseEntity<>("Insufficient User Information Provided", HttpStatus.BAD_REQUEST);

        boolean exists = authRepository.existsByEmail(u.getEmail()).isPresent();
        if (exists)
            return new ResponseEntity<>("Email already taken", HttpStatus.PRECONDITION_FAILED);

        Optional<Organization> organization = authRepository.orgnizationExists(u.getOrganizationID());
        if (organization.isEmpty()) {
            return new ResponseEntity<>("Not a Valid OrgID", HttpStatus.PRECONDITION_FAILED);
        }

        u.setUserID(generateUID(u));

        authRepository.save(u);
        return new ResponseEntity<>("Successfully Registered", HttpStatus.OK);
    }

    public ResponseEntity<String> signIn(User user) {
        Optional<User> u = authRepository.validateLogin(user.getEmail(), user.getPassword());
        if (u.isEmpty())
            return new ResponseEntity<>("Incorrect email/password combination", HttpStatus.BAD_REQUEST);

        UserSession.getInstance().setUser(u.get());
        System.out.println(UserSession.getInstance().getUser().getEmail() + " is logged in.");
        return new ResponseEntity<>("Successfully Logged In", HttpStatus.OK);
    }

    // Private/Helper methods
    private Long generateUID(User u) {
        String uid = "";
        do {
            uid = "";
            for (int i = 5; i >= 0; i--) {
                int x = new Random().nextInt(10);
                uid += ""+x;
            }
        } while (!authRepository.countByOrganizationID(u.getOrganizationID(), Long.parseLong(uid)).equals(0L));

        return Long.parseLong(uid);
    }

}
