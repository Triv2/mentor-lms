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
  const { unSubscribe, } = body;

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
    

    
    
    if(unSubscribe===true) {

      let targetSubscriptionId;

      student.subscriptionIds.forEach((subscriptionId)=>{
        mentor.subscriptionIds.forEach((mentorSubscriptionId)=>{
          if(subscriptionId===mentorSubscriptionId) {
            targetSubscriptionId = mentorSubscriptionId;
          }
        })
      })
      
      const targetSubscription = await db.subscription.findFirst({
        where: {
          id:targetSubscriptionId,
        }
      })
      if(!targetSubscription) { 
        return new NextResponse("Subscription doesn't exist",{ status: 400 });
      }
    const updatedMentor = await db.mentor.update({
      where: {
        id:params.mentorId,
      },
      data: {
        subscribedStudentIds: mentor.subscribedStudentIds.filter(id => id!== student.id),
        subscriptionIds: mentor.subscriptionIds.filter(id => id!== targetSubscription.id),
      },
    }); 
    await db.profile.update({
      where: {
        id:student.id,
      },
      data: {
        subscribedMentorIds:student.subscribedMentorIds.filter(id=> id!==params.mentorId),
        subscriptionIds: student.subscriptionIds.filter(id=> id!== targetSubscription.id),
      },
    });
    await db.subscription.update({
      where: {
        id:targetSubscription.id,
      },
      data: {
        endedAt: new Date
      },
    })
    return NextResponse.json(updatedMentor);
  }
    else {
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