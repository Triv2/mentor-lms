import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(
  req: Request,
  { params }: { params: { mentorId: string } }
) {
  try{
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
  const body = await req.json();
  const { follow } = body;

    const student = await db.profile.findFirst({ 
      where: {
        clerkId: user.id,
      }
    })
    
    
    if (!student) {
      return new NextResponse("Student doesn't exist",{ status: 400 });
    }
    const mentor = await db.mentor.findFirst({ 
      where: {
        id:params.mentorId,
      }
    })
    if(!mentor) {
      return new NextResponse("Mentor doesn't exist",{ status: 400 });
    }
    
   if(follow===true){
      const updatedMentor = await db.mentor.update({
        where: {
          id:params.mentorId,
        },
        data: {
          followingStudentIds:{
            push:student.id,
          }
        } 
      });
      await db.profile.update({
        where: {
          id:student.id,
        },
        data: {
          followingMentorIds:{
            push:params.mentorId,
          }
        } 
      });
      return NextResponse.json(updatedMentor);
    } else {
      const updatedMentor = await db.mentor.update({
        where: {
          id:params.mentorId,
        },
        data: {
          followingStudentIds: mentor.followingStudentIds.filter(id => id!== student.id),
        } 
      });
      await db.profile.update({
        where: {
          id:student.id,
        },
        data: {
          followingMentorIds: student.followingMentorIds.filter(id=> id!==params.mentorId)
        } 
      });
      return NextResponse.json(updatedMentor);
    }

  } catch (error) {
    console.log('[MENTOR_SUBSCRIBE_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}