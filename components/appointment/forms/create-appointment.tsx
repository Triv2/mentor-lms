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

interface CreateAppointmentFormProps {
  mentor: Mentor;
  profile: Profile;
  appointments?:Appointment[];
}

const formSchema = z.object({
  startTime: z.string().min(1).max(25),
  endTime: z.string().min(1).max(25),
  startDate: z.date({
    required_error: "A start time is required.",
  }),
  
  title: z.string().min(1).max(1000),
  description: z.string().min(1).max(1000),
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

export type CreateAppointmentFormValues = z.infer<typeof formSchema>;

export function CreateAppointmentForm({
  mentor,
  profile,
  appointments,
}: CreateAppointmentFormProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const form = useForm<CreateAppointmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date(),
      startTime: "00:00",
      endTime: "00:00",
      mentorId: mentor.id,
    },
  });
  
  let mentorTimes:string[]=[];
  let endTimes:string[]=[];

  useEffect(() => {
    setIsMounted(true);
    
  }, []);

  if (!isMounted) return null;
  if(!mentor.startHour || !mentor.endHour) return null;



  for(let i=0;i<allTimes.length;i++){
    if(allTimes[i]>mentor.startHour && allTimes[i]<mentor.endHour){
      appointments?.forEach((appointment) => {
        if (appointment?.startTime === allTimes[i] || appointment?.endTime === allTimes[i]) {
          mentorTimes.push(allTimes[i]);
        }
      });
      mentorTimes.push(allTimes[i]);
    }
  }
  endTimes=mentorTimes;

  const onSubmit = async (data: CreateAppointmentFormValues) => {
    try {
      setLoading(true);

      await axios.post(`/api/appointments/`, data);

      toast.success("Appointment Created!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      router.refresh();
      router.push("/");
      setLoading(false);
    }
  };

  const handleChange = (field:any)=> {
    for (let i=0;i<mentorTimes.length;i++){
      if(mentorTimes[i] === field){
        endTimes = mentorTimes.slice(i+1);
      }
      
  }form.setValue("endTime", endTimes[0]);
}
  const handleChangeEnd = (field:any)=> {
    if(field !== endTimes[0]){

    }}


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
        <div className="flex gap-2 flex-col md:flex-row w-full p-2">
        <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-bold">Start Time</FormLabel>

                
                  <Select
                    onValueChange={()=>{handleChange(field.onChange)}}
                    defaultValue={field.value}
                  >
                    <FormControl>
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select a start time." />
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
                      <SelectValue placeholder="Select a start time." />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {endTimes.map((time) => (
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
