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
   
    const { name, description, imageUrl,  mentorId, experience } = body;
  
    let image= user.imageUrl;
    if(imageUrl !== ""){
      image = imageUrl;
    }
    
    if (!name ||!description ||!mentorId ) {
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

    const newSkill= await db.skill.create({
      data: {
        name,
        description,
        imageUrl:image,
        experience,
        mentorId,
        },
      
    })
    await db.mentor.update({
        where: {
          id: mentorId,
        },
        data: {
          skillIds:{
            push: newSkill.id,
          }
          },
      });
    
      return NextResponse.json(newSkill);


  } catch (error) {
    console.log('[SKILL_POST]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

