export default function MiniMemberDisplay(props) {
    return (
        <a className="flex border w-[350px] items-center m-4 ml-0 rounded-md p-2" href={`hr1/ammad_qureshi`}>
            <img className='w-8 h-8 rounded-full mx-4' src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="" />
            <div>
                <p className="font-bold text-md">Ammad Qureshi</p>
                <p className="text-sm">HR1 — Software Engineer Intern</p>
            </div>
        </a>
    )
}