import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import axios from "axios";
import TeamsModel from "./TeamsModel";
import MiniMemberDisplay from "../../components/MiniMemberDisplay";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faL } from '@fortawesome/free-solid-svg-icons'

export default function Teams() {

    const User = JSON.parse(sessionStorage.getItem('User'));
    const [teamData, setTeamData] = useState(null);
    const [isEditting, setIsEditting] = useState(false);
    const [newTeamData, setNewTeamData] = useState(null);

    if (!User) {
        return (
            <div className="m-auto w-1/2  text-center mt-80">
                <h2 className="font-bold ">Please <a href="/signIn" className="text-blue-700 underline italic">sign-in</a> to join, create, and view teams 🌐</h2>
            </div>
        )
    }

    const [teamSectionBtnColor, setTeamSectionBtnColor] = useState('YourTeam');

    //#region Editing Functions
    const handleNewTeamData = (field, event) => {
        let x = newTeamData;
        if (field !== 'members') {
            x[field] = event.target.textContent;
        } 
    }

    //#endregion

    //#region API/Database Calls
    async function fetchData() {
        try {
            const data = await TeamsModel.getTeamData();
            setTeamData(data); // Update teamData using state
            setNewTeamData(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function updateTeamInfo() {
        const oldData = teamData;
        const x = newTeamData;
        x.members = oldData.members;
        setNewTeamData({...x});
        try {
            await TeamsModel.updateTeamInfo(newTeamData, User['teamID']);
            setIsEditting(false);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    //#endregion

    //#region Create components
    const GenerateOtherTeams = () => {
        return (
            <div className="block mt-4">
                {/* Redux needed */}
                {/* <SearchBar placeholder={'Search for teams company-wide'}/> */}
                <p>**Coming Soon**: Search for teams company-wide</p>
            </div>
        )
    }
    
    const GenerateYourTeam = (data) => {
        if (!data) {
            return (
                <div className='block mt-4'>
                    <h3 className="font-semibold text-xl mt-4">Uh-oh!</h3>
                    <p className="text-sm">Seems like you are not part of a team. Ask your manager to add you to their team or enter your one-time team code <a href="/teams/new" className="font-bold italic underline text-blue-500">here</a>.</p>
                </div>
            )
        }
        
        else {
            return (
                <div className='block mt-4'>
                    <div id="header" className="flex w-full items-center">
                        <p className={`font-bold text-gray-900 w-fit text-3xl ${isEditting ? 'border border-gray-500 py-1 pl-1 rounded-sm' : ''}`} contentEditable={isEditting} 
                        onInput={(event) => {handleNewTeamData('team_name', event)}}>{data?.name}</p>
                        {
                            User?.canUpdate &&
                            <button onClick={() => {setIsEditting(!isEditting)}}>
                                {/* Editing enables all MiniMemberDisplays to show/edit permissions */}
                                <FontAwesomeIcon className="ml-4 text-gray-400" icon={faEdit}/>
                            </button>
                        }
                    </div>
                    <hr />
                    
                    <h3 className="font-semibold text-xl mt-4">Description</h3>
                    <p className={`text-sm ${isEditting ? 'border border-gray-500 py-1 pl-1 rounded-sm' : ''}`} contentEditable={isEditting} 
                    onInput={(event) => {handleNewTeamData('description', event)}}>{data?.description}</p>

                    <h3 className="font-semibold text-xl mt-4">Location</h3>
                    <p className={`text-sm ${isEditting ? 'border border-gray-500 py-1 pl-1 rounded-sm' : ''}`} contentEditable={isEditting}
                    onInput={(event) => {handleNewTeamData('location', event)}}>{data?.location}</p>

                    <h3 className="font-semibold text-xl mt-4">Members</h3>
                    <h2>Manager(s): </h2>
                    {
                        data?.members.map((m, i) => {
                            return (
                                m.userID === data.managerID &&
                                <MiniMemberDisplay type={isEditting ? 'edit' : 'basic'} team={teamData} data={m} key={i}/>
                            )
                        })
                    }
                    <h2>Employees: </h2>
                    <div className="flex">
                        {
                            data?.members?.map((m, i) => {
                                return (
                                    m.userID !== data.managerID &&
                                    <MiniMemberDisplay type={isEditting ? 'edit' : 'basic'} team={teamData} data={m} key={i}/>
                                )
                            })
                        }
                    </div>

                    {
                        !isEditting &&
                        <button onClick={() => {addNewTeamMember()}} className="mt-2 px-4 border bg-blue-500 text-white border-blue-500 font-bold p-1 text-sm rounded-md">Add a Member</button>
                    }

                    {
                        isEditting &&
                        <button onClick={() => {updateTeamInfo()}} className="mt-2 px-4 border bg-green-500 text-white border-green-500 font-bold p-1 text-sm rounded-md">Save Changes</button>
                    }
                </div>
            )
        }
        
    }
    
    const addNewTeamMember = () => {
        // Get user permissions and check for permission
        const User = JSON.parse(sessionStorage.getItem('User'));
        if (!User?.canCreate) {
            alert('Oops! It seems like you don\'t have the permission to add a new member.')
        } else {
            location.href = '/teams/addMember';
        }
    }
    //#endregion

    return (
        <div id='Team'>
            <div className="mt-8 w-11/12 m-auto h-screen ">
                
                <div id="intro" className="bg-white p-8 rounded-sm shadow-sm">
                    <h2 className="font-bold  text-gray-900 w-full text-3xl">Teams</h2>
                    <hr />
                    <p className="mt-2 justify-between text-sm">Welcome to the Team Overview page. 
                        This is your central hub for everything related to your amazing team. Here, you can get a detailed look at your team's composition, roles, and objectives. 
                        Additionally, you can explore other teams within our organization to gain insights into their composition and goals. Not part of a team or need to create one? Get started <a href="/teams/new" className="font-bold italic text-blue-500 underline">here</a>!</p>
                </div>

                <div id="teamSection" className="bg-white rounded-sm shadow-sm mt-4 p-8">
                    <div id="tabs" className="">
                        <button onClick={() => {setTeamSectionBtnColor('YourTeam')}} className={`px-4 border ${teamSectionBtnColor === 'YourTeam' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border-blue-500 font-bold p-1 text-sm rounded-l-md`}>Your Team</button>
                        <button onClick={() => {setTeamSectionBtnColor('OtherTeams')}}className={`px-4 border  ${teamSectionBtnColor === 'OtherTeams' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border-blue-500 font-bold p-1 text-sm rounded-r-md`}>Other Teams</button>
                    </div>

                    {
                        teamSectionBtnColor === 'YourTeam'
                        && GenerateYourTeam(teamData)
                    }

                    {
                        teamSectionBtnColor !== 'YourTeam'
                        && GenerateOtherTeams()
                    }

                </div>
                
                
            </div>
        </div>
    )
}

