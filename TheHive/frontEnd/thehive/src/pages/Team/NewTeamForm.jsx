import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPeopleLine} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

const formMessage = {
    title: null,
    description: null,
    color: null
};

const form = {
    team_name: null,
    description: null,
    names: []
};

export default function NewTeamForm() {
    const [formData, setFormData] = useState(form);
    const [_formMessage, setFormMessage] = useState(formMessage);
 
    const database = axios.create({
        baseURL: 'http://localhost:3000/api/v1'
    });

    /**
     * @param {string} field
     * @param {string} value
     */
    const handleFormData = (field, value) => {
        const x = formData;

        if (field === 'names') {
            let val = value.split(' ').join('').split(',');
            x[field] = [];
            val.forEach(e => {
                if (e !== '' && e.length !== 0)
                    x[field].push(e);
            });
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
            const response = await database.post('/team/createNewTeam', formData);
            createFormMsg(response);
            setNewTeamID(response);

        } catch (e) {
            console.log(e);
            createFormMsg(e);

        }
    }

    /**
     * Assigns the logged-in user their new teamID. Assumes user is logged in
     * @param {Response} response
     */
    const setNewTeamID = (response) => {
        const teamID = parseInt(response['data'].split('$$')[1]);
        const User = JSON.parse(sessionStorage.getItem('User'));
        User.teamID = parseInt(teamID);
        sessionStorage.setItem("User", JSON.stringify(User));
        setTimeout(() => {
            location.href = `/teams`
        }, 3000);
    }

    /**
     * @param {Response} msg
     */
    const createFormMsg = (msg) => {
        if ('response' in msg) {
            const data = msg['response']['data'];
            const x = formMessage;
            x.title = 'Oops!';
            x.description = `${data}`;
            x.color = 'red-500';
            setFormMessage({...x});
        } else {
            const data = msg['data'].split("$$")[0];
            const x = formMessage;
            x.title = 'Yayy!';
            x.description = `${data}`;
            x.color = 'green-500';
            setFormMessage({...x});
        }
    }

    return (

        <div id="parent" className="flex">
            <div id="leftHalf" className="border flex w-1/3 p-2 rounded-sm shadow-sm">
                <div className="w-full">
                    {
                        Object.keys(form).map((field, i) => {
                            return (
                                <div className="flex items-center my-4 w-full" key={i}>
                                    <p className={`font-semibold text-sm mx-2 w-1/3`}><span className="text-red-500">*</span>
                                    {field.split('_').map((f) => {return f.charAt(0).toUpperCase() + f.substring(1,f.length)}).join(' ')}:</p>
                                    
                                    {
                                        field !== 'team_name' && 
                                        <textarea rows="1" className="rounded-md border border-gray-200 text-sm h-10 w-full overflow-visible"
                                        onChange={(e) => {handleFormData(field, e.target.value)}}
                                        placeholder={field === 'names' ? 'Separate emails by commas' : 'Nice and simple description'}
                                        ></textarea>
                                    }

                                    {
                                        field === 'team_name' && 
                                        <input type="text" required className={`rounded-md border border-gray-200 text-sm h-10 w-full overflow-visible`}
                                        onChange={(e) => {handleFormData('team_name', e.target.value)}} placeholder="✨ This represents your team ✨"
                                        />
                                    }
                                </div>
                            )
                        })
                    }
                    <button onClick={() => {submitForm()}} className="px-4 py-2 rounded-md bg-green-500 text-center text-white w-1/4 text-md flex ml-auto mx-2">Create Team</button>
                </div>
            </div>

            <div id="rightHalf" className="ml-8 w-1/4">
                <h2 className={`text-lg font-bold text-${formMessage?.color}`}>{formMessage?.title}</h2>
                {
                    formMessage?.title &&
                    <hr />
                }
                <p className="text-sm font-regular mt-2">{formMessage.description}</p>
            </div>
        </div>
    )
}