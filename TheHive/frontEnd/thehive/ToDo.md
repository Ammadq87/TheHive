# Stories, Tasks, and Bug Fixes

## Currently working on (1/7/24):

- Editing team information and managing permissions completed
- Cleaning up code

### Notes

- Symbols:
  - 🔍: Next Focus
  - ✅: Item Complete
  - 🐞: Bug or not working as intended
  - 🏗️: Currently working on
- Spaces > Pages > Documents
- Definition of Done:
  - FE and BE are complete with all CRUD functionality
  - Components do not interfere with each other

## Stories

- Teams
  - Your Team
    - Managing your team
      - Promote employee to manager
      - Editing Team information and member permissions ✅
    - Send invite to new team member to join
  - Other Teams 🔍
    - Viewing/searching for other teams
  - Search for teams
  - Joining a new team
  - Team Permissions ✅
- Spaces
  - Creating/deleting spaces
  - Creating posts on spaces
    - sharing documents/pages
  - Adding/deleting teams/members to spaces
- Create a new:
  - Team [[🐞🏗️]](#Managers-Creating-Teams)
  - Space
  - Page
  - Document

## Tasks 🏗️

- Team
  - #### Manager Promotion
    - Include an 'isManager' option on MiniMemberDisplay to appoint a new manager for the team.
      - User Cases:
        1. Manager needs to move to a different team
        2. Promotion of roles
      - When the New Manager replaces the Old Manager, the New Manager should have all CRUD permissions activated by default, the Old Manager CRUD permissions stay

## Bug Fixes 🐞

- #### Managers Creating Teams
  - Manager of a current team can create a new team and join the new team, leaving their old team without a manager
  - Should display a warning or prompt them to not create a team without promoting an old employee to manager on the old team
