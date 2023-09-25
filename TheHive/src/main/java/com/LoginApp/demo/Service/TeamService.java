package com.LoginApp.demo.Service;
import com.LoginApp.demo.Model.Team;
import com.LoginApp.demo.Model.User;
import com.LoginApp.demo.Model.UserSession;
import com.LoginApp.demo.Repository.TeamRepo;
import com.LoginApp.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class TeamService {
    private final TeamRepo teamRepo;

    @Autowired
    public TeamService(TeamRepo tr) {
        this.teamRepo = tr;
    }

    public ResponseEntity<String> createNewTeam(Team team) {
        if (team == null)
            return new ResponseEntity<>(null, HttpStatus.PRECONDITION_FAILED);
        Long orgID = UserSession.getInstance().getUser().getOrganizationID();
        Long count = teamRepo.verifyTeamName(team.getName(), orgID);
        if (count > 0L) {
            return new ResponseEntity<>("Team name already exists within organization", HttpStatus.PRECONDITION_FAILED);
        }

        Optional<List<String>> result = teamRepo.findUserDetailsByEmailList(team.getMembers());
        if (result.isEmpty())
            return new ResponseEntity<>("Could not find members", HttpStatus.PRECONDITION_FAILED);

        Set<String> inputSet = new HashSet<>(team.getMembers());
        Set<String> resultSet = new HashSet<>(result.get());

        inputSet.removeAll(resultSet);
        if (inputSet.size() != 0) {
            List<String> remainingMembers = new ArrayList<>(inputSet);
            // [members who couldn't be added]$$[added members] -- to display in modal
            return new ResponseEntity<>(remainingMembers.toString() + "$$" + resultSet.toString(), HttpStatus.PRECONDITION_FAILED);
        }

        Team newTeam = new Team();
        newTeam.setOrganizationID(UserSession.getInstance().getUser().getOrganizationID());
        newTeam.setName(team.getName());
        newTeam.setDescription(team.getDescription());

        Long teamID = generateTeamID();
        newTeam.setTeamID(teamID);

        try {
            teamRepo.save(newTeam);
            teamRepo.updateUserTeamId(newTeam.getTeamID(), newTeam.getOrganizationID(), new ArrayList<>(resultSet));
        } catch (Exception e) {
            System.out.println("Something went wrong saving the team");
            e.printStackTrace();
        }

        UserSession.getInstance().getUser().setTeamID(teamID);
        return new ResponseEntity<>(newTeam.getName() + " created!", HttpStatus.OK);
    }

    // private/helper functions

    private Long generateTeamID() {
        String tid = "";
        Long orgID = UserSession.getInstance().getUser().getOrganizationID();
        do {
            tid = "";
            for (int i = 3; i >= 0; i--) {
                int x = new Random().nextInt(10);
                tid += x;
            }
        } while (!teamRepo.isUniqueTeamID(Long.parseLong(tid), orgID).equals(0L));

        return Long.parseLong(tid);
    }
}
