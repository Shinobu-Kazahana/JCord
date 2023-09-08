import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIdProps {
  params: {
    serverId: string;
  };
}

const ServerIdPage = async ({ params }: ServerIdProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where:{
        id:params.serverId,
        member:{
            some:{
                profileID:profile.id
            }
        }
    },

    include:{
        channel:{
            where:{
                name:"general"
            },
            orderBy:{
                createdAt:"asc"
            }
        },
       
    }
  })

  const initialChannel = server?.channel[0];


  if(initialChannel?.name !== "general"){
    return null;
  }
  return redirect(`/server/${params.serverId}/channels/${initialChannel?.id}`)

 
};

export default ServerIdPage;
