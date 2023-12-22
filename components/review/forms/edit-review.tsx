'use client'
import {  Course, Mentor, Profile, Review } from '@prisma/client';
import React, {useState, useEffect} from'react'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Button, Checkbox, Input, Link, Textarea, Switch, Select, SelectItem} from "@nextui-org/react";
import { Input as ShadcnInput } from "@/components/ui/input";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { Lock, Users, X } from 'lucide-react';
import { FileUpload } from '@/components/file-upload';


interface EditReviewFormProps {
  
  review: Review;
  onClose: () => void;
  
}


const formSchema= z.object({
  
  review: z.string().min(1).max(1000),
  rating: z.coerce.number().min(1).max(5),
  mentorId: z.string().min(1).max(1000),
  profileId: z.string().min(1).max(1000),
});

export type EditReviewFormValues = z.infer<typeof formSchema>

const EditReviewForm = ({
  onClose,
  review,
  
}:EditReviewFormProps) => {
  const router=useRouter();
  
const [isMounted, setIsMounted] = useState(false);
const [loading, setLoading] = useState(false);






const form = useForm<EditReviewFormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    rating: review?.rating ||  0,
    review: review?.review || "",
    mentorId:review?.mentorId,
    profileId:review?.profileId,
    
  },
});

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}

const onSubmit = async (data:EditReviewFormValues) => {
  try {
    setLoading(true);
    
  
    await axios.patch(`/api/reviews/${review.id}`, data)
    
    
    toast.success("Review updated!");
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
              <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                Current Rating: <p className="font-semibold text-emerald-800 dark:text-emerald-500 pl-2"> {review?.rating}</p>
              </FormLabel>
              <FormControl>
                <ShadcnInput type="number" disabled={loading} placeholder="9.99" {...field} />
                
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
              <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                Current Review: <p className="font-semibold text-emerald-800 dark:text-emerald-500 pl-2"> {review?.review}</p>
              </FormLabel>
              <FormControl>
             
                 <Textarea
                 
                  placeholder="Enter your description"
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
export default EditReviewForm;