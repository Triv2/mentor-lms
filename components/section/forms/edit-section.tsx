'use client'
import {  Course, Feature, Profile, Section } from '@prisma/client';
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


interface EditSectionFormProps {
  
  section: Section;
  onClose: () => void;
  
}


const formSchema= z.object({
  
  name: z.string().min(1).max(500),
  description: z.string().min(1).max(1000),
  videoUrl: z.string().default(""),
  imageUrl: z.string().default(""),
  
});

export type EditSectionFormValues = z.infer<typeof formSchema>

const EditSectionForm = ({
  onClose,
  section,
}:EditSectionFormProps) => {
  const router=useRouter();
  
const [isMounted, setIsMounted] = useState(false);
const [loading, setLoading] = useState(false);
const [upload,setUpload] = useState(false);
const [videoUrl,setVideoUrl] = useState(false);





const form = useForm<EditSectionFormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: section?.name || "",
    description: section?.description || "",
    videoUrl: section?.videoUrl || "",
    imageUrl: section?.imageUrl || "",
    
  },
});

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}

const onSubmit = async (data:EditSectionFormValues) => {
  try {
    setLoading(true);
    
   
    await axios.patch(`/api/sections/${section.id}`,data)
    
    
    toast.success("Section updated!");
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
const handleVideoClick= () => {
  if(videoUrl) {
    setVideoUrl(false);
  } else {
    setVideoUrl(true);
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
              <div className="w-full">
            <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-bold">
                Name
              </FormLabel>
              <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                Current Name: <p className="font-semibold text-emerald-800 dark:text-emerald-500">{section?.name}</p>
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
     
        </div>
        <div className="flex items-center flex-col justify-center">
          <Switch defaultSelected size="sm" onClick={()=>handleClick()}><p className="text-xs">Add Section Image?</p></Switch>
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
        <div className="flex items-center flex-col justify-center">
          <Switch defaultSelected size="sm" onClick={()=>handleVideoClick()}><p className="text-xs">Add Section Video?</p></Switch>
          {videoUrl && (
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Video
              </FormLabel>
              <FormControl>
              <Input 
               
               type="videoUrl"
               
               placeholder="Paste your video url here"
                className="text-black rounded-md dark:text-white"
               disabled={loading}  {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
            )}
        />
        )}
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
              <FormLabel className="text-xs text-muted-foreground flex justify-between px-2">
                Current Description: <p className="font-semibold text-emerald-800 dark:text-emerald-500">{section?.description}</p>
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
export default EditSectionForm;
