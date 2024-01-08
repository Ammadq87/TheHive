/**
 * Displays information about members
 * @requires team and data
 * @param {string} type basic, edit, searchResult
 * @param {Object} team  
 * @param {Object} data 
 * @returns 
 */
export default function MiniMemberDisplay({type = 'basic', data, team}) {
    
    const User = JSON.parse(sessionStorage.getItem("User"));
    const profileLink = `/teams/${team['name']?.split(' ')?.map(w => {return w?.toLowerCase()})?.join('_')}/${data?.userID}`;
    const isMe = User?.userID === data?.userID;
    
    const member = team.members.find(x => x['userID'] === data['userID']);

    const updatePermission = (perm, value) => {
        member['can'+perm] = value;
    }

    // teamView => name, email, role, CRUD buttons, Manager Button
    if (type === 'edit') {
        const CRUD = ['Create', 'Read', 'Update', 'Delete'];
        return (
            <div className="flex border w-[450px] items-center m-4 ml-0 rounded-md p-2">
                <img className='w-8 h-8 rounded-full mx-4' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="" />
                <div>
                    <a className="font-bold text-md" href={`${profileLink}`}>{data?.firstName + " " + data?.lastName} {isMe ? '(Me)' : ''}</a>
                    <p className="text-xs italic">{data?.email}</p>
                    <p className="text-sm italic">{data?.role}</p>
                    <div id="permissions" className="flex">
                        {
                            CRUD.map((perm, i) => {
                                return (
                                    <div className={`flex ${i !== 0 ? 'ml-2' : ''} justify-normal items-center text-sm`} key={i}>
                                        <input
                                            type="checkbox"
                                            className="h-[16px] w-[16px]"
                                            defaultChecked={data['can'+perm] === true}
                                            onChange={(event) => {
                                                updatePermission(perm, event.target.checked);
                                            }}
                                        />
                                        <p className="ml-0.5">{perm}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    // searchResult => name, email, team
    else if (type === 'searchResult') {

    }

    // basic => name, team name, role, email
    else {
        return (
            <a className="flex border w-[350px] items-center m-4 ml-0 rounded-md p-2" href={`${profileLink}`}>
                <img className='w-8 h-8 rounded-full mx-4' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="" />
                <div>
                    <p className="font-bold text-md">{data?.firstName + " " + data?.lastName} {isMe ? '(Me)' : ''}</p>
                    <p className="text-xs italic">{data?.email}</p>
                    <p className="text-sm italic">{data?.role}</p>
                </div>
            </a>
        )
    }
}