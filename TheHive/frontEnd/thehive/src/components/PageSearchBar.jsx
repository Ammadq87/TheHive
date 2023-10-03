import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';

/**
 * searchType must be an endpoint name: ['user', 'team', 'space', 'page']. 
 * receiveData is a function to send data to parent component
 * @param {{searchType: 'user', receiveData, placeholder}} props
 * @deprecated
 */
export default function PageSearchBar(props) {
    const {searchType, receiveData, placeholder} = props;
    const [results, setResults] = useState([]);
    const [input, setInput] = useState(null);

    const database = axios.create({baseURL: 'http://localhost:3000/api/v1'});

    const sendToPage = () => {
    }

    const search = async (event) => {
        if (event.key === 'Enter') {
            const _input = input;
            try {
                const response = await database.get(`/${searchType}/${_input}`);
                const x = response['data'];
                setResults([...x]);
                sendToPage();
            } catch (e) {
                console.log(e);
            }
        }
    }
    
    useEffect(() => {
        receiveData(results);
    }, [results]);

    return (
        <>
            <div id="pageSearchBar" className="flex mr-2 w-fit items-center bg-white border rounded-md">
                <FontAwesomeIcon icon={faMagnifyingGlass} className='m-2 bg-white text-xl'/>
                <input className="focus:outline-none border-none block items-center rounded-r-md w-80 h-10 text-sm" type="text" placeholder={placeholder}
                onChange={(e) => {console.log(e.target.value); setInput(e.target.value)}}
                onKeyDown={search}/>
            </div>
        </>
    )
}