import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPeopleLine} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

const form = {
    team_name: null,
    description: null,
    members: []
};

export default function NewTeamForm() {
    const [formData, setFormData] = useState(form);

    const database = axios.create({
        baseURL: 'http://localhost:3000/api/v1'
    });

    /**
     * @param {string} field
     * @param {string} value
     */
    const handleFormData = (field, value) => {
        const x = formData;

        if (field === 'members') {
            let val = value.split(' ').join('').split(',');
            x[field] = [];
            val.forEach(e => {
                if (e !== '' && e.length !== 0)
                    x[field].push(e);
            })
        } else {
            x[field] = value;
        }

        setFormData({...x});
    };

    /**
     * Submit form to database
     */
    const submitForm = async () => {
        try {
            /*
            Backend:
                - check if team name is valid
                    - team name does not already exist
                - check for if members exists
                    - Run a query joining User and Organization
                        - SELECT 
                        u.email,
                        u.firstName as first_name,
                        u.lastName as last_name,
                        o.name AS Company,
                        o.organizationID
                        FROM User u
                        INNER JOIN Organization o
                        ON u.organizationID = o.organizationID
                        WHERE u.email IN (members)
                    - If size/length of result doesn't match the list size for the members array, soemthing is wrong
                    - Iterate through and add all members from result
                    - display message of which users couldnt be added (pop-up modal? Added vs. Not Added)
                - submit
            */
            const response = await database.post('/team/createNewTeam', formData);
            // redirect to localhost:3000/teams/${formData[team_name.split(' ').map((e) => {return e.toLowerCase()}).join('_')]}
            console.log(response['data']);
        } catch (e) {
            
            /* Check for type of error:
                - if missing member
                    - display modal to show which members weren't added
            */
            
            console.log(e);
            alert('Something went wrong when creating your team :(')
        }
    }
  
    return (
        <form action="" className="border w-1/3 p-2 rounded-sm shadow-sm">
            {
                Object.keys(form).map((field, i) => {
                    return (
                        <div className="flex items-center my-4" key={i}>
                            <p className={`font-semibold text-sm mx-2 w-1/4`}><span className="text-red-500">*</span>
                            {field.split('_').map((f) => {return f.charAt(0).toUpperCase() + f.substring(1,f.length)}).join(' ')}:</p>
                            
                            {
                                field !== 'team_name' && 
                                <textarea rows="1" className="rounded-md border border-gray-200 text-sm h-10 w-3/4 overflow-visible"
                                onChange={(e) => {handleFormData(field, e.target.value)}}
                                ></textarea>
                            }

                            {
                                field === 'team_name' && 
                                <input type="text" required className={`rounded-md border border-gray-200 text-sm h-10 w-3/4 overflow-visible`}
                                onChange={(e) => {handleFormData('team_name', e.target.value)}}/>
                            }
                        </div>
                    )
                })
            }
            <button onClick={() => {submitForm()}} className="px-4 py-2 rounded-md bg-green-500 text-center text-white w-1/4 text-md flex ml-auto mx-2">Create Team</button>
        </form>
    )
}