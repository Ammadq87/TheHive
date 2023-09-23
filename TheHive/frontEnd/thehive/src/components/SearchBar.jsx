import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
export default function SearchBar(props) {
    return (
        <div id="searchBar" className="flex mr-2 w-fit items-center bg-white border rounded-md">
            <FontAwesomeIcon icon={faMagnifyingGlass} className='m-2 bg-white text-xl'/>
            <input className="focus:outline-none border-none block items-center rounded-r-md w-80 h-10 text-sm" type="text" placeholder={props.placeholder}/>
        </div>

    );
}