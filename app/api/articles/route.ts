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
   
    const { name, description,  estimatedTime,    sectionId } = body;
  
    
    
    if (!name ||!description ||!sectionId ) {
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
    
    const section = await db.section.findFirst({
      where: {
        id: sectionId,
      }
    });
    
    if (!section) {
      return new NextResponse("Section doesn't exist",{ status: 400 });
    }
    
   
    const newArticle= await db.article.create({
      data: {
        name,
        sectionId:sectionId,
        
        description,
        
        mentorId:mentor.id,
        estimatedTime,
        articleComplete:false,
        },
      
    })
    if(!newArticle.estimatedTime) {
      return new NextResponse("Failed to create article",{ status: 400 });
    }
    await db.section.update({
        where: {
          id: sectionId,
        },
        data: {
          articleIds:{
            push: newArticle.id,
          },
          estimatedTime: (section.estimatedTime || 0 ) + newArticle.estimatedTime,
          },
      });
    
      return NextResponse.json(newArticle);


  } catch (error) {
    console.log('[ARTICLE_POST]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

