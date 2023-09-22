import Space from "./Space";
export default function SideBar() {
    return (
        <div id="SideBar" className="w-1/5 p-4 bg-white flex h-screen">
            <ul className="m-auto w-4/5 block mt-8 items-center border text-center">
                <Space/>
                <a href='/Spaces'><li>Spaces</li></a> 
            </ul>
        </div>
    );
}