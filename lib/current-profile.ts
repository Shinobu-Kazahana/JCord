import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";



export const currentProfile = async ()=>{
    const {userId} = auth();
    if(!userId) throw new Error("Unauthorized");
    
    const profile = await db.profile.findUnique({
        where:{
            userId:userId
        }
    });
    if(!profile) throw new Error("Unauthorized");
    return profile;
}