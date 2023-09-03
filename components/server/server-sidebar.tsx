import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Hash, Mic, Video, ShieldCheck, ShieldAlert } from "lucide-react";
import { ChannelType, MemberRole } from "@prisma/client";
import ServerHeader from "@/components/server/server-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerSearch } from "@/components/server/server-search";
import { Separator } from "@/components/ui/separator";
import { ServerSection } from "@/components/server/server-section";
import { ServerChannel } from "@/components/server/server-channel";
import { ServerMember } from "@/components/server/server-member";
interface ServerSidebarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4"></Hash>,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4"></Mic>,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4"></Video>,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-blue-500"></ShieldCheck>
  ),
  [MemberRole.ADMIN]: (
    <ShieldAlert className="h-4 w-4 mr-2 text-rose-500"></ShieldAlert>
  ),
};

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
  const members = server?.member.filter((mem) => mem.profileID !== profile.id);

  if (!server) {
    return redirect("/");
  }

  const role = server?.member.find((mem) => mem.profileID === profile.id)?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader role={role} server={server} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          ></ServerSearch>
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"></Separator>

        <div className="my-8">
          {!!textChannels?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="channels"
                channelType={ChannelType.TEXT}
                role={role}
                label={"Text Channels"}
              ></ServerSection>
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                ></ServerChannel>
              ))}
            </div>
          )}
        </div>
        <div className="my-8">
          {!!audioChannels?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="channels"
                channelType={ChannelType.AUDIO}
                role={role}
                label={"Voice Channels"}
              ></ServerSection>
              {audioChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                ></ServerChannel>
              ))}
            </div>
          )}
        </div>
        <div className="my-8">
          {!!videoChannels?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="channels"
                channelType={ChannelType.VIDEO}
                role={role}
                label={"Video Channels"}
              ></ServerSection>
              {videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                ></ServerChannel>
              ))}
            </div>
          )}
        </div>
        <div className="my-8">
          {!!members?.length && (
            <div className="mb-2">
              <ServerSection
                sectionType="members"
                role={role}
                server={server}
                label={"Members"}
              ></ServerSection>
              {members.map((member) => (
                <ServerMember key={member.id} server={server} member={member}></ServerMember>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
