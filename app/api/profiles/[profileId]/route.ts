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
   
    const { name, about, imageUrl, email } = body;
  
    
    
    if (!name) {
      return new NextResponse("name is required",{ status: 400 });
    }
    
    const checkProfile = await db.profile.findFirst({ 
      where: {
        clerkId: user.id,
      }
    })
    
    if (!checkProfile) {
      return new NextResponse("Profile doesn't exist",{ status: 400 });
    }
    
    
    
      const profile = await db.profile.update({
        where:{
          id:checkProfile.id,
        },
        data: {
          name,
          imageUrl,
          email,
          about,
        },
      });
        
      
      
      return NextResponse.json(profile);


  } catch (error) {
    console.log('[PROFILE_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}

export async function DELETE(

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

    const deletedProfile= await db.profile.delete({
      where: {
        id:profile?.id,
      },
    })
    
    return NextResponse.json(deletedProfile);

  }
  catch (error) {
    console.log('[PROFILE_DELETE]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}