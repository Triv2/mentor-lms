import {  currentUser } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { Role } from "@prisma/client";


export const setupMentorProfile = async () => {
  
  const user = await currentUser();
  

  if(!user) { 
    return null;
  }

  const profile =await db.profile.findFirst({
    where: {
       clerkId: user.id,
    }
  });
  
  
  if(profile){
    return null;
  }

  const mentor = await db.mentor.findFirst({
    where: {
      clerkId: user.id,
    }
   })

   if(mentor){
     return null;
   }
  const newMentor = await db.mentor.create({
    data: {
      clerkId: user?.id,
      userName: `${user?.username}`,
      imageUrl: `${user?.imageUrl}`,
    }
  })

  const newProfile =await db.profile.create({
    data: {
      clerkId: user?.id,
      role: Role.MENTOR,
      mentorId: newMentor.id,
      name: `${user?.username}`,
      imageUrl: `${user?.imageUrl}`,
      email: `${user?.emailAddresses[0].emailAddress}`,
    }
  });
  

  return newProfile;
}