import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import {v4 as uuidv4} from "uuid";
import { NextResponse } from "next/server";


export async function POST(
  req: Request,
   
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
    const body = await req.json();
   
    const {   mentorId,  startDate} = body;
  
   
    
    if (!mentorId ||!startDate ) {
      return new NextResponse("Inputs required",{ status: 400 });
    }
    
    const checkProfile = await db.profile.findFirst({ 
      where: {
        clerkId: user.id,
      }
    })
    
    if (!checkProfile) {
      return new NextResponse("Profile doesn't exist",{ status: 400 });
    }

    const mentor = await db.mentor.findFirst({ 
      where: {
        id: mentorId,
      }
    })
    
    if (!mentor) {
      return new NextResponse("Mentor doesn't exist",{ status: 400 });
    }

    const newAppointment= await db.appointment.create({
      data: {
        startDate,
        profileId: checkProfile.id,
        mentorId,
        studentEmail:(checkProfile.email || ""),
        },
      
    })
    await db.mentor.update({
        where: {
          id: mentorId,
        },
        data: {
          appointmentIds:{
            push: newAppointment.id,
          }
          },
      });
      await db.profile.update({
        where: {
          id: checkProfile.id,
        },
        data: {
          appointmentIds:{
            push: newAppointment.id,
          }
          },
      })
    
      return NextResponse.json(newAppointment);


  } catch (error) {
    console.log('[APPOINTMENT_STEPA_POST]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

