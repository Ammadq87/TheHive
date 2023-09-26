package com.LoginApp.demo.Controller;
import com.LoginApp.demo.Model.Team;
import com.LoginApp.demo.Model.TeamDTO;
import com.LoginApp.demo.Model.User;
import com.LoginApp.demo.Model.UserSession;
import com.LoginApp.demo.Service.TeamService;
import com.LoginApp.demo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping(path="api/v1/team")
@CrossOrigin(origins = "http://localhost:5173")
public class TeamController {

    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService ts) {this.teamService = ts;}

    @PostMapping("/createNewTeam")
    public ResponseEntity<String> createNewTeam(@RequestBody TeamDTO t) {
        return teamService.createNewTeam(t);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Team> getTeam(@PathVariable("id") Long tid) {
        return teamService.getTeam(tid);
    }

}
