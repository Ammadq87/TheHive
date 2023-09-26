export default function MiniMemberDisplay({name, data}) {
    return (
        <a className="flex border w-[350px] items-center m-4 ml-0 rounded-md p-2" href={`/teams/${name}/${data?.email}`}>
            <img className='w-8 h-8 rounded-full mx-4' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="" />
            <div>
                <p className="font-bold text-md">{data?.firstName + " " + data?.lastName}</p>
                <p className="text-sm">{name}</p>
            </div>
        </a>
    )
}