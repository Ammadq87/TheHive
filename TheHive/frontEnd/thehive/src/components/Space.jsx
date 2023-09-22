import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrash} from '@fortawesome/free-solid-svg-icons'

export default function Space (props) {
    const data = {props};

    return (
        <div id="Space" className='flex w-full p-2 items-center bg-white my-2'>
            <img src="https://upload.wikimedia.org/wikipedia/en/2/22/York_Lions_Logo.png" alt="" className='h-8 ml-2'/>
            <a href={generateSpaceLink(data?.title)} id="title" className='w-3/5 text-left pl-2 bg-white font-medium text-sm'>YorkU Week0</a>

            {
                data?.favourite && 
                <p className='ml-auto mr-2 bg-white'><FontAwesomeIcon className='text-yellow-300 bg-white' icon={faStar}/>
            </p>         
            }
            
        </div>
    );
}

const generateSpaceLink = (text) => {
    return `/${text?.split(' ').join('_')}`;
}