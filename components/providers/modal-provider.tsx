"use client";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useState, useEffect } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { MembersModal } from "../modals/members-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
    <MembersModal />
    <CreateChannelModal></CreateChannelModal>
    </>
  );
}
