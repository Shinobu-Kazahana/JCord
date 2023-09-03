import {create} from 'zustand';
import {ChannelType, Server} from "@prisma/client"
export type ModalType = "createServer"| "invite" | "editServer" | "members" | "createChannel"

interface ModalData{
    server?: Server;
    channelType?:ChannelType;
}
interface ModalStore {
    type:ModalType | null;
    isOpen:boolean;
    onOpen:(type:ModalType,data?:ModalData) => void;
    data:ModalData;
    onClose:() => void;
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