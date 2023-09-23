import Navbar from "../components/Navbar";
import logo from '../assets/puzzle.png'
import { useEffect, useState } from "react";
import axios from 'axios';

const inputUI = 'flex m-auto my-4 rounded-md w-4/5  text-sm h-12'
const form = {
    first_name: null, 
    last_name: null,
    organization_id: null,
    email: null, 
    password: null,
    confirm_password: null 
}
const asterikUI = `text-red-700 mr-2`;


export default function Register (){

    const [formData, setFormData] = useState(form);

    const [message, setMessage] = useState('');
    const [messageColor, setMessagecolor] = useState('');

    const database = axios.create({
        baseURL: 'http://localhost:3000/api/v1'
    });

    const handleFormData = (field, value) => {
        const x = formData;
        x[field] = value;
        setFormData({...x});
    }

    const generateAsterikUI = (field) => {
        const x = formData;
        if (formData[field] !== null) {
            return `mr-2 text-white`;
        } else {
            return `text-red-700 mr-2`;
        }
    }

    const handleSubmit = async (e) => {
        const registerForm = formData;
        
        console.log(registerForm)
        let filledOut = true;
        Object.keys(registerForm).forEach((field) => {
            if (registerForm[field] !== null) {
                document.getElementById(field).style.color = 'white'
            } else {
                filledOut = false;
            }
        })

        if (!filledOut) {
            setMessage('Not all fields have been filled.')
            setMessagecolor('red');
            return;
        }

        if (registerForm.password !== registerForm.confirm_password) {
            setMessage('Passwords do not match.')
            setMessagecolor('red');
            return;
        }

        /*
        Submit to database
            Check if organization exists
                do not register if organization DNE
            register to db
        */

        try {
            const newForm = {
                userID: null,
                firstName: formData.first_name,
                lastName: formData.last_name,
                organizationID: formData.organization_id,
                email: formData.email,
                password: formData.password
            }

            const response = await database.post('/auth/register', newForm);
            setMessage(response['data']);
            setMessagecolor('green');

        } catch (e) {
            console.log(e);
            setMessage(e.response.data);
            setMessagecolor('red');
        }

    }

    return (
        <div className="flex m-auto w-full items-center">
            <form className="border rounded-md drop-shadow-md m-auto w-1/3 bg-white mt-16">

                <div id="logo" className='block justify-center items-center bg-white m-auto mt-4'>
                    <img src={logo} alt="CoCreate Logo" className='w-12 h-12  text-center m-auto'/>
                    <h1 className=' text-2xl font-bold m-2 bg-white align text-center'>Register with CoCreate</h1>
                </div>

                <div id='Name' className={`${inputUI} border-none justify-between`}>
                    <div className="flex">
                        <p id="first_name" className={`text-red-700 mr-2`}>*</p>
                        <input type="text" placeholder="First Name" required className={`m-auto rounded-md border border-gray-200 text-sm h-12`}
                            onChange={(e) => handleFormData('first_name', e.target.value)}
                        />
                    </div>

                    <div className="flex">
                        <p id="last_name" className={`text-red-700 mr-2`}>*</p>

                        <input type="text" placeholder="Last Name" required className={`m-auto rounded-md border border-gray-200 text-sm h-12`}
                            onChange={(e) => handleFormData('last_name', e.target.value)}
                        />
                    </div>
                </div>

                {
                    Object.keys(form).filter((f) => !['first_name', 'last_name'].includes(f)).map((field, i) => {
                        return (
                            <div key={i}>
                                <div className={`${inputUI}`}>
                                    <p className={`text-red-700 mr-2`} id={field}>*</p>
                                    <input type={['password', 'confirm_password'].includes(field) ? 'password' : 'text'} placeholder={
                                        field.split('_').map((f) => {return f.charAt(0).toUpperCase() + f.substring(1,f.length)}).join(' ')
                                    } required className={`w-full border border-gray-200 rounded-md text-sm`}
                                        onChange={(e) => handleFormData(field, e.target.value)}
                                    />
                                </div>
                            </div>
                        )
                    })
                }

                <div className={`${inputUI}`}>
                    <p className={`${asterikUI} text-white`}>*</p>
                    <button type="button" className="  bg-purple-700 h-10 text-white rounded-md w-full font-semibold"
                        onClick={(e) => handleSubmit(e)}
                    >Register</button>
                </div>

                <div id="links" className="flex bg-white text-center w-4/5 m-auto my-4">
                    <a href="/signIn" className="m-auto text-xs text-center font-semibold">Already have an account? Sign in <span className="italic text-blue-500 underline">here</span>.</a>
                </div>

                <p className={`bg-white text-center text-sm mt-4 mb-4 font-semibold text-${messageColor}-500`}>{message}</p>

            </form>
        </div>
    );
}

