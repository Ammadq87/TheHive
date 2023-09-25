import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFile, faPeopleGroup, faComments, faBook} from '@fortawesome/free-solid-svg-icons';

const items = [
    {
        name: 'Teams',
        icon: faPeopleGroup,
        description: 'Create a dedicated team for like-minded individuals to collaborate and work on future projects together.',
        color: 'text-blue-500',
        link: 'teams/new'
    },
    {
        name: 'Documents',
        icon: faFile,
        description: 'Need some documentation? Or need to store a process? Create documents to save any important information that you have for your team.',
        color: 'text-teal-500',
        link: 'documents/new'
    },
    {
        name: 'Pages',
        icon: faBook,
        description: 'Organize related documents and posts in one area. Explore pages to learn more about your company and allow teams to expand upon their knowledge base.',
        color: 'text-orange-500',
        link: 'pages/new'
    }, 
    {
        name: 'Spaces',
        icon: faComments,
        description: 'A great way for teams to share ideas and documents. Post your thoughts or opinions and interact with each other\'s posts. Update each other on project status, introduce new initiatives, and so much more.',
        color: 'text-red-500',
        link: 'spaces/new'
    }
];

export default function Create() {
    return (
        <div id='Create'>
            <div id='feed' className="mt-8 w-11/12 m-auto h-screen ">
                <h2 className="font-bold  text-gray-900 w-full text-3xl">Create</h2>
                <div className='flex overflow-auto'>
                    {
                        items.map((item, i) => {
                            return (
                                itemCard(item)
                            )
                        })
                    }    
                </div>
            </div>
        </div>
    );
}

/**
 * Creates an item card for an item with the given information.
 * @param {Object} name 
 */
const itemCard = (item) => {

    return (
        <a className={`bg-white m-4 ml-0 p-2 rounded-md shadow-sm w-1/3 min-h-52 text-center overflow-hidden`} href={item.link}>
            <h1 className='font-bold text-2xl text-center mt-2'>{item.name}</h1>
            <FontAwesomeIcon className={`${item.color} text-3xl my-2`} icon={item.icon}/>
            <h3 className='text-left px-4'>{item.description}</h3>
        </a>
    )

}