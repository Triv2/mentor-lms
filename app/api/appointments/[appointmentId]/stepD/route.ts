import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import {v4 as uuidv4} from "uuid";
import { NextResponse } from "next/server";


export async function PATCH(
  req: Request,
  { params }: { params: { appointmentId: string } }
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
    const body = await req.json();
   
    const {  mentorId,  title, description } = body;
  

    
    if (!mentorId ||!title ||!description  ) {
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

    const updateAppointment= await db.appointment.update({
      where:{
        id:params.appointmentId
      },
      
      data: {
        title,
        description,
        },
      
    })
    
    
      return NextResponse.json(updateAppointment);


  } catch (error) {
    console.log('[APPOINTMENT_STEPD_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

