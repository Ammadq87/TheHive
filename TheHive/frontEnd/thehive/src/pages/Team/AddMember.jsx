import { useState } from "react"
import SearchBar from "../../components/SearchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope } from '@fortawesome/free-solid-svg-icons'
import MiniMemberDisplay from "../../components/MiniMemberDisplay";

export default function AddMember() {
    const [employeeExists, setEmployeeExists] = useState(true);



    return (
        <div id='AddMember'>
            <div className="mt-8 w-11/12 m-auto h-screen ">
                
                <div id="intro" className="bg-white p-8 rounded-sm shadow-sm">
                    <h2 className="font-bold  text-gray-900 w-full text-3xl">Add New Employee</h2>
                    <hr />
                    <p className="mt-2 justify-between text-sm">Here you can expand your team and invite new members to join your organization. Whether you're looking for fresh talent, additional expertise, or team growth, this is the place to make it happen. </p>
                </div>

                <div id="teamSection" className="bg-white rounded-sm shadow-sm mt-4 p-8">
                    <div id="tabs" className="">
                        <button onClick={() => {setEmployeeExists(true)}} className={`px-4 border ${employeeExists? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border-blue-500 font-bold p-1 text-sm rounded-l-md`}>Existing Employee</button>
                        <button onClick={() => {setEmployeeExists(false)}}className={`px-4 border  ${!employeeExists? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border-blue-500 font-bold p-1 text-sm rounded-r-md`}>New Employee</button>
                    </div>

                    {
                        employeeExists
                        && GenerateEmployeeExists()
                    }

                    {
                        !employeeExists
                        && GenerateNewEmployee()
                    }

                </div>
                
                
            </div>
        </div>
    )
}

const GenerateEmployeeExists = () => {
    return (
        <div className="mt-4">
            <SearchBar placeholder='Search by email'/>
        </div>
    )
}

const GenerateNewEmployee = () => {
    return (
        <div>
            <h3 className="font-bold text-lg mt-4">How to Add a New Employee</h3>
            <h2 className="text-md mb-4">Ask your new employee to follow the steps below to join your team. You can forward these steps via email.</h2>
            <hr />
            <ol className="list-decimal">
                <li>Register for CoCreate using the registration link found <span className="font-bold italic text-blue-500 underline">here</span>.</li>
                <ol type="a" className="list-disc ml-8">
                    <li>Use your company email to register.</li>
                    <li>Enter the organization code: <span className="font-bold italic underline">OrgCode</span>.</li>
                </ol>
                <li>After registration, login, and navigate to the <span>Teams</span> section.</li>
                <ol type="a" className="list-disc ml-8">
                    <li>Enter the team code: <span className="font-bold italic underline">TeamCode</span></li>
                    <li>Click the <span className="font-bold italic underline">Register Team</span> button</li>
                </ol>
                <li>Congratulations 🎉. Welcome to the team!</li>                
            </ol>
            <hr />
            <form className="flex items-center mt-4">
                <p>Email Instuctions:</p>
                <input type="email" className="ml-2 rounded-md border border-gray-200 text-sm h-12" required />
                <button className="px-4 py-2 rounded-md bg-green-500 text-white ml-2"><FontAwesomeIcon icon={faEnvelope}/></button>
            </form>
        </div>
    )
}