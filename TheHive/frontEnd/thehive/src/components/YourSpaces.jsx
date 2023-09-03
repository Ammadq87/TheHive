import Space from "./Space";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';

export default function YourSpaces(props) {
    const data = {props};

    return (
        <div id="YourSpaces" className="w-1/6 bg-white rounded-md drop-shadow-sm mt-16 mx-8 block">
            <div id="header" className="flex items-center">
                <h2 className="ml-4 font-bold my-4 text-gray-900">Your Spaces</h2>
                <a href="/space/new" className="ml-auto mr-4 text-xs font-semibold text-blue-700 border p-2 rounded border-blue-700">Add <FontAwesomeIcon className="" icon={faPlus}/></a>            
            </div>

            <div id="content" className="flex">
                
                {/* A few spaces joined */}
                { 
                    data?.spaces?.length <= 5 &&
                    data?.spaces?.map((space, i) => {
                        return (
                            <Space key={i}/>
                        );
                    })
                }

                {/* More than 5 spaces joined */}
                {
                    data?.spaces?.length > 5 &&
                    data?.spaces?.map((space, i) => {
                        return (
                            <Space key={i}/>
                        );
                    })
                    &&
                    <a href="/spaces" className="text-center m-auto text-sm font-semibold text-blue-700">View more spaces</a>
                }
                
            </div>
        </div>
    );
}