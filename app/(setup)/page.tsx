import { initialProfile } from "@/lib/initial-profile";
import {db} from "@/lib/db";
import { redirect } from "next/navigation";

import  {InitialModal}  from "@/components/modals/initial-modal";
const SetupPage = async() => {
    //get the profile of the currently signed in user
    const profile = await initialProfile();
    //get the first server associated with the currently signed in user
    const server = await db.server.findFirst({
        where:{
            member:{
                some:{
                    profileID:profile.id
                }
            }
        }
    })


    //if there is a server associated with the currently signed in user, redirect to that server
    if (server){
        return redirect(`/server/${server.id}`)
    }
//create server if there is no server associated with the currently signed in user
    return ( <InitialModal></InitialModal> );
}
 
export default SetupPage;