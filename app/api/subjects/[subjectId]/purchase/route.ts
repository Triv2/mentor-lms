import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import {v4 as uuidv4} from "uuid";
import { NextResponse } from "next/server";


export async function PATCH(
  req: Request,
  { params }: { params: { subjectId: string } }
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
    const body = await req.json();
   
    const { mentorId, subjectId } = body;

    if (!mentorId ||!subjectId) {
      return new NextResponse("Inputs required",{ status: 400 });
    }
    
    const mentor = await db.mentor.findFirst({ 
      where: {
        id: mentorId,
      }
    })
    
    if (!mentor) {
      return new NextResponse("Mentor doesn't exist",{ status: 400 });
    }
  
    
    const checkProfile = await db.profile.findFirst({ 
      where: {
        clerkId: user.id,
      }
    })
    
    if (!checkProfile) {
      return new NextResponse("Profile doesn't exist",{ status: 400 });
    }

    const checkSubject= await db.subject.findFirst({ 
      where: {
        id: subjectId,
      }
    });

    if (!checkSubject) {
      return new NextResponse("Course doesn't exist",{ status: 400 });
    }
    if(checkProfile.subjectIds.includes(checkSubject.id)) {
      return null;
    }
    const newPurchase= await db.purchase.create({
      data:{
        mentorId: mentor.id,
        studentId: checkProfile.id,
        subjectId: checkSubject.id,
        amount: checkSubject.cost,
      }
    })
    const updatedSubject= await db.subject.update({
      where: {
        id: subjectId,
      },
      data: {
        studentIds: { 
          push: checkProfile.id
        },

      },
    })
    await db.profile.update({
        where: {
          id: checkProfile.id,
        },
        data: {
          subjectIds:{
            push: updatedSubject.id,
          },
          purchaseIds:{
            push: newPurchase.id,
          },
        }
      });
      if(mentor.purchasedSubjectStudentIds.includes(checkProfile.id)) {
        await db.mentor.update({
          where:{
            id: mentor.id,
          },
          data:{
            purchaseIds:{
              push: newPurchase.id,
            }
          }
        })
        return NextResponse.json(updatedSubject);
      } else {
      await db.mentor.update({
        where: {
          id: mentorId,
        },
        data: {
          purchasedSubjectStudentIds:{
            push: checkProfile.id,
          },
        }
      });
     
      }
      return NextResponse.json(updatedSubject);


  } catch (error) {
    console.log('[SUBJECT_PURCHASE_POST]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

