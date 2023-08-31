import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import  ServerHeader  from "@/components/server/server-header";
interface ServerSidebarProps {
  serverId: string;
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channel: {
        orderBy: {
          createdAt: "asc",
        },
      },
      member: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  //server get the channels array and filter it to get only the text channels
  const textChannels = server?.channel.filter(
    (chann) => chann.type === ChannelType.TEXT
  );

  //audio
  //server get the channels array and filter it to get only the audio channels
  const audioChannels = server?.channel.filter(
    (chann) => chann.type === ChannelType.AUDIO
  );

  //video
  //server get the channels array and filter it to get only the video channels
    const videoChannels = server?.channel.filter(
        (chann) => chann.type === ChannelType.VIDEO
    );

    //members
    //filter through current server members and get all the members that are not the current profile
    const members = server?.member.filter((mem)=> mem.profileID !== profile.id)

    if (!server) {
        return redirect('/')
    }

    const role = server?.member.find((mem)=> mem.profileID === profile.id)?.role

  return <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
    
    <ServerHeader  role={role} server={server}>

    </ServerHeader>
    
    </div>;
};
