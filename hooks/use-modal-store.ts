import {create} from 'zustand';
import {Server} from "@prisma/client"
export type ModalType = "createServer"| "invite" | "editServer"

interface ModalData{
    server?: Server
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