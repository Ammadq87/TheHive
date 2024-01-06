import axios from "axios";

// All functions assume User is signed in
export default class TeamsModel {
    static database = axios.create({
        baseURL: 'http://localhost:3000/api/v1'
    });;

    /**
     * @param {{team_name,description,location,names}} form
     * @returns {Response} response
     */
    static async createNewTeam (form) {
        const response = await this.database.post('/team/createNewTeam', form);
        return response;
    }

    /**
     * Retrieves team data based on User's teamID.
     * @returns {Response} response
     */
    static async getTeamData() {
        const User = JSON.parse(sessionStorage.getItem('User'));
        if (!('teamID' in User))
            return null;

        const teamID = User['teamID'];
        if (teamID === null)
            return null;

        try {
            const response = await this.database.get(`/team/${teamID}`);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

}