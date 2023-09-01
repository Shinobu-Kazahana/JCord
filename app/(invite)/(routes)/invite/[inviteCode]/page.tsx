import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

interface InviteCodePageProps {
  params: { inviteCode: string };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      member: {
        some: {
          profileID: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/server/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      member: {
        create: {
          profileID: profile.id,
        },
      },
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

  if (server){
    return redirect(`/servers/${server.id}`)
  }

  return (
    <div>
      <h1>Invite Code Page</h1>
    </div>
  );
};

export default InviteCodePage;
