import { useEffect, useState } from 'react';
import logo from '../assets/puzzle.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import SearchBar from './SearchBar';
import UserModel from '../models/UserModel';

export default function Navbar() {
    const [signedIn, setSignedIn] = useState(false);

    const handleSignedIn = () => {
        const User = JSON.parse(sessionStorage.getItem('User'));
        setSignedIn(User !== null)
    }

    const handleDataFromSearch = (data) => {
        console.log(data);
    }

    useEffect(() => {
        handleSignedIn();
    })

    async function signOut() {
        sessionStorage.removeItem("User");
        location.href = '/';
        const response = await UserModel.signOut();
        console.log(response);
    }

    return (

        <div id='navbar' className='block w-screen shadow-sm z-50 relative'>
            <div className='bg-white flex h-16 items-center '>
                <div id="logo" className='flex bg-white m-4'>
                    <img src={logo} alt="CoCreate Logo" className='w-12 h-12'/>
                    <a href="/" className='bg-white'><h1 className='text-purple-600 text-2xl font-bold m-2 bg-white'>CoCreate</h1></a>
                </div>

                <div id="links" className='items-center'>
                    <ul>
                        <a href='/home'><li>Home</li></a>
                        <a href='/spaces'><li>Spaces</li></a>
                        <a href='/teams'><li>My Team</li></a>
                        {/* ToDo: should be a link -- not button */}
                        <a className='text-white font-semibold h-10 w-24 border text-center pt-2 rounded-md bg-purple-700' href='/create'>Create</a>
                    </ul>
                </div>
            
                {
                    signedIn &&
                    <div id='personal' className='flex ml-auto items-center bg-white mr-4'>
                        <SearchBar placeholder='Search for posts, documents, people, etc' search_type={['user', 'team', 'space', 'page']} main_search={true} receiveData={handleDataFromSearch}/>
                        <ul className=''>
                            <a href="" className='m-4'><FontAwesomeIcon icon={faBell}/></a>
                            <button onClick={() => {signOut()}}><img className='w-8 h-8 rounded-full mx-4' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="" /></button>
                        </ul>
                    </div>
                }

                {
                    !signedIn &&
                    <div id='signedOut' className='block ml-auto'>
                        <ul>
                            <a href="/signIn" className='bg-white'><h3 className='mx-8 text-md font-bold m-2 text-purple-700 bg-white'>Sign In</h3></a>
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}
