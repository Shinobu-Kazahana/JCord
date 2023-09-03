
"use client"

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client"
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {cn} from "@/lib/utils";
import ActionTooltip from "@/components/action-tooltip";
import { useModal,ModalType } from "@/hooks/use-modal-store";
const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
}

interface ServerChannelProps {
    channel:Channel;
    server:Server;
    role?:MemberRole;
}

export const ServerChannel = ({channel,server,role}:ServerChannelProps)=>{
    const {onOpen} = useModal();
    const params = useParams();
    const router = useRouter();

    const onClick = () => {
        router.push(`/server/${server.id}/channels/${channel.id}`)
    }

    const onAction=(e:React.MouseEvent,action:ModalType)=>{
        e.stopPropagation();
        onOpen(action,{server,channel});
    }



    const Icon = iconMap[channel.type];






    return (
    



   <button onClick = {()=>{onClick()}} className={cn("group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",params?.channelId === channel.id &&"bg-zinc-700/20 dark:bg-zinc-700")}>
 <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400"></Icon>
 <p className={cn("line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",params?.channelId === channel.id && "text-primary darl:text-zinc-200 dark:group-hover:text-white")}>
    {channel.name}
 </p>

 {channel.name !== "general" && role !== MemberRole.GUEST && (

    <div className="ml-auto flex items-center gap-x-2">
        
        <ActionTooltip label="Yeet Channel">
            <Trash onClick={(e)=>{onAction(e,"deleteChannel")}} className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"></Trash>
        </ActionTooltip>
    </div>
 )}
 {channel.name === "general" && (<Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400"></Lock>)}
   </button>
  
    )
}