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
            subscriptionCost,
            rateCost, 
            freelanceUrl, 
            startHour,
            endHour, timezone } = body;
  
    
    
    if (!subscriptionCost  ||!rateCost ||!freelanceUrl ||!startHour ||!endHour ||!timezone ) {
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

    
      
       const updateMentor= await db.mentor.update({
          where: {
            id:checkMentor.id,
          },
          data: {
            subscriptionCost,
            rateCost,
            freelanceUrl,
            startHour,
            endHour,
            timezone,
          },
        })
        
      
      
      return NextResponse.json(updateMentor);


  } catch (error) {
    console.log('[MENTOR_STEPC_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}
