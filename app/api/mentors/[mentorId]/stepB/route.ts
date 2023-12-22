import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(
  req: Request,
   
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
    const body = await req.json();
   
    const { 
            title, 
            location, 
            about, 
            imageUrl, 
             } = body;
  
    
    
    if (!title ||!location ||!about ||!imageUrl ) {
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

    
      const profile = await db.profile.update({
        where:{
          id:checkProfile.id,
        },
        data: {
          
          imageUrl,
         
          about,
        },
      });
        await db.mentor.update({
          where: {
            id:checkMentor.id,
          },
          data: {
            
            title,
            location,
            imageUrl,
            about,
           
          },
        })
        
      
      
      return NextResponse.json(profile);


  } catch (error) {
    console.log('[MENTOR_STEPB_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

