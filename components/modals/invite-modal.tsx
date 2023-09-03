"use client";
import { useOrigin } from "@/hooks/use-origin";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw,Check } from "lucide-react";
import { useState } from "react";
import { set } from "zod";
import  axios  from "axios";



export const InviteModal = () => {



  const { isOpen, onClose, type, data,onOpen } = useModal();

  const origin = useOrigin();

  const { server } = data;

  const isModalOpen = isOpen && type === "invite";
  const [copied,setCopied] =useState(false);

  const [isLoading,setIsLoading] = useState(false);
  const inviteUrl = `${origin}/server/${server?.inviteCode}`;


const onCopy = ()=>{
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(()=>{
        setCopied(false);
    },1000)
}


const onNew = async()=>{
    try {
        setIsLoading(true);
        const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
        console.log(response)
        onOpen("invite",{server:response.data})
    }catch (error){
        console.log(error)
    } finally {
        setIsLoading(false);
    }
}




  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Invite Imaginary Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server Invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
            disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
              value={inviteUrl}
            ></Input>

            <Button onClick={onCopy} disabled={isLoading} className="" size="icon">
                {copied? <Check className="w-4 h-4"></Check> : <Copy className="w-4 h-4"></Copy>}
             
            </Button>
          </div>
          <Button
          onClick={onNew}
          disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinv-500 mt-4"
          >
            Generate A New Link <RefreshCw className="w-4 h-4 ml-2"></RefreshCw>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
