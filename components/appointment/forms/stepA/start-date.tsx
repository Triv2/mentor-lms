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

interface StartDateFormProps {
  mentor: Mentor;
  profile: Profile;
  
}

const formSchema = z.object({
  mentorId: z.string().min(1).max(1000),
  startDate: z.date({
    required_error: "A start time is required.",
  }),
 
});



export type StartDateFormValues = z.infer<typeof formSchema>;

export function StartDateForm({
  mentor,
 
 
}: StartDateFormProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const form = useForm<StartDateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mentorId: mentor.id,
      startDate: new Date(),
      
    },
  });
  
  
  useEffect(() => {
    setIsMounted(true);
    
  }, []);

  

  const onSubmit = async (data: StartDateFormValues) => {
    try {
      setLoading(true);

      await axios.post(`/api/appointments/stepA`, data);

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
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Appointment Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Date of appointment is required.
                </FormDescription>
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
