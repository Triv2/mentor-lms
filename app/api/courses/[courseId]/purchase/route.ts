import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import {v4 as uuidv4} from "uuid";
import { NextResponse } from "next/server";


export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
  const checkCourse= await db.course.findFirst({ 
    where: {
      id: params.courseId,
    }
  });

  if (!checkCourse) {
    return new NextResponse("Course doesn't exist",{ status: 400 });
  }
    
    
    const mentor = await db.mentor.findFirst({ 
      where: {
        id: checkCourse.mentorId,
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

   
    if(checkProfile.courseIds.includes(checkCourse.id)) {
      return null;
    }
    const newPurchase= await db.purchase.create({
      data:{
        mentorId: mentor.id,
        studentId: checkProfile.id,
        courseId: checkCourse.id,
        amount: checkCourse.cost,
      }
    })
    const updatedCourse= await db.course.update({
      where: {
        id: params.courseId,
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
          courseIds:{
            push: updatedCourse.id,
          },
          purchaseIds:{
            push: newPurchase.id,
          },
        }
      });
      if(mentor.purchasedCourseStudentIds.includes(checkProfile.id)) {
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
        return NextResponse.json(updatedCourse);
      } else {
      await db.mentor.update({
        where: {
          id: mentor.id,
        },
        data: {
          purchasedCourseStudentIds:{
            push: checkProfile.id,
          },
        }
      });
     
      }
      return NextResponse.json(updatedCourse);


  } catch (error) {
    console.log('[COURSE_PURCHASE_POST]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

