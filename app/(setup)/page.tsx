import { initialProfile } from "@/lib/initial-profile";
import {db} from "@/lib/db";
import { redirect } from "next/navigation";

import  {InitialModal}  from "@/components/modals/initial-modal";
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
//create server if there is no server associated with the currently signed in user
    return ( <InitialModal></InitialModal> );
}
 
export default SetupPage;