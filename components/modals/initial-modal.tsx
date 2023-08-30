"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from "@/components/file-upload";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Enter a server name you loser" })
    .max(100, {
      message: "Server name must be less than 100 characters you loser",
    }),
  imageUrl: z.string().min(1, { message: "Server image is required" }),
});

export const InitialModal = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);
      form.reset
      router.refresh()
      window.location.reload()
      
     

    } catch (error) {
      console.log(error);
    }
  };

  if (!isMounted) {
    return null;
  }

  let errorMessage: any;
  if (
    form &&
    form.formState &&
    form.formState.errors &&
    form.formState.errors.name
  ) {
    errorMessage = form.formState.errors.name;
  }
  return (
    <Dialog open>
         {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome To JCord, Please Create Your Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Please create your server. Unless you are JR. You can always change
            it later
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField control={form.control} name="imageUrl" render={({field})=>{
                    return (
                        <FormItem>
                           <FormControl>
                           <FileUpload  value={field.value} onChange={field.onChange} endpoint="serverImage"/>

                         
                           </FormControl>
                        </FormItem>
                    )
                }}></FormField>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          {...field}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter Server Name"
                        />
                      </FormControl>

                      <FormMessage>
                        {errorMessage}
                      </FormMessage>
                    </FormItem>
                  );
                }}
              ></FormField>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading} variant="primary" type="submit">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
