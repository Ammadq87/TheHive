import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';

/**
 * search_type is the endpoint in the controller. main_search is a boolean reffering to if we are searching through the main search bar
 * @param {{search_type: ['user', 'team', 'space', 'page'], placeholder: null, main_search: false, receiveData}} props 
 * @returns 
 */
export default function SearchBar(props) {
    const search_type = props.search_type;
    const [results, setResults] = useState([]);
    const [input, setInput] = useState(null);

    const database = axios.create({baseURL: 'http://localhost:3000/api/v1'});

    /**
     * 
     * @param {string} input 
     */
    const search = async (event) => {
        if (event.key === 'Enter') {
            const _input = input;
            if (search_type.includes('user')) {
                try {
                    const response = await database.get(`/user/${_input}`);
                    const x = response['data'];
                    console.log(x);
                    setResults([...x]);
                } catch (e) {
                    console.log(e);
                }
            }
    
            // ToDo: create search types for other endpoints
        }
    }

    useEffect(() => {
        props?.receiveData(results);
    }, [results]);

    return (
        <div id="searchBar" className="flex mr-2 w-fit items-center bg-white border rounded-md">
            <FontAwesomeIcon icon={faMagnifyingGlass} className='m-2 bg-white text-xl'/>
            <input className="focus:outline-none border-none block items-center rounded-r-md w-80 h-10 text-sm" type="text" placeholder={props.placeholder}
            onChange={(e) => {console.log(e.target.value); setInput(e.target.value)}}
            onKeyDown={search}/>
        </div>

    );
}