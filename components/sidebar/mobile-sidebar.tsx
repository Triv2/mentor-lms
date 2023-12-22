"use client"


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import Sidebar from "./sidebar"
import { Course, Mentor, Profile, Review, Skill } from "@prisma/client"
import { Menu } from "lucide-react"
import Image from "next/image"

interface MobileSidebarProps {
  profile:Profile;
  mentors:Mentor[];
  posters:Profile[];
  reviews:Review[];
  skills:Skill[];
  courses:Course[];

}



export function MobileSidebar({
  profile,
  mentors,
  posters,
  reviews,
  skills,
  courses,
}: MobileSidebarProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      
        <Sheet >
          <SheetTrigger className="p-0 w-[2rem]" asChild>
            <Button  variant="outline"><Menu className="h-4 w-4"/></Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-center"><Image width={100} height={100} src="/logo-cwam.webp" alt="logo"/></SheetTitle>
             
            </SheetHeader>
           
              <SheetClose asChild>
              <Sidebar  
           reviews={reviews}
          profile={profile}
          mentors={mentors}
          skills={skills}
          courses={courses}
          posters={posters}
          />
              </SheetClose>
          
          </SheetContent>
        </Sheet>
    
    </div>
  )
}
