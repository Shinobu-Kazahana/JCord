"use client";

import {Plus } from "lucide-react"
import ActionTooltip from "@/components/action-tooltip";
export const NavigationAction = () => {
  return (
    <div>
        <ActionTooltip side="right" align="center" label="Add A Server">
        <button className="group flex items-center">
        <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] bg-background transition-all overflow-hidden items-center justify-center dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus className="group-hover:text-white transiton text-emerald-500 " size={25}></Plus>
        </div>
      </button>
        </ActionTooltip>
      
    </div>
  );
};
