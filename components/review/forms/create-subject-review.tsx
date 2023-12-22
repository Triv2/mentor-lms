'use client'
import {  Mentor, Profile, Subject } from '@prisma/client';
import React, {useState, useEffect} from'react'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Button, Checkbox, Input, Link, Textarea, Switch, Select, SelectItem} from "@nextui-org/react";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { Lock, Users, X } from 'lucide-react';
import { FileUpload } from '@/components/file-upload';


interface CreateSubjectReviewFormProps {
  mentor: Mentor;
  profile: Profile;
  subject: Subject;
  onClose: () => void;
}


const formSchema= z.object({
  review: z.string().min(1).max(1000),
  rating: z.coerce.number().min(1).max(5),
  mentorId: z.string().min(1).max(1000),
  profileId: z.string().min(1).max(1000),
  subjectId: z.string().min(1).max(1000),
});

export type CreateSubjectReviewFormValues = z.infer<typeof formSchema>

const CreateSubjectReviewForm = ({
  mentor,
  onClose,
  profile,
  subject,
}:CreateSubjectReviewFormProps) => {
  const router=useRouter();
  
const [isMounted, setIsMounted] = useState(false);
const [loading, setLoading] = useState(false);
const [upload,setUpload] = useState(false);





const form = useForm<CreateSubjectReviewFormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    rating:  0,
    review:"",
    mentorId:mentor.id,
    profileId:profile.id,
    subjectId:subject.id,
  },
});

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}

const onSubmit = async (data:CreateSubjectReviewFormValues) => {
  try {
    setLoading(true);
    
  
    await axios.post(`/api/subjects/${subject.id}/reviews`, data)
    
    
    toast.success("Review Created!");
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    onClose();
    router.refresh();
    setLoading(false);
  }
};

const handleClick= () => {
  if(upload) {
    setUpload(false);
  } else {
    setUpload(true);
  }
}


  return (
    <>
    <div >
           <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 bg-zinc-200 dark:bg-zinc-700 rounded-md p-5 w-full ">
            <div className="flex items-center flex-col justify-center  gap-5">
            
            <div className="flex items-center flex-col md:flex-row gap-2">
            <div className='flex items-center justify-center flex-col gap-5 w-full'>

            

        <div className="w-full">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-bold">
                Rating
              </FormLabel>
              
              <FormControl>
                <ShadcnInput type="number" disabled={loading} placeholder="5" {...field} />
             
              
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        </div>
       
        <div className="w-full">
           <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-bold">
                Review
              </FormLabel>
              
              <FormControl>
             
                 <Textarea
                 
                  placeholder="Enter your review"
                  className="max-w-xs"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        </div>
        </div>
       
        </div>
        <Button className="flex items-center justify-center px-2 py-2 gap-1 hover:scale-105 rounded-md bg-emerald-800 text-white hover:bg-emerald-500 transition-all text-sm shadow-md" type="submit">Submit</Button>
        
            </div>
            </form>
           </Form>
         </div>  
    </>
  );
}
export default CreateSubjectReviewForm;