import {getAuth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import { NextApiRequest } from "next";



export const currentProfilePages = async (req:NextApiRequest)=>{
    const {userId} = getAuth(req);
    if(!userId) throw new Error("Unauthorized");
    
    const profile = await db.profile.findUnique({
        where:{
            userId:userId
        }
    });
    if(!profile) throw new Error("Unauthorized");
    return profile;
}