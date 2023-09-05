import Navbar from "../components/Navbar";
import YourSpaces from "../components/YourSpaces";

export default function Home() {
    return (
        <div className="w-11/12 flex">
            <YourSpaces/>  
            
            <div id='feed' className="mt-16 w-screen h-screen border px-4">

                <h2 className="font-bold border text-gray-900 w- text-2xl">Your Feed</h2>

            </div>


        </div>
    );
}