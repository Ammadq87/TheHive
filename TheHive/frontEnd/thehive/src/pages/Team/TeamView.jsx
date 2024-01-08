import MiniMemberDisplay from "../../components/MiniMemberDisplay"

/**
 * 
 * @param {JSON[]} members 
 * @returns 
 */
export default function TeamView({members}) {
    return (
        <>
            <div id="TeamView" className="border border-red-500 w-full">
                <h2 className="font-bold  text-gray-900 w-full text-lg">Edit Team</h2>
                <p className="justify-between text-sm">Grant permissions to each member and select the team manager. You can also do this on the edit team settings</p>

                {
                    members.map((member, i) => {
                        return (
                            <MiniMemberDisplay type={'teamView'} data={member} key={i}/>
                        )
                    })
                }


            </div>
        
        
        
        
        </>
    )
}