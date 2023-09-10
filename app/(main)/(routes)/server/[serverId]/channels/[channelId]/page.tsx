import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {ChatHeader} from "@/components/chat/chat-header";
import {ChatInput} from "@/components/chat/chat-input";
import {ChatMessages} from "@/components/chat/chat-messages";

interface ChannelIdPageProps {
    params:{
        serverId: string;
        channelId: string;
    }
}


const ChannelIdPage = async ({params}:ChannelIdPageProps) => {
    const profile = await currentProfile();


    if (!profile){
        return redirectToSignIn();
    }

    const channel = await db.channel.findUnique({
        where:{
            id:params.channelId,
            
        }
    })
    const member = await db.member.findFirst({
        where:{
            serverID:params.serverId,
            profileID:profile.id
        }
    });

    if (!channel || !member){
        redirect("/")
    }

  return <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
    <ChatHeader name={channel.name}
    serverId={channel.serverID}
    type="channel"
    
    ></ChatHeader>

    <ChatMessages member={member} name={channel.name} chatId={channel.id} type="channel" apiUrl="/api/messages"socketUrl="/api/socket/messages" socketQuery={{channelId:channel.id,serverId:channel.serverID}} paramKey="channelId" paramValue={channel.id} ></ChatMessages>

    <ChatInput name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverID,
            }}></ChatInput>


  </div>;
};

export default ChannelIdPage;
