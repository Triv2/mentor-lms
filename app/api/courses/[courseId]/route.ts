import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
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
    const body = await req.json();
   
    const { name,
           description,
            imageUrl, 
            cost, 
             } = body;
  
    
    
    if (!name ||!imageUrl || !description ||!cost) {
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
        clerkId: user.id,
      }
    })

    if (!checkMentor) {
      return new NextResponse("Mentor doesn't exist",{ status: 400 });
    }

      const updatedCourse = await db.course.update({
        where: {
          id:params.courseId,
        },
        data: {
          name,
          description,
          imageUrl,
          cost,
        },
      });
      
        
      
      
      return NextResponse.json(updatedCourse);


  } catch (error) {
    console.log('[COURSEID_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
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
      const mentor = await db.mentor.findFirst({
        where: {
          clerkId:user.id,
        },
      })
      if (!mentor) {
        return new NextResponse("Mentor not found",{ status: 400 });
      }
      const updatedCourseIds= mentor.courseIds.filter((id)=>{params.courseId===id});

      const updatedMentor= await db.mentor.update({
        where: {
          id:mentor?.id,
        },
        data: {
          courseIds:updatedCourseIds,
        }
      })
      await db.review.deleteMany({
        where: {
          courseId:params.courseId,
        },
      })
      const deleteCourse = await db.course.delete({
        where: {
          id:params.courseId,
        },
      });
    
      
      return NextResponse.json(deleteCourse);
  
    }
    catch (error) {
      console.log('[COURSE_DELETE]', error);
      return new NextResponse("Internal Error", {status:500});
    }
  }