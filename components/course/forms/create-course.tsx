'use client'
import {  Mentor, Profile } from '@prisma/client';
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


interface CreateCourseFormProps {
  mentor: Mentor;
  onClose: () => void;
}


const formSchema= z.object({
  name: z.string().min(1).max(25),
  imageUrl: z.string().default(""),
  description: z.string().min(1).max(1000),
  cost: z.coerce.number().min(0).max(1000),
  mentorId: z.string().min(1).max(1000),
});

export type CreateCourseFormValues = z.infer<typeof formSchema>

const CreateCourseForm = ({
  mentor,
  onClose,
}:CreateCourseFormProps) => {
  const router=useRouter();
  
const [isMounted, setIsMounted] = useState(false);
const [loading, setLoading] = useState(false);
const [upload,setUpload] = useState(false);





const form = useForm<CreateCourseFormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name:  "",
    imageUrl: "",
    cost:  0,
    description:"",
    mentorId:mentor.id,
    
  },
});

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}

const onSubmit = async (data:CreateCourseFormValues) => {
  try {
    setLoading(true);
    
  
    await axios.post(`/api/courses/`, data)
    
    
    toast.success("Course Created!");
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

              <div className="flex gap-2 flex-col md:flex-row w-full">
            <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-bold">
                Name
              </FormLabel>
              
              <FormControl>
               <Input 
               
               type="name"
               
               placeholder="Please enter a name"
                className="text-black rounded-md dark:text-white"
               disabled={loading}  {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
      
        </div>

        <div className="w-full">
        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-bold">
                Cost
              </FormLabel>
              
              <FormControl>
                <ShadcnInput type="number" disabled={loading} placeholder="9.99" {...field} />
             
                 {/* <Input
                  type="number"
                  placeholder="0.00"
                  className="max-w-xs"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  {...field}
                /> */}
              </FormControl>
              <FormMessage/>
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
              <FormLabel className="font-bold">
                Description
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
        <div className="flex items-center justify-between flex-col gap-3 px-2 py-4">
        
        <div className="flex items-center flex-col justify-center">
          <Switch defaultSelected size="sm" onClick={()=>handleClick()}><p className="text-xs">Change Course Image?</p></Switch>
          {upload && (
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Image
              </FormLabel>
              <FormControl>
              <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        )}
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
export default CreateCourseForm;