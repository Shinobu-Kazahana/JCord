import { initialProfile } from "@/lib/initial-profile";
import {db} from "@/lib/db";
import { redirect } from "next/navigation";
const SetupPage = async() => {
    const profile = await initialProfile();
    const server = await db.server.findFirst({
        where:{
            member:{
                some:{
                    profileID:profile.id
                }
            }
        }
    })


    if (server){
        return redirect(`/server/${server.id}`)
    }

    return ( <div>
        create a server
    </div> );
}
 
export default SetupPage;