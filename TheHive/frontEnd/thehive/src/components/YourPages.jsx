import YourPageLink from "./YourPageLink";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrash, faPlus, faFileLines} from '@fortawesome/free-solid-svg-icons'
export default function YourPages(props) {
    const data = {props};

    return (
        <div id="YourPages" className="h-fit bg-white rounded-md drop-shadow-sm mt-4 block ml-0 w-4/5">
            <div id="header" className="flex items-center">
                <h2 className="ml-4 font-bold my-4 text-gray-900"><FontAwesomeIcon icon={faFileLines} className="mr-4"/>Pages</h2>
                <a href="/pages/new" className="ml-auto mr-4 text-xs font-semibold text-blue-700 border p-2 rounded border-blue-700">Add <FontAwesomeIcon className="" icon={faPlus}/></a>            
            </div>

            <div id="content" className="flex">
                
                {/* A few spaces joined */}
                { 
                    data?.pages?.length <= 5 &&
                    data?.pages?.map((space, i) => {
                        return (
                            <YourPageLink key={i}/>
                        );
                    })
                }

                {/* More than 5 spaces joined */}
                {
                    data?.pages?.length > 5 &&
                    data?.pages?.map((space, i) => {
                        return (
                            <YourPageLink key={i}/>
                        );
                    })
                    &&
                    <a href="/spaces" className="text-center m-auto text-sm font-semibold text-blue-700">View more spaces</a>
                }
                
            </div>
        </div>
    );
}