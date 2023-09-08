import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFile, faUserGroup, faPeopleRoof, faUser, faBookOpen, faDiagramProject} from '@fortawesome/free-solid-svg-icons';
import { useActionData } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function NewSpace() {
    
    const [stepNumber, setStepNumber]  = useState(0);
    const [selected, setSelected] = useState(-1);

    const spaces = [
        {name: 'Personal', icon: faUser, color: 'text-blue-500', bg: 'bg-none'}, 
        {name: 'Team', icon: faUserGroup, color: 'text-teal-500', bg: 'bg-none'}, 
        {name: 'Project', icon: faDiagramProject, color: 'text-red-500', bg: 'bg-none'}, 
    ];

    const [spaceCreationForm, setSpaceCreationForm] = useState({
        type: spaces[selected],
        name: null,
        teamAccess: []
    }); 

    const handleSpaceCreation = (field, value) => {
        const spc = spaceCreationForm;
        if (field === 'teamAccess') {
            value = value.split(',');
            value = value.map(v => {
                return v.trim();
            })
            spc.teamAccess = [...value];
        } else {
            spc.name = value;
        }
        setSpaceCreationForm({...spc});
    };

    useEffect(() => {
        console.log(spaceCreationForm)
    }, [spaceCreationForm]);

    const handleSelection = (opt) => {
        for (let i=0; i<spaces.length; i++) 
            document.getElementById('spaceOption'+i).style.backgroundColor = '';
        document.getElementById('spaceOption'+opt).style.backgroundColor = 'rgb(219 234 254)';
        setSelected(opt);
        
        const spc = spaceCreationForm;
        spc.type = opt;
        setSpaceCreationForm({...spc});
    }

    const steps = [
        <div id='step1'>
            <h2 className="font-medium text-gray-800 text-2xl ml-0">Create a new space</h2>
            <h4 className="text-gray-600 text-sm font-regular ml-0">Create, collaborate, and organize work in one place.</h4>

            <h4 className="mt-4 font-semibold text-blue-900">Select a template to get a jump start or create a space from scratch</h4>

            <div id="actions" className="flex">
                <div id="options" className="w-1/2 block border mt-2 p-4 rounded-sm border-gray-100">

                {
                    spaces.map((option, i) => {
                        return (
                            <button 
                                onClick={() => {handleSelection(i)}} 
                                id={`spaceOption${i}`} 
                                className={`w-full h-12 flex text-center items-center ${option.bg} hover:bg-blue-100 rounded-sm`} 
                                key={i}> 
                                    <FontAwesomeIcon className={`${option.color} w-6 h-6 px-4`} icon={option.icon}/>
                                    <p className='font-semibold text-gray-700'>
                                        {option.name}
                                    </p>
                            </button>
                        );
                    })
                }


                </div>

                <div id="description" className="w-1/2 block border mt-2 p-4 rounded-sm border-gray-100">
                    {
                        
                    }
                </div>
            </div>
        </div>,
        <div id='step2'>
            <h2 className="font-medium text-gray-800 text-2xl ml-0">Add details to your new {spaces[selected]?.name} space.</h2>
            <h4 className="mt-4 font-semibold text-blue-900">Add space details</h4>

            <form action="" className='mt-4'>
                <p className='text-sm text-gray-700 font-medium'>Name <span className='text-red-500'>*</span></p>
                <input value={spaceCreationForm?.name} onChange={(e) => {handleSpaceCreation('name', e.target.value)}} type="text" required className='rounded-md bg-gray-50 border-2'/>

                {
                    spaces[selected]?.name !== 'Personal' &&
                    <div>
                        <p className='mt-4 text-sm text-gray-700 font-medium'>Team Access <span className='text-xs font-bold'>(Separate by commas)</span></p>
                        <input value={spaceCreationForm?.teamAccess} onChange={(e) => {handleSpaceCreation('teamAccess', e.target.value)}} type="text" className='rounded-md bg-gray-50 border-2' />
                    </div>
                    
                }
            </form>
        </div>

    ]

    const goBack = () => {
        const step = stepNumber;
        if (step !== 0)
            setStepNumber(stepNumber - 1);
        else {
            location.href = '/';
        }
    }

    const nextStep = () => {
        const step = stepNumber;

        if (step === 0 && selected === -1) {
            alert("Please select an option before continuing");
            return;
        }

        if (step < 1)
            setStepNumber(stepNumber + 1);

        if (step === 1) {
            //validate if name is not empty
            if (!spaceCreationForm['name']) {
                alert("Please enter a name for your space");
                return;
            }
            
            //submit space information to db
            location.href = `/spaces/${spaceCreationForm?.name?.split(' ').join('_')}`
        }
    }

    return (
        <div id="NewSpace" className="">

            <div id="modal" className="border m-auto w-2/5 p-4 mt-16 rounded-md shadow-sm bg-white">

                {
                    steps[stepNumber]
                }
                
                <div id='steps' className='flex items-center mt-4'>
                    <p className='mr-auto text-xs'>Step {stepNumber + 1} of 2</p>
                    
                    <div id='actions'>
                        <button onClick={() => goBack()} className='text-sm mx-1 px-4 py-1 w-18 text-center rounded-sm bg-gray-100'>{stepNumber === 0 ? 'Cancel' : 'Back'}</button>
                        <button type='submit' onClick={() => nextStep()} className='text-sm mx-1 px-4 py-1 w-18 text-center rounded-sm mr-0 bg-purple-600 text-white'>{stepNumber === 0 ? 'Next' : 'Create Space'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}