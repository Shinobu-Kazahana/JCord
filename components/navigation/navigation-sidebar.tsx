import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { NavigationAction } from "@/components/navigation/navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavigationItem  from "@/components/navigation/navigation-item";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import styles from "@/components/styles/user-button.module.css"

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }
  const servers = await db.server.findMany({
    where: {
      member: {
        some: {
          profileID: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction></NavigationAction>

      <Separator className="h-[1px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"></Separator>
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => {
          return (
            <div key={server.id}>
                <div className="mb-4">
                <NavigationItem id={server.id} name={server.name} imgUrl={server.imageUrl}></NavigationItem>
                </div>
      
            </div>
          );
        })}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        
        <ModeToggle></ModeToggle>
        <UserButton  afterSignOutUrl="/" appearance={{elements:{avatarBox:"h-[48px] w-[48px]"}}}></UserButton>
      </div>
    </div>
  );
};
