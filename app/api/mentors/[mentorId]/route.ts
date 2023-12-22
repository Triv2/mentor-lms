import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";


// export async function PATCH(
//   req: Request,
   
// ) {
//   try {
//     const user = await currentUser();
//   if (!user) {
//     return redirectToSignIn();
//   }
//     const body = await req.json();
   
//     const { userName,
//             firstName, 
//             lastName, 
//             title, 
//             location, 
//             about, 
//             imageUrl, 
//             subscriptionCost,
//             rateCost, 
//             freelanceUrl, 
//             email,
//             startHour,
//             endHour, timezone } = body;
  
    
    
//     if (!userName ||!firstName ||!lastName ||!title ||!location ||!about ||!imageUrl ||!subscriptionCost || !email ||!rateCost) {
//       return new NextResponse("Inputs required",{ status: 400 });
//     }
    
//     const checkProfile = await db.profile.findFirst({ 
//       where: {
//         clerkId: user.id,
//       }
//     })
    
//     if (!checkProfile) {
//       return new NextResponse("Profile doesn't exist",{ status: 400 });
//     }
    
//     const checkMentor = await db.mentor.findFirst({ 
//       where: {
//         clerkId: user.id,
//       }
//     })

//     if (!checkMentor) {
//       return new NextResponse("Mentor doesn't exist",{ status: 400 });
//     }

    
//       const profile = await db.profile.update({
//         where:{
//           id:checkProfile.id,
//         },
//         data: {
//           name:userName,
//           imageUrl,
//           email,
//           about,
//         },
//       });
//         await db.mentor.update({
//           where: {
//             id:checkMentor.id,
//           },
//           data: {
//             userName,
//             firstName,
//             lastName,
//             title,
//             location,
//             imageUrl,
//             about,
//             email,
//             subscriptionCost,
//             rateCost,
//             freelanceUrl,
//             startHour,
//             endHour,
//             timezone,
//           },
//         })
        
      
      
//       return NextResponse.json(profile);


//   } catch (error) {
//     console.log('[MENTOR_PROFILE_PATCH]', error);
//     return new NextResponse("Internal Error", {status:500});
//   }
// }


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
      const mentor = await db.mentor.findFirst({
        where: {
          clerkId:user.id,
        },
      })
      if (!mentor) {
        return new NextResponse("Mentor not found",{ status: 400 });
      }

     await db.mentor.delete({
        where: {
          id:mentor?.id,
        },
      })
  
      const deletedProfile= await db.profile.delete({
        where: {
          id:profile?.id,
        },
      })
      
      return NextResponse.json(deletedProfile);
  
    }
    catch (error) {
      console.log('[MENTOR_PROFILE_DELETE]', error);
      return new NextResponse("Internal Error", {status:500});
    }
  }