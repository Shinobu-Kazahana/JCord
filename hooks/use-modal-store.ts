import {create} from 'zustand';
import {ChannelType,Channel, Server} from "@prisma/client"
export type ModalType = "createServer"| "invite" | "editServer" | "members" | "createChannel" |"deleteChannel"

interface ModalData{
    server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
}
interface ModalStore {
    type:ModalType | null;
    isOpen:boolean;
    onOpen:(type:ModalType,data?:ModalData) => void;
    data:ModalData;
    onClose:() => void;
    channel?:ChannelType;
}

export const useModal = create<ModalStore>((set) => {
    return {
        type:null,
        isOpen:false,
        onOpen:(type,data = {}) => set({isOpen:true, type:type,data:data}),
        onClose:() => set({type:null, isOpen:false}),
        data:{}
    }
});