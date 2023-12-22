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

interface EditMentorProfileFormProps {
  profile: Profile;
  mentor: Mentor;
  onClose: () => void;
}
;

const formSchema = z.object({
  userName: z.string().min(1).max(25),
  firstName: z.string().min(1).max(25),
  lastName: z.string().min(1).max(25),
  email: z.string().email(),
 
});

export type EditMentorNamesFormValues = z.infer<typeof formSchema>;

const EditMentorNamesForm = ({
  profile,
  mentor,
  onClose,
}: EditMentorProfileFormProps) => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(false);
  const [freelance, setFreelance] = useState(false);

  const form = useForm<EditMentorNamesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: mentor?.userName || "",
      firstName: mentor?.firstName || "",
      lastName: mentor?.lastName || "",
      email: profile?.email || "",

    
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = async (data: EditMentorNamesFormValues) => {
    try {
      setLoading(true);

      await axios.patch(`/api/mentors/${mentor.id}/stepA`, data);

      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      onClose();
      router.refresh();
      setLoading(false);
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
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold">User Name</FormLabel>
                      <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                        Current User Name:{" "}
                        <p className="font-semibold text-emerald-800 dark:text-emerald-500">
                          {mentor?.userName}
                        </p>
                      </FormLabel>
                      <FormControl>
                        <Input
                          size="sm"
                          type="userName"
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
                <div className="flex items-center justify-center gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-bold">First Name</FormLabel>
                        <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                          Current First Name:{" "}
                          <p className="font-semibold text-emerald-800 dark:text-emerald-500">
                            {mentor?.firstName}
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            size="sm"
                            type="firstName"
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
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-bold">Last Name</FormLabel>
                        <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                          Current Last Name:{" "}
                          <p className="font-semibold text-emerald-800 dark:text-emerald-500">
                            {mentor?.lastName}
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            size="sm"
                            type="lastName"
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
               

             
              <div className="flex gap-2 flex-col  w-full">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-bold">Email</FormLabel>
                        <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                          Current Email:{" "}
                          <p className="font-semibold text-emerald-800 dark:text-emerald-500 pl-2">
                            {" "}
                            {profile?.email}
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            size="sm"
                            placeholder="Enter your email"
                            className="max-w-xs"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
export default EditMentorNamesForm;
