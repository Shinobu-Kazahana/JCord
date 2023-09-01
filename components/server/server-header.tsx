"use client";
import { ServerWithMembersWithProfile } from "@/types";
import { MemberRole, Server } from "@prisma/client";
import {useModal} from "@/hooks/use-modal-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, UserPlus, Settings, Users, PlusCircle, Trash, LogOut } from "lucide-react";
import { use } from "react";
//interface for props
interface ServerHeaderProps {
  server: ServerWithMembersWithProfile;
  role?: MemberRole;
}

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const {onOpen} = useModal();
  const isAdmin = role === MemberRole.ADMIN;

  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto"></ChevronDown>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem onClick={()=>{onOpen("invite",{server:server})}} className="text-blue-600 dark:text-blue-400 px-3 py-2 text-sm cursor-pointer">
            Invite Imaginary Friends
            <UserPlus className="h-4 w-4 ml-auto"></UserPlus>
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
            Server Settings
            <Settings className="h-4 w-4 ml-auto"></Settings>
          </DropdownMenuItem>
        )}
         {isAdmin && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
            Manage Members
            <Users className="h-4 w-4 ml-auto"></Users>
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
            Create Channel
            <PlusCircle className="h-4 w-4 ml-auto"></PlusCircle>
          </DropdownMenuItem>
        )}

{isModerator && (
          <DropdownMenuSeparator >
            </DropdownMenuSeparator>
        )}
           {isAdmin && (
          <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
            Delete Server
            <Trash className="h-4 w-4 ml-auto"></Trash>
          </DropdownMenuItem>
        )}
         {!isAdmin && (
          <DropdownMenuItem className="text-rose-500 px-3 py-2 text-sm cursor-pointer">
            Leave Server
            <LogOut className="h-4 w-4 ml-auto"></LogOut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
