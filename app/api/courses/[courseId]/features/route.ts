import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import {v4 as uuidv4} from "uuid";
import { NextResponse } from "next/server";


export async function POST(
  req: Request,
   {params} :{params:{courseId:string}},
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
    const body = await req.json();
   
    const { title, description  } = body;
  
    
    
    if (!title ||!description  ) {
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
        clerkId: user.id,
      }
    })
    
    if (!mentor) {
      return new NextResponse("Mentor doesn't exist",{ status: 400 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
      }
     })
     if (!course) {
      return new NextResponse("Course doesn't exist",{ status: 400 });
    }
   
    const newFeature= await db.feature.create({
      data: {
        title,
        description,
        mentorId:mentor.id,
        },
      
    })
    await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          featureIds:{
            push: newFeature.id,
          }
          },
      });
    
      return NextResponse.json(newFeature);


  } catch (error) {
    console.log('[FEATURE_POST]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

