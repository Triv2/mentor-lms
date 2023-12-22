"use client";
import { Mentor, Profile } from "@prisma/client";
import React, { useState, useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
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
  Button,
  Checkbox,
  Input,
  Link,
  Textarea,
  Switch,
} from "@nextui-org/react";
import { Input as ShadcnInput } from "@/components/ui/input";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { Lock, Users, X } from "lucide-react";
import { FileUpload } from "@/components/file-upload";
// import { Textarea } from '@/components/ui/textarea';

interface EditMentorWorkFormProps {
  profile: Profile;
  mentor: Mentor;
  onClose: () => void;
}
const allHours = [
  "0:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const formSchema = z.object({
  subscriptionCost: z.coerce.number().min(1).max(1000),
  rateCost: z.coerce.number().min(1).max(1000),
  freelanceUrl: z.string().min(1).max(1000),
  startHour: z.string().min(1).max(100),
  endHour: z.string().min(1).max(100),
  timezone: z.string().default(""),
});

export type EditMentorWorkFormValues = z.infer<typeof formSchema>;

const EditMentorWorkForm = ({
  profile,
  mentor,
  onClose,
}: EditMentorWorkFormProps) => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(false);
  const [freelance, setFreelance] = useState(false);

  const form = useForm<EditMentorWorkFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subscriptionCost: parseFloat(String(mentor?.subscriptionCost)) || 0,
      rateCost: parseFloat(String(mentor?.rateCost)) || 0,
      freelanceUrl: mentor?.freelanceUrl || "",
      startHour: mentor?.startHour || "",
      endHour: mentor?.endHour || "",
      timezone: mentor?.timezone || "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = async (data: EditMentorWorkFormValues) => {
    try {
      setLoading(true);

      await axios.patch(`/api/mentors/${mentor.id}/stepC`, data);

      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      onClose();
      router.refresh();
      setLoading(false);
    }
  };

 

  const handleFreelanceClick = () => {
    if (freelance) {
      setFreelance(false);
    } else {
      setFreelance(true);
    }
  };

  return (
    <>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 bg-zinc-200 dark:bg-zinc-700 rounded-md p-5 w-full"
          >
            <div className="grid sm:grid-cols-2 gap-5 w-full">
              <div className="flex gap-2 flex-col  w-full">
               
                <div className="flex items-center justify-center gap-2">
                  
                  
                </div>
                
                <div className="flex items-center">
                  <FormField
                    control={form.control}
                    name="startHour"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-bold">
                          Start of Office Hours
                        </FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[6rem]">
                              <SelectValue placeholder="Select a start time." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {allHours.map((time) => (
                                <SelectItem value={time} key={time}>
                                  {time}
                                </SelectItem>
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
                    name="endHour"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-bold">
                          End of Office Hours
                        </FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[6rem]">
                              <SelectValue placeholder="Select a end time." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {allHours.map((time) => (
                                <SelectItem value={time} key={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold">Timezone</FormLabel>

                      <Select onValueChange={field.onChange}
                          defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Select a timezone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>North America</SelectLabel>
                            <SelectItem value="Eastern Standard Time (EST)">
                              Eastern Standard Time (EST)
                            </SelectItem>
                            <SelectItem value="Central Standard Time (CST)">
                              Central Standard Time (CST)
                            </SelectItem>
                            <SelectItem value="Mountain Standard Time (MST)">
                              Mountain Standard Time (MST)
                            </SelectItem>
                            <SelectItem value="Pacific Standard Time (PST)">
                              Pacific Standard Time (PST)
                            </SelectItem>
                            <SelectItem value="Alaska Standard Time (AKST)">
                              Alaska Standard Time (AKST)
                            </SelectItem>
                            <SelectItem value="Hawaii Standard Time (HST)">
                              Hawaii Standard Time (HST)
                            </SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Europe & Africa</SelectLabel>
                            <SelectItem value="Greenwich Mean Time (GMT)">
                              Greenwich Mean Time (GMT)
                            </SelectItem>
                            <SelectItem value="Central European Time (CET)">
                              Central European Time (CET)
                            </SelectItem>
                            <SelectItem value="Eastern European Time (EET)">
                              Eastern European Time (EET)
                            </SelectItem>
                            <SelectItem value="Western European Summer Time (WEST)">
                              Western European Summer Time (WEST)
                            </SelectItem>
                            <SelectItem value="Central Africa Time (CAT)">
                              Central Africa Time (CAT)
                            </SelectItem>
                            <SelectItem value="East Africa Time (EAT)">
                              East Africa Time (EAT)
                            </SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Asia</SelectLabel>
                            <SelectItem value="Moscow Time (MSK)">
                              Moscow Time (MSK)
                            </SelectItem>
                            <SelectItem value="India Standard Time (IST)">
                              India Standard Time (IST)
                            </SelectItem>
                            <SelectItem value="China Standard Time (CST">
                              China Standard Time (CST)
                            </SelectItem>
                            <SelectItem value="Japan Standard Time (JST)">
                              Japan Standard Time (JST)
                            </SelectItem>
                            <SelectItem value="Korea Standard Time (KST)">
                              Korea Standard Time (KST)
                            </SelectItem>
                            <SelectItem value="Indonesia Central Standard Time (WITA)">
                              Indonesia Central Standard Time (WITA)
                            </SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Australia & Pacific</SelectLabel>
                            <SelectItem value="Australian Western Standard Time (AWST)">
                              Australian Western Standard Time (AWST)
                            </SelectItem>
                            <SelectItem value="Australian Central Standard Time (ACST)">
                              Australian Central Standard Time (ACST)
                            </SelectItem>
                            <SelectItem value="Australian Eastern Standard Time (AEST)">
                              Australian Eastern Standard Time (AEST)
                            </SelectItem>
                            <SelectItem value="New Zealand Standard Time (NZST)">
                              New Zealand Standard Time (NZST)
                            </SelectItem>
                            <SelectItem value="Fiji Time (FJT)">Fiji Time (FJT)</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>South America</SelectLabel>
                            <SelectItem value="Argentina Time (ART)">
                              Argentina Time (ART)
                            </SelectItem>
                            <SelectItem value="Bolivia Time (BOT)">
                              Bolivia Time (BOT)
                            </SelectItem>
                            <SelectItem value="Brasilia Time (BRT)">
                              Brasilia Time (BRT)
                            </SelectItem>
                            <SelectItem value="Chile Standard Time (CLT)">
                              Chile Standard Time (CLT)
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

               
              </div>
              <div className="flex gap-2 flex-col  w-full">
              
               

                <div className="flex items-center justify-center gap-2">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="subscriptionCost"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-bold">
                            Subscription Cost
                          </FormLabel>
                          <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                            Current Price:{" "}
                            <p className="font-semibold text-emerald-800 dark:text-emerald-500 pl-2">
                              {" "}
                              {mentor?.subscriptionCost}
                            </p>
                          </FormLabel>
                          <FormControl>
                            <ShadcnInput
                              type="number"
                              disabled={loading}
                              placeholder="0.00"
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
                      name="rateCost"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="font-bold">
                            15 Minute Rate
                          </FormLabel>
                          <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                            Current Rate:{" "}
                            <p className="font-semibold text-emerald-800 dark:text-emerald-500 pl-2">
                              {" "}
                              {mentor?.rateCost}
                            </p>
                          </FormLabel>
                          <FormControl>
                            <ShadcnInput
                              type="number"
                              disabled={loading}
                              placeholder="0.00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between flex-col gap-3 px-2 py-4">
                  <div className="flex items-center flex-col justify-center">
                    <Switch
                      defaultSelected
                      size="sm"
                      onClick={() => handleFreelanceClick()}
                    >
                      <p className="text-xs">Are you freelancing?</p>
                    </Switch>
                    {freelance && (
                      <FormField
                        control={form.control}
                        name="freelanceUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Freelancing Url</FormLabel>
                            <FormControl>
                              <Input
                                size="sm"
                                placeholder="Enter your free-lance url"
                                className="max-w-xs"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                 
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Button
                className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-800 text-white hover:bg-emerald-500 transition-all text-sm shadow-md"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
export default EditMentorWorkForm;
