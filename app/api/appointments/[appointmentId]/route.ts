import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
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
   
    const { title, description,  mentorId, estimatedTime, startTime, endTime} = body;
    
    
    if (!title||!description ||!mentorId ||!estimatedTime ||!startTime ||!endTime ) {
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
    
    const checkMentor = await db.mentor.findFirst({ 
      where: {
        id: mentorId,
      }
    })

    if (!checkMentor) {
      return new NextResponse("Mentor doesn't exist",{ status: 400 });
    }

      const updatedAppointment = await db.appointment.update({
        where: {
          id:params.appointmentId,
        },
        data: {
          title,
          profileId: checkProfile.id,
          description,
          startTime,
          endTime,
          mentorId,
          estimatedTime,
          },
      });
      
        
      
      
      return NextResponse.json(updatedAppointment);


  } catch (error) {
    console.log('[APPOINTMENTID_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { appointmentId: string } }
  ) {
    try{
      const user = await currentUser();
    if (!user) {
      return null }
      const profile = await db.profile.findFirst({
        where: {
          clerkId:user.id,
        },
      })
      if (!profile) {
        return new NextResponse("Profile not found",{ status: 400 });
      }
      const appointment = await db.appointment.findFirst({
        where: {
          id:params.appointmentId,
        },
      })
      if (!appointment) {
        return new NextResponse("Appointment not found",{ status: 400 });
      }
      const mentor = await db.mentor.findFirst({
        where: {
          id: appointment.mentorId,
        },
      })
      if (!mentor) {
        return new NextResponse("Mentor not found",{ status: 400 });
      }
      const updatedMentorAppointmentIds= mentor.appointmentIds.filter((id)=>{params.appointmentId===id});
      const updatedStudentAppointmentIds= profile.appointmentIds.filter((id)=>{params.appointmentId===id});
      await db.mentor.update({
        where: {
          id:mentor?.id,
        },
        data: {
          courseIds:updatedMentorAppointmentIds,
        }
      })
      await db.profile.update({
        where:{
          id:profile?.id,
        },
        data:{
          appointmentIds:updatedStudentAppointmentIds,
        }
      })

      const deleteAppointment = await db.appointment.delete({
        where: {
          id:params.appointmentId,
        },
      });
    
      
      return NextResponse.json(deleteAppointment);
  
    }
    catch (error) {
      console.log('[APPOINTMENT_DELETE]', error);
      return new NextResponse("Internal Error", {status:500});
    }
  }