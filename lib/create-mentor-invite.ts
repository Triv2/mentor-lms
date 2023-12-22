import { auth } from "@clerk/nextjs"
import {v4 as uuidv4} from "uuid";
import { db } from "@/lib/db"


export const createMentorInvite = async () => {
  const { userId} = auth();
  

  if(!userId) { 
    
    return null;
  }

  const invite =await db.mentorInviteCode.findFirst({
    where: {
       clerkId: userId,
    }
  });

  if(invite){
    return null;
  } else {
    const newInvite =await db.mentorInviteCode.create({
      data: {
        clerkId: userId,
        inviteCode: uuidv4(),
      }
    });
    return newInvite;
  }
  
  
}