import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons'

export default function NewTeam() {
    const [joinTeamBtn, setJoinTeamBtn] = useState(true);
    return (
        <div id='NewTeam'>
            <div className="mt-8 w-11/12 m-auto h-screen ">
                
                <div id="intro" className="bg-white p-8 rounded-sm shadow-sm">
                    <h2 className="font-bold  text-gray-900 w-full text-3xl">Teams</h2>
                    <hr />
                    <p className="mt-2 justify-between text-sm">On this page, you have the opportunity to collaborate and work together with others by joining an existing team or creating a new one.</p>
                </div>

                <div id="teamSection" className="bg-white rounded-sm shadow-sm mt-4 p-8">
                    <div id="tabs" className="">
                        <button onClick={() => {setJoinTeamBtn(true)}} className={`px-4 border ${joinTeamBtn? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border-blue-500 font-bold p-1 text-sm rounded-l-md`}>Join Team</button>
                        <button onClick={() => {setJoinTeamBtn(false)}}className={`px-4 border  ${!joinTeamBtn? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border-blue-500 font-bold p-1 text-sm rounded-r-md`}>New Team</button>
                    </div>

                    {
                        !joinTeamBtn
                        && GenerateNewTeam()
                    }

                    {
                        joinTeamBtn
                        && GenerateJoinTeam()
                    }

                </div>
                
                
            </div>
        </div>
    )
}

/*
 * Check for permissions first -- default permissions are always false
 */
const GenerateNewTeam = () => {
    return (
        <div className="mt-4">
            <h2 className="font-bold  text-gray-900 w-full text-xl">New Team</h2>
            <p className="my-2 justify-between text-sm">If you're starting a new project or initiative and need a team, you can create one from scratch. Click below to get started. You can choose a team name, set its purpose, and invite others to join.</p>
            {/* <form action="">
                <div className="flex">
                    <p id="first_name" className={`text-red-700 mr-2`}>*</p>
                    <input type="text" placeholder="First Name" required className={`m-auto rounded-md border border-gray-200 text-sm h-12`}/>
                </div>
            </form> */}
        </div>
    )
}
const GenerateJoinTeam = () => {
    return (
        <div className="mt-4">
            <h2 className="font-bold  text-gray-900 w-full text-xl">Join Team</h2>
            <p className="my-2 justify-between text-sm">If you have received an invitation or are looking to become a part of an established team, click the "Join Team" button below. You will need an invitation code or the team's name to proceed.</p>
            <hr />
            <form className="flex items-center mt-4">
                <p className="text-sm">Invite Code:</p>
                <input type="text" className="ml-2 rounded-md border border-gray-200 text-sm h-12" required />
                <button className="px-4 py-2 rounded-md bg-green-500 text-white ml-2"><FontAwesomeIcon icon={faCirclePlus}/></button>
            </form>
        </div>
    )
}