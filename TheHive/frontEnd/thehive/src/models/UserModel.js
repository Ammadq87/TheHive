import axios from "axios";

export default class UserModel {
    static database = axios.create({
        baseURL: 'http://localhost:3000/api/v1'
    });;

    static async signOut() {
        try {
            const response = await this.database.post('/auth/signOut');
            return response;
        } catch (e) {
            console.error(e);
            return e;
        }
    }

}