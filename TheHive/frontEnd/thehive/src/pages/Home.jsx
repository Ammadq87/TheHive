import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import YourSpaces from "../components/YourSpaces";

export default function Home() {

    const [showHomePage, setShowHomePage] = useState(false);
    
    const User = JSON.parse(sessionStorage.getItem('User'));

    useEffect(() => {
        setShowHomePage(!User ? true: false);
    }, []);

    return (
        <div className="w-11/12   m-auto">

            { showHomePage &&
                <div className="flex">
                    <YourSpaces/>  
                    <div id='feed' className="mt-16 w-5/6 h-screen flex ">
                        <h2 className="font-bold border text-gray-900 w-full text-2xl">Your Feed</h2>
                    </div>
                </div>
            }

            { !showHomePage &&
                <div className="m-auto w-1/2  text-center mt-80">
                    <h2 className="font-bold ">Please <a href="/signIn" className="text-blue-700 underline italic">sign-in</a> to start creating 🧰</h2>
                </div>
            }
        </div>
    );
}