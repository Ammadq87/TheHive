import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";

export default function Teams() {
    const teamData = {};

    const [teamSectionBtnColor, setTeamSectionBtnColor] = useState('YourTeam');

    useEffect(() => {
        console.log('Fetch Team Data Here');
    }, []);

    //#region Create components
    const GenerateOtherTeams = () => {
        return (
            <div className="block mt-4">
                <SearchBar placeholder={'Search for teams company-wide'}/>
            </div>
        )
    }
    
    const GenerateYourTeam = (data) => {
        return (
            <div className='block mt-4'>
                <h2 className="font-bold  text-gray-900 w-full text-3xl">HR1</h2>
                <hr />
                
                <h3 className="font-semibold text-xl mt-4">Description</h3>
                <p className="text-sm">This is the team description :))</p>
    
                <h3 className="font-semibold text-xl mt-4">Members</h3>
                <h2>Manager(s): </h2>
                <h2>Players: </h2>
                <button onClick={() => {addNewTeamMember()}} className="mt-2 px-4 border bg-blue-500 text-white border-blue-500 font-bold p-1 text-sm rounded-md">Add a Member</button>
            </div>
        )
    }
    
    const addNewTeamMember = () => {
        // Get user permissions and check for permission
        const User = JSON.parse(localStorage.getItem('User'));
        if (!!User?.permission.team.member) {
            alert('Oops! It seems like you don\'t have the permission to add a new member.')
        } else {
            location.href += '/addMember';
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

