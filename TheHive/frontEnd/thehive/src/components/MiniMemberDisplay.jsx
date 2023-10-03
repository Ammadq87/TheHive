export default function MiniMemberDisplay({name, data, showEmail}) {
    const User = JSON.parse(sessionStorage.getItem("User"));
    const isMe = User?.userID === data?.userID;

    const profileLink = `/teams/${name?.split(' ')?.map(w => {return w?.toLowerCase()})?.join('_')}/${data?.userID}`;
    console.log(data);

    return (
        <a className="flex border w-[350px] items-center m-4 ml-0 rounded-md p-2" href={`${profileLink}`}>
            <img className='w-8 h-8 rounded-full mx-4' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="" />
            <div>
                <p className="font-bold text-md">{data?.firstName + " " + data?.lastName} {isMe ? '(Me)' : ''}</p>
                <p className="text-sm">{name}</p>
                <p className="text-sm italic">{data?.role}</p>
                {
                    showEmail &&
                    <p className="text-sm">{data?.email}</p>
                }
            </div>
        </a>
    )
}