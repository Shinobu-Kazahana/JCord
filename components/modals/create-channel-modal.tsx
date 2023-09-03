"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string";


import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useModal } from "@/hooks/use-modal-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChannelType } from "@prisma/client";
import { useEffect } from "react";
import { channel } from "diagnostics_channel";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Enter a Channel name" })

    .max(100, {
      message: "Server name must be less than 100 characters you loser",
    })
    .refine((name) => name !== "general", {
      message: "Channel name Cannot be 'general'",
    }),

  type: z.nativeEnum(ChannelType),
});

export const CreateChannelModal = () => {
  const { isOpen, onClose, type,data } = useModal();

  const router = useRouter();
  const params = useParams();
  const isModalOpen = isOpen && type === "createChannel";

  const {channelType} = data;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type:channelType || ChannelType.TEXT,
    },
  });


  //useEffect

  useEffect(() => {
    if (channelType) {
      form.setValue("type", channelType);
    }else{
      form.setValue("type", ChannelType.TEXT);
    }
  }, [channelType,form]);
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

        const url = qs.stringifyUrl({url:"/api/channels",query:{serverId:params?.serverId}})

      await axios.post(url, values)
      form.reset;
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  let errorMessage: any;
  if (
    form &&
    form.formState &&
    form.formState.errors &&
    form.formState.errors.name
  ) {
    errorMessage = form.formState.errors.name;
  }

  const handleClose = () => {
    form.reset;
    onClose();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Create Channel
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Channel Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          {...field}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter Channel Name"
                        />
                      </FormControl>

                      <FormMessage>{errorMessage}</FormMessage>
                    </FormItem>
                  );
                }}
              ></FormField>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Type</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offeset-0 capitalize outline-none">
                          <SelectValue placeholder="Select Channel Type"></SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
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
