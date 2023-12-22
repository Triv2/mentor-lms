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

interface EditMentorDetailsFormProps {
  profile: Profile;
  mentor: Mentor;
  onClose: () => void;
}

const formSchema = z.object({
  
  title: z.string().min(1).max(75),
  location: z.string().min(1).max(75),
  imageUrl: z.string().default(""),
  about: z.string().min(1).max(1000),


});

export type EditMentorDetailsFormValues = z.infer<typeof formSchema>;

const EditMentorDetailsForm = ({
  profile,
  mentor,
  onClose,
}: EditMentorDetailsFormProps) => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upload, setUpload] = useState(false);
  const [freelance, setFreelance] = useState(false);

  const form = useForm<EditMentorDetailsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: mentor?.title || "",
      location: mentor?.location || "",
      imageUrl: mentor?.imageUrl || "",
      about: profile?.about || "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = async (data: EditMentorDetailsFormValues) => {
    try {
      setLoading(true);

      await axios.patch(`/api/mentors/${mentor.id}/stepB`, data);

      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      onClose();
      router.refresh();
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (upload) {
      setUpload(false);
    } else {
      setUpload(true);
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
               
                
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-bold">Title</FormLabel>
                      <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                        Current Title:{" "}
                        <p className="font-semibold text-emerald-800 dark:text-emerald-500">
                          {mentor?.title}
                        </p>
                      </FormLabel>
                      <FormControl>
                        <Input
                          size="sm"
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
                <div className="flex items-center">
                  
                 
                </div>
                
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-bold">About</FormLabel>
                        <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                          Current About:{" "}
                          <p className="font-semibold text-emerald-800 dark:text-emerald-500 pl-2">
                            {" "}
                            {profile?.about}
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            size="sm"
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
              </div>
              <div className="flex gap-2 flex-col  w-full">
                <div className="w-full">
                  
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="font-bold">Location</FormLabel>
                        <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                          Current Location:{" "}
                          <p className="font-semibold text-emerald-800 dark:text-emerald-500">
                            {mentor?.location}
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            size="sm"
                            type="location"
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

                <div className="flex items-center justify-center gap-2">
                  
                  
                </div>
                <div className="flex items-center justify-between flex-col gap-3 px-2 py-4">
                 
                  <div className="flex items-center flex-col justify-center">
                    <Switch
                      defaultSelected
                      size="sm"
                      onClick={() => handleClick()}
                    >
                      <p className="text-xs">Change Avatar?</p>
                    </Switch>
                    {upload && (
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                              <FileUpload
                                endpoint="serverImage"
                                value={field.value}
                                onChange={field.onChange}
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
export default EditMentorDetailsForm;
