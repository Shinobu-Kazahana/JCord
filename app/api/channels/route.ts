import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { MemberRole } from "@prisma/client";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 404 });
    }
    if (!name) {
      return new NextResponse("Channel Name Missing", { status: 400 });
    }
    if (!type) {
      return new NextResponse("Channel Type Missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Channel Name Reserved", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        member: {
          some: {
            profileID: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },

      data: {
        channel: {
          create: {
            profileID: profile.id,
            name: name,
            type: type,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNELS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
