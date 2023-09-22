import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faPager, faPlus, faQuoteLeft, faUser, faUsersLine} from '@fortawesome/free-solid-svg-icons';
import YourPages from './YourPages';

export default function SideBar() {

    
    const items = [
        {name: 'Overview', icon: faAlignLeft},
        {name: 'Blog', icon: faQuoteLeft},
        {name: 'Members', icon: faUsersLine}

    ]

    return (
        <div id="SideBar" className="w-1/6 p-4 bg-white block h-screen z-0">
            <ul className="m-auto w-4/5 block mt-8 items-center shadow-sm pb-2 text-center ml-0">
                <li>
                    <p className='text-md font-semibold text-left'>SpaceName</p>
                </li>
                {
                    items.map((item, i) => {
                        return(
                            <li className='flex items-center' key={i}>
                                <FontAwesomeIcon icon={item.icon} className='mr-4'/>
                                <a href={`/spaces/spaceName/${item.name.toLowerCase()}`} className=''>{item.name}</a>
                            </li>
                        );
                    })
                }
            </ul>
            <YourPages/>
        </div>
    );
}