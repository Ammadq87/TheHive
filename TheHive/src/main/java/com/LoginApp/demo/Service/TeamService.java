package com.LoginApp.demo.Service;
import com.LoginApp.demo.Model.Team;
import com.LoginApp.demo.DTO.TeamDTO;
import com.LoginApp.demo.Model.User;
import com.LoginApp.demo.Model.UserSession;
import com.LoginApp.demo.Repository.TeamRepo;
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

    // The Logged-In user is the manager of the new team
    public ResponseEntity<String> createNewTeam(TeamDTO team) {
        if (team == null)
            return new ResponseEntity<>(null, HttpStatus.PRECONDITION_FAILED);
        Long orgID = UserSession.getInstance().getUser().getOrganizationID();
        Long uID = UserSession.getInstance().getUser().getUserID();
        Long count = teamRepo.verifyTeamName(team.getTeam_name(), orgID);
        if (count > 0L) {
            return new ResponseEntity<>("Team name already exists within organization", HttpStatus.PRECONDITION_FAILED);
        }

        Optional<List<String>> result = teamRepo.findUserDetailsByEmailList(team.getNames());
        if (result.isEmpty())
            return new ResponseEntity<>("Could not find any members", HttpStatus.PRECONDITION_FAILED);

        Set<String> inputSet = new HashSet<>(team.getNames());
        Set<String> resultSet = new HashSet<>(result.get());

        // Have to check if a member exists in a current team -- if they do, throw error

        inputSet.removeAll(resultSet);
        if (inputSet.size() != 0) {
            List<String> remainingMembers = new ArrayList<>(inputSet);
            // [members who couldn't be added]$$[added members] -- to display in modal
            return new ResponseEntity<>("These members don't exist or are already a part of a team:\n"+formatRemainingMembers(remainingMembers), HttpStatus.PRECONDITION_FAILED);
        }

        Team newTeam = new Team();
        newTeam.setOrganizationID(orgID);
        newTeam.setName(team.getTeam_name());
        newTeam.setDescription(team.getDescription());
        newTeam.setLocation(team.getLocation());

        Long teamID = generateTeamID();
        newTeam.setTeamID(teamID);
        newTeam.setManagerID(uID);

        try {
            teamRepo.save(newTeam);
            teamRepo.updateUserTeamId(newTeam.getTeamID(), orgID, new ArrayList<>(resultSet));

            // ToDo: These 2 lines are doing the same thing, need a cleaner way to set permissions in current instance
            teamRepo.updateUserManager(newTeam.getTeamID(), orgID, uID);
            UserSession.getInstance().getUser().setCRUDpermissions(true, true, true, true);
        } catch (Exception e) {
            System.out.println("Something went wrong saving the team");
            e.printStackTrace();
        }

        UserSession.getInstance().getUser().setTeamID(teamID);
        return new ResponseEntity<>("Success, your new team, "+newTeam.getName()+", has been created. Go to MyTeams and view your newly created team.$$"+newTeam.getTeamID(), HttpStatus.OK);
    }

    public ResponseEntity<String> updateTeamInfo(Long teamID, TeamDTO team) {
        Long orgID = UserSession.getInstance().getUser().getOrganizationID();
        Optional<Team> oldTeam = teamRepo.getTeam(teamID, orgID);

        if (oldTeam.isEmpty()) {
            return new ResponseEntity<>("teamID [" + teamID + "] does not exist", HttpStatus.PRECONDITION_FAILED);
        }

        Team oldTeamData = oldTeam.get();

        // Update team name
        if (team.getTeam_name() != null)
            oldTeamData.setName(team.getTeam_name());

        // Update the description
        if (team.getDescription() != null)
            oldTeamData.setDescription(team.getDescription());

        // Update Location
        if (team.getLocation() != null)
            oldTeamData.setLocation(team.getLocation());

        // Update Members
        team.getMembers().forEach(u ->
                teamRepo.updateUserPermissions(u.getTeamID(), orgID, u.getUserID(),
                        u.getCanCreate(),
                        u.getCanRead(),
                        u.getCanUpdate(),
                        u.getCanDelete())
        );

        // Save and return, reload page to display changes
        teamRepo.save(oldTeamData);

        return new ResponseEntity<>(oldTeamData.toString(), HttpStatus.OK);
    }

    public ResponseEntity<Team> getTeam (Long tid) {
        Long oid = UserSession.getInstance().getUser().getOrganizationID();
        if (oid == null) {
            return new ResponseEntity<>(null, HttpStatus.PRECONDITION_FAILED);
        }

        Optional<Team> repoTeam = teamRepo.getTeam(tid, oid);
        if (repoTeam.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.PRECONDITION_FAILED);
        }

        Team team = repoTeam.get();

        Optional<ArrayList<User>> members = teamRepo.getMembers(tid, oid);
        if (members.isEmpty())
            team.setMembers(new ArrayList<>());
        else
            team.setMembers(members.get());

        return new ResponseEntity<>(repoTeam.get(), HttpStatus.OK);
    }


    // private/helper functions

    private String formatRemainingMembers(List<String> members) {
        String output = "\n";
        if (members == null || members.size() == 0)
            return output;
        for (String m : members) {
            output += m+", ";
        }
        return output.substring(0, output.length()-2);
    }

    private Long generateTeamID() {
        String tid;
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
