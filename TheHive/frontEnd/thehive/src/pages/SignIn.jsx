import Navbar from "../components/Navbar";
import logo from '../assets/puzzle.png'
import { useEffect, useState } from "react";

const inputUI = 'block m-auto my-4 rounded-md w-4/5 border border-gray-200 text-sm h-12'

export default function Login (){

    const [formData, setFormData] = useState({email: null, password: null});

    const handleFormData = (field, value) => {
        const x = formData;
        x[field] = value;
        setFormData({...x});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        console.log(formData);
    }, [formData])

    return (
        <div>
            <Navbar/>
            <form action="http://localhost:3000/api/v1/auth/signIn" method="POST" className="block border rounded-md drop-shadow-md w-1/5 m-auto bg-white mt-16">

                <div id="logo" className='block justify-center items-center bg-white m-auto mt-4'>
                    <img src={logo} alt="CoCreate Logo" className='w-12 h-12  text-center m-auto'/>
                    <h1 className=' text-2xl font-bold m-2 bg-white align text-center'>CoCreate</h1>
                </div>

                <input type="email" placeholder="Email" required className={inputUI}
                    onChange={(e) => handleFormData('email', e.target.value)}
                />
                <input type="password" placeholder="Password" required className={inputUI}
                    onChange={(e) => handleFormData('password', e.target.value)}
                />
                
                <button type="buttom" className="block m-auto bg-purple-700 h-10 text-white my-4 rounded-md w-4/5 font-semibold"
                    onClick={(e) => handleSubmit(e)}
                >Sign In</button>

                <div id="links" className="flex bg-white text-center justify-between w-4/5 m-auto my-4">
                    {/* Have to create something to replace password */}
                    <a href="/register" className="inline ml-0 text-xs font-semibold mr-auto">Forgot Password?</a>
                    <a href="/register" className="inline mr-0 text-xs font-semibold ml-auto">Register</a>
                </div>
            </form>
        </div>
    );
}