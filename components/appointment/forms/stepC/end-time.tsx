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

interface EndTimeFormProps {
  mentor: Mentor;
  profile: Profile;
  appointment:Appointment;
}

const formSchema = z.object({
  endTime: z.string().min(1).max(25),
  
  mentorId: z.string().min(1).max(1000),
});

const allTimes = [
  "00:00","00:15","00:30","00:45",
  "01:00",
  "01:15",
  "01:30",
  "01:45",
  "02:00",
  "02:15",
  "02:30",
  "02:45",
  "03:00",
  "03:15",
  "03:30",
  "03:45",
  "04:00",
  "04:15",
  "04:30",
  "04:45",
  "05:00",
  "05:15",
  "05:30",
  "05:45",
  "06:00",
  "06:15",
  "06:30",
  "06:45",
  "07:00",
  "07:15",
  "07:30",
  "07:45",
  "08:00",
  "08:15",
  "08:30",
  "08:45",
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
  "17:45",
  "18:00",
  "18:15",
  "18:30",
  "18:45",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
  "21:15",
  "21:30",
  "21:45",
  "22:00",
  "22:15",
  "22:30",
  "22:45",
  "23:00",
  "23:15",
  "23:30",
  "23:45",
];

export type EndTimeFormValues = z.infer<typeof formSchema>;

export function EndTimeForm({
  mentor,
  profile,
  
  appointment,
}: EndTimeFormProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const form = useForm<EndTimeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      endTime: "00:00",
      mentorId: mentor.id,
    },
  });
  
  let mentorTimes:string[]=[];

  useEffect(() => {
    setIsMounted(true);
    
  }, []);

  if (!isMounted) return null;
  if(!mentor.startHour || !mentor.endHour || !appointment.startTime) return null;



  for(let i=0;i<allTimes.length;i++){
    if(allTimes[i]>appointment.startTime && allTimes[i]<mentor.endHour){
    
      mentorTimes.push(allTimes[i]);
    }
  }

  const onSubmit = async (data: EndTimeFormValues) => {
    try {
      setLoading(true);

      await axios.patch(`/api/appointments/${appointment.id}/stepC`, data);

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
            name="endTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-bold">End Time</FormLabel>

                
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select a end time." />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {mentorTimes.map((time) => (
                          <SelectItem value={time} key={time}>{time}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
               
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
