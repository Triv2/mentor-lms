"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Appointment, Mentor, Profile } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@nextui-org/react";
import { Input } from "@/components/ui/input";

interface ConsultFormProps {
  mentor: Mentor;
  profile: Profile;
  appointment:Appointment;
}

const formSchema = z.object({
  
  title: z.string().min(1).max(1000),
  description: z.string().min(1).max(1000),
  mentorId: z.string().min(1).max(1000),
});

export type ConsultFormValues = z.infer<typeof formSchema>;

export function ConsultForm({
  mentor,
  profile,
  appointment,
}: ConsultFormProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const form = useForm<ConsultFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
     
      mentorId: mentor.id,
    },
  });
  

  useEffect(() => {
    setIsMounted(true);
    
  }, []);

  if (!isMounted) return null;
 

  const onSubmit = async (data: ConsultFormValues) => {
    try {
      setLoading(true);

      await axios.patch(`/api/appointments/${appointment.id}/stepD`, data);

      toast.success("Appointment Created!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      router.refresh();
      
      setLoading(false);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="flex gap-2 flex-col md:flex-row w-full p-2">
          
           
        </div>
        <div className="flex gap-2 flex-col md:flex-row w-full p-2">
       
        </div>
        <div className="flex gap-2 flex-col md:flex-row w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-bold">Title</FormLabel>

                <FormControl>
                  <Input
                    type="title"
                    placeholder="Please enter a name"
                    className="text-black rounded-md dark:text-white"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-bold">Description</FormLabel>

                <FormControl>
                  <Textarea
                    placeholder="Enter your description"
                    className="max-w-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
