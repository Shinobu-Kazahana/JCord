"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (url?: string) => void; //set to anonymous function that returns nothing , accepts optional argument of type string
  value: string;
  endpoint: "messageFile" | "serverImage"; // could be one thing or the other, as shown in the api/uploadthing core file
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      //relative h-20 w-20
      <div className="relative h-32 w-32">
        <Image fill src={value} alt="upload" className="rounded-full" 
            
        >

        </Image>
        <button onClick={()=>{
            onChange("")
        }} className="bg-rose-500 text-white p-1 rounded-full absolute top-0  right-4 shadow-md" type="button">

        <X className="h-4 w-4"></X>
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err: Error) => {
        console.log(err);
      }}
    />
  );
};

export default FileUpload;
