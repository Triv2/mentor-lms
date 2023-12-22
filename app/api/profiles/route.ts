import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
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
   
    const { name, about, imageUrl,  role } = body;
  
    
    
    if (!name) {
      return new NextResponse("name is required",{ status: 400 });
    }
    
    const checkProfile = await db.profile.findFirst({ 
      where: {
        clerkId: user.id,
      }
    })
    
    if (checkProfile) {
      return new NextResponse("Profile already exists",{ status: 400 });
    }

    
      const profile = await db.profile.create({
        data: {
          id: user.id,
          clerkId:user.id,
          name: name || user.username,
          imageUrl: imageUrl || user.imageUrl,
          email: user.emailAddresses[0].emailAddress,
          about,
          role,
        },
        
        
      });
     
      if (!profile) {
        return new NextResponse("Profile not found",{ status: 400 });
      }
      
      
      
      return NextResponse.json(profile);


  } catch (error) {
    console.log('[PROFILE_POST]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

