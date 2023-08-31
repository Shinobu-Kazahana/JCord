"use client";
import { ServerWithMembersWithProfile } from "@/types";
import { MemberRole, Server } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {ChevronDown, UserPlus,Settings,Users} from "lucide-react"
//interface for props
interface ServerHeaderProps {
  server: ServerWithMembersWithProfile;
  role?:MemberRole  
}

const ServerHeader = ({server,role}:ServerHeaderProps) => {
    const isAdmin = role === MemberRole.ADMIN
    const isModerator = isAdmin || role === MemberRole.MODERATOR;



  return(
    <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
            {server.name}
            <ChevronDown className="h-5 w-5 ml-auto"></ChevronDown>

        </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isModerator &&(
            <DropdownMenuItem className="text-blue-600 dark:text-blue-400 px-3 py-2 text-sm cursor-pointer">
                Invite Imaginary Friends
                <UserPlus className="h-4 w-4 ml-auto"></UserPlus>
            </DropdownMenuItem>
        )}
         {isAdmin &&(
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                Server Settings
                <Settings className="h-4 w-4 ml-auto"></Settings>
            </DropdownMenuItem>
        )}

    {isModerator &&(
            <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                Manage Friends
                <Users className="h-4 w-4 ml-auto"></Users>
            </DropdownMenuItem>
        )}

        </DropdownMenuContent>
    </DropdownMenu>
  );
};


export default ServerHeader;
