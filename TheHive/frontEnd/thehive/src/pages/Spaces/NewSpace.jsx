import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFile, faUserGroup, faPeopleRoof} from '@fortawesome/free-solid-svg-icons';
import { useActionData } from 'react-router-dom';
import { useState } from 'react';

export default function NewSpace() {
    
    const [stepNumber, setStepNumber]  = useState(0);

    const spaces = [
        {name: 'Blank space', icon: faFile, color: 'text-blue-500', selected: false, bg: 'bg-none'}, 
        {name: 'Team space', icon: faUserGroup, color: 'text-teal-500', selected: false, bg: 'bg-none'}, 
        {name: 'Community Engagement', icon: faPeopleRoof, color: 'text-orange-500', selected: false, bg: 'bg-none'}];
    
    const handleSelection = (opt) => {
        spaces.forEach((space, i) => {
            space.bg = 'bg-none';
            space.selected = false;
        });

        spaces[opt].selected = !spaces[opt].selected;
        spaces[opt].bg = 'bg-blue-100';

        console.log(spaces);
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
                            <button onClick={() => {handleSelection(i)}} id={`spaceOption${i}`} className={`w-full h-12 flex text-center items-center ${option.bg} hover:bg-blue-100 rounded-sm`} key={i}> 
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
        if (step <= 1)
            setStepNumber(stepNumber + 1);
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
                        <button onClick={() => nextStep()} className='text-sm mx-1 px-4 py-1 w-18 text-center rounded-sm mr-0 bg-blue-600 text-white'>Next</button>
                    </div>
                </div>


            </div>

            

        </div>
    );
}